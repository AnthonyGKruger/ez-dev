export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const secret = config.turnstileSecretKey as string | undefined;

  // If not configured, indicate not implemented so client can handle gracefully
  if (!secret) {
    setResponseStatus(event, 501);
    return {
      success: false,
      error: "Turnstile secret not configured",
    };
  }

  const body = await readBody<{ token?: string; expectedAction?: string; expectedHostname?: string; idempotencyKey?: string }>(event);
  const token = body?.token || "";
  const expectedAction = body?.expectedAction;
  const expectedHostname = body?.expectedHostname;

  if (!token || typeof token !== "string" || token.length > 2048) {
    setResponseStatus(event, 400);
    return { success: false, error: "Invalid token" };
  }

  // Determine request IP if available (for extra signal to CF)
  const remoteip = getHeader(event, "cf-connecting-ip")
    || (getHeader(event, "x-forwarded-for") || "").split(",")[0]?.trim()
    || undefined;

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

    // Additional checks
    if (result?.success) {
      if (expectedAction && result.action !== expectedAction) {
        return {
          success: false,
          error: "action_mismatch",
          expected: expectedAction,
          received: result.action,
        };
      }
      if (expectedHostname && result.hostname && result.hostname !== expectedHostname) {
        return {
          success: false,
          error: "hostname_mismatch",
          expected: expectedHostname,
          received: result.hostname,
        };
      }
    }

    setResponseStatus(event, 200);
    return result;
  } catch (err: any) {
    if (err?.name === "AbortError") {
      setResponseStatus(event, 504);
      return { success: false, error: "Validation timeout" };
    }
    console.error("Turnstile validation error:", err);
    setResponseStatus(event, 502);
    return { success: false, error: "Validation failed" };
  } finally {
    clearTimeout(timeout);
  }
});
