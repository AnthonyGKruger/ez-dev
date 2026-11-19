import emailjs from "@emailjs/browser";
import { useNavigate } from "@tanstack/react-router";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { site, ui } from "../content";
import { trackFormSubmit, trackFormVerification } from "../lib/analytics";
import { Icon } from "../lib/icon";
import { Lottie, SectionRule } from "./ui";

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY: string =
  import.meta.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || import.meta.env.VITE_TURNSTILE_SITE_KEY || "";
const EMAILJS_PUBLIC_KEY: string =
  import.meta.env.NUXT_PUBLIC_EMAIL_JS_SECURE_TOKEN ||
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY ||
  "";
const TURNSTILE_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
export const SENT_FLAG = "ezdev-contact-sent";

const { contact } = site;
const e = ui.contactErrors;
const m = ui.contactMessages;

// Same rules as the Nuxt form; field names match the EmailJS template.
const schema = z.object({
  from_name: z
    .string()
    .min(1, e.nameInvalid)
    .min(2, e.nameTooShort)
    .max(20, e.nameTooLong)
    .regex(
      /^(?:[\p{L}\p{M}]+(?:[-''][\p{L}\p{M}]+)*)(?:\s+[\p{L}\p{M}]+(?:[-''][\p{L}\p{M}]+)*){0,2}$/u,
      e.nameInvalid,
    ),
  reply_to: z.email(e.emailInvalid),
  company: z
    .string()
    .min(1, e.companyRequired)
    .min(2, e.companyTooShort)
    .max(30, e.companyTooLong)
    .regex(/^(?=.*[A-Za-z0-9])[A-Za-z0-9 &''.,\-/+()]+$/, e.companyInvalid),
  comments: z
    .string()
    .min(1, e.commentsRequired)
    .min(2, e.commentsTooShort)
    .max(200, e.commentsTooLong)
    .regex(/^[\p{L}\p{M}\p{N} \t\r\n.,:;!?"'()\-_/&@#%+*]{2,200}$/u, e.commentsInvalid),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const fields: { name: keyof Values; content: { label: string; placeholder: string } }[] = [
  { name: "from_name", content: contact.form.name },
  { name: "reply_to", content: contact.form.email },
  { name: "company", content: contact.form.company },
  { name: "comments", content: contact.form.details },
];

const validate = (values: Values): Errors => {
  const result = schema.safeParse(values);
  if (result.success) return {};
  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof Values;
    errors[key] ??= issue.message;
  }
  return errors;
};

const loadTurnstile = () =>
  new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve();
    if (!document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    const start = Date.now();
    const tick = () => {
      if (window.turnstile) return resolve();
      if (Date.now() - start > 8000) return reject(new Error("Turnstile script failed to load in time."));
      setTimeout(tick, 250);
    };
    tick();
  });

type Toast = { tone: "success" | "warn" | "error"; text: string };
const toneClass: Record<Toast["tone"], string> = {
  success: "border-green-700/35 bg-green-500/15 text-green-500",
  warn: "border-yellow-700/35 bg-yellow-500/15 text-yellow-500",
  error: "border-red-700/35 bg-red-500/15 text-red-500",
};

export const ContactForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>({
    from_name: "",
    reply_to: "",
    company: "",
    comments: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const widgetId = useRef<string | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return;
        // The server rejects tokens whose action isn't "contact".
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          action: "contact",
          theme: "dark",
          size: "flexible",
          callback: (t: string) => setToken(t),
          "expired-callback": () => setToken(null),
          "error-callback": () => setToken(null),
        });
      })
      .catch((err) => console.warn(err));
    return () => {
      cancelled = true;
      try {
        if (widgetId.current) window.turnstile?.remove(widgetId.current);
      } catch {}
    };
  }, []);

  const update = (name: keyof Values, value: string) => {
    const next = { ...values, [name]: value };
    setValues(next);
    setErrors(validate(next));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ from_name: true, reply_to: true, company: true, comments: true });
    if (Object.keys(found).length) return;

    if (!token) {
      setToast({ tone: "warn", text: m.verificationRequired });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/turnstile-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          expectedAction: "contact",
          expectedHostname: location.hostname,
        }),
      });
      const verification = await res.json().catch(() => null);
      if (!verification?.success) {
        trackFormVerification(false);
        setToast({ tone: "error", text: m.verificationFailed });
        return;
      }
      trackFormVerification(true);

      const sent = await emailjs.send(
        "ezdev_smtp_service",
        "ezdev_contact_me",
        values,
        EMAILJS_PUBLIC_KEY,
      );
      if (sent.status !== 200) {
        trackFormSubmit(false);
        setToast({ tone: "error", text: m.failed });
        return;
      }

      trackFormSubmit(true);
      sessionStorage.setItem(SENT_FLAG, "1");
      try {
        window.turnstile?.reset(widgetId.current ?? undefined);
      } catch {}
      setToken(null);
      navigate({ to: "/thank-you" });
    } catch (err) {
      console.error(err);
      setToast({ tone: "error", text: m.failed });
    } finally {
      setLoading(false);
    }
  };

  const socialLink =
    "flex h-11 w-11 items-center justify-center rounded-lg border border-primary-gold/30 transition-colors duration-300 hover:border-light-gold";
  const labelClass = "mono text-xs tracking-wider text-subtle";

  return (
    <section className="site-container pt-20 pb-24">
      <SectionRule label={contact.eyebrow} className="mb-11" />

      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl md:text-6xl leading-display font-black tracking-tight text-heading">
            {contact.heading}
          </h1>
          <p className="mt-6 mb-8 max-w-lg text-lg leading-relaxed text-body">
            {contact.subtitle}
          </p>
          <Lottie src="/lotties/ContactMe.json" size="220px" className="mx-auto lg:mx-0" />
          <p className="mono mt-2 mb-3.5 text-xs tracking-widest text-primary-gold">
            {contact.reachMeAt}
          </p>
          <div className="flex gap-3.5">
            <a
              href="https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className={socialLink}
            >
              <Icon name="skill-icons:linkedin" size={24} />
            </a>
            <a
              href="https://github.com/AnthonyGKruger"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className={socialLink}
            >
              <Icon name="mdi:github" size={24} className="text-ink" />
            </a>
            <a href="mailto:anthony@ezdev.solutions" aria-label="Email" className={socialLink}>
              <Icon name="mdi:email" size={24} className="text-ink" />
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl border border-primary-gold/30 bg-surface-bg p-8">
          {toast && (
            <div
              role="status"
              className={`fixed inset-x-4 top-24 z-50 mx-auto max-w-sm animate-menu-in rounded-md border p-3 font-medium backdrop-blur-md ${toneClass[toast.tone]}`}
            >
              {toast.text}
            </div>
          )}
          <form id="contact-form" noValidate onSubmit={onSubmit} className="flex flex-col gap-4">
            {fields.map(({ name, content }) => {
              const error = touched[name] ? errors[name] : undefined;
              const props = {
                id: name,
                name,
                value: values[name],
                placeholder: content.placeholder,
                "aria-invalid": !!error,
                "aria-describedby": error ? `${name}-error` : undefined,
                className: "field",
                onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
              };
              return (
                <div key={name} className="flex flex-col gap-2">
                  <label htmlFor={name} className={labelClass}>
                    {content.label}
                  </label>
                  {name === "comments" ? (
                    <textarea {...props} rows={4} onChange={(ev) => update(name, ev.target.value)} />
                  ) : (
                    <input
                      {...props}
                      type={name === "reply_to" ? "email" : "text"}
                      onChange={(ev) => update(name, ev.target.value)}
                    />
                  )}
                  {error && (
                    <p id={`${name}-error`} className="text-sm font-medium text-red-400">
                      {error}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="flex flex-col gap-2">
              <span className={labelClass}>{contact.form.verify.label}</span>
              <div ref={container} className="w-full" />
            </div>

            {loading ? (
              <svg
                className="mr-3 -ml-1 size-9 animate-spin self-center text-primary-gold"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Sending"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <button
                type="submit"
                className="btn btn-primary mt-1.5 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!token}
              >
                {contact.form.submit}
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
