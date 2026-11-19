import { useEffect, useState, useSyncExternalStore } from "react";
import { ui } from "../content";
import { trackCookieAccept, trackScrollToTop } from "../lib/analytics";
import { Icon } from "../lib/icon";
import { AppLink, Lottie } from "./ui";

export const MouseGlow = () => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (!["chrome", "firefox"].some((b) => ua.includes(b))) return;
    const onMove = (e: MouseEvent) => setPos({ x: e.pageX, y: e.pageY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!pos) return null;
  return (
    <div
      className="pointer-events-none absolute z-50 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-[at_1%_0%] from-primary-gold blur-2xl md:block"
      style={{ top: pos.y, left: pos.x }}
    />
  );
};

const CONSENT_COOKIE = "consent";
const consentListeners = new Set<() => void>();
const subscribeConsent = (listener: () => void) => {
  consentListeners.add(listener);
  return () => consentListeners.delete(listener);
};
const hasConsent = () =>
  document.cookie.split("; ").some((c) => c === `${CONSENT_COOKIE}=true`);

export const CookieNotice = () => {
  // Hidden in the prerendered HTML so it never flashes for visitors who accepted.
  const show = !useSyncExternalStore(subscribeConsent, hasConsent, () => true);

  if (!show) return null;

  const accept = () => {
    document.cookie = `${CONSENT_COOKIE}=true; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    consentListeners.forEach((listener) => listener());
    trackCookieAccept();
  };

  return (
    <article
      role="dialog"
      aria-label="Cookie notice"
      className="fixed right-4 bottom-4 left-4 z-40 overflow-hidden rounded-2xl border border-primary-gold/35 bg-surface-bg/95 shadow-2xl md:left-auto md:max-w-md"
      style={{ backdropFilter: "blur(12px)" }}
    >
      <div className="flex items-center gap-2 px-5 pt-3 pb-2">
        <Lottie src="/lotties/Cookies.json" size="3.5rem" />
        <p className="mono text-sm font-bold tracking-widest text-light-gold">{ui.cookie.title}</p>
      </div>
      <div className="border-t border-primary-gold/25 px-5 pt-3 pb-5">
        <p className="text-sm leading-relaxed text-body">
          {ui.cookie.text}{" "}
          <AppLink
            to="/privacy-policy"
            className="text-light-gold underline duration-300 hover:text-primary-gold"
          >
            {ui.cookie.privacyLink}
          </AppLink>
        </p>
        <div className="pt-4">
          <button
            type="button"
            className="w-full rounded-xl border-2 border-light-gold px-4 py-2 text-sm font-extrabold text-white duration-500 hover:bg-light-gold hover:text-black md:w-fit xl:text-lg"
            onClick={accept}
          >
            {ui.cookie.accept}
          </button>
        </div>
      </div>
    </article>
  );
};

const subscribeScroll = (listener: () => void) => {
  window.addEventListener("scroll", listener, { passive: true });
  return () => window.removeEventListener("scroll", listener);
};

export const ScrollToTop = () => {
  const show = useSyncExternalStore(subscribeScroll, () => window.scrollY > 100, () => false);

  return (
    <button
      type="button"
      aria-label={ui.scrollToTop}
      className={`fixed right-0 bottom-4 z-40 mr-4 h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-primary-gold/60 bg-surface-bg text-xl text-light-gold transition-all duration-300 hover:scale-105 hover:border-light-gold hover:bg-primary-gold/80 ${
        show ? "flex" : "hidden"
      }`}
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        trackScrollToTop();
      }}
    >
      <Icon name="mdi:menu-up" size="2rem" className="animate-bounce text-light-gold" />
    </button>
  );
};
