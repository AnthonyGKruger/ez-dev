import { createFileRoute } from "@tanstack/react-router";

// Cloudflare's test secrets return no action and hostname "example.com", so
// the action/hostname checks are skipped for them (local dev).
const TEST_SECRETS = new Set([
  "1x0000000000000000000000000000000AA",
  "2x0000000000000000000000000000000AA",
  "3x0000000000000000000000000000000AA",
]);

const verify = async (request: Request) => {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return Response.json({ success: false, error: "Turnstile secret not configured" }, { status: 501 });
  }

  const body = (await request.json().catch(() => null)) as {
    token?: string;
    expectedAction?: string;
    expectedHostname?: string;
    idempotencyKey?: string;
  } | null;
  const token = body?.token || "";
  if (!token || typeof token !== "string" || token.length > 2048) {
    return Response.json({ success: false, error: "Invalid token" }, { status: 400 });
  }

  const remoteip =
    request.headers.get("cf-connecting-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
    undefined;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const form = new FormData();
    form.append("secret", secret);
    form.append("response", token);
    if (remoteip) form.append("remoteip", remoteip);
    if (body?.idempotencyKey) form.append("idempotency_key", body.idempotencyKey);

    const resp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
    const result = await resp.json();

    if (result?.success && !TEST_SECRETS.has(secret)) {
      const { expectedAction, expectedHostname } = body ?? {};
      if (expectedAction && result.action !== expectedAction) {
        return Response.json({
          success: false,
          error: "action_mismatch",
          expected: expectedAction,
          received: result.action,
        });
      }
      if (
        expectedHostname &&
        result.hostname &&
        result.hostname.toLowerCase() !== expectedHostname.toLowerCase()
      ) {
        return Response.json({
          success: false,
          error: "hostname_mismatch",
          expected: expectedHostname,
          received: result.hostname,
        });
      }
    }
    return Response.json(result);
  } catch (err) {
    if ((err as Error)?.name === "AbortError") {
      return Response.json({ success: false, error: "Validation timeout" }, { status: 504 });
    }
    console.error("Turnstile validation error:", err);
    return Response.json({ success: false, error: "Validation failed" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
};

export const Route = createFileRoute("/api/turnstile-verify")({
  server: { handlers: { POST: ({ request }) => verify(request) } },
});
