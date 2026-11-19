// Event names match the Nuxt site so existing GTM triggers keep working.
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const GTM_ID: string =
  import.meta.env.NUXT_PUBLIC_GTM_ID || import.meta.env.VITE_GTM_ID || "";

export const pushEvent = (event: { event: string; [key: string]: unknown }) => {
  if (import.meta.env.DEV) {
    console.log("GTM Event (dev mode):", event);
    return;
  }
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
};

export const trackFormSubmit = (success: boolean) =>
  pushEvent({ event: "contact-form-submit", value: `form submitted ${success}` });

export const trackFormVerification = (success: boolean) =>
  pushEvent({
    event: "contact-form-verification",
    value: success ? "turnstile-success" : "turnstile-failed",
  });

export const trackCookieAccept = () =>
  pushEvent({ event: "cookie-consent", value: "accepted-cookie" });

export const trackScrollToTop = () =>
  pushEvent({ event: "scroll-to-top", value: "clicked scroll-to-top" });
