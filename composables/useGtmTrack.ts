import type { CustomGTMEvent } from "~/types/analytics";

export default () => {
  const nuxtApp = useNuxtApp();
  const route = useRoute();
  const { getLang } = useTranslate();

  const track = (event: string, payload: Record<string, any> = {}): void => {
    if (typeof window === "undefined") {
      return;
    }

    const baseEvent: CustomGTMEvent = {
      event,
      eventCategory: "weather-app",
      eventLabel: route.path,
      lang: getLang(),
      ts: Date.now(),
      ...payload,
    };

    const gtm: any = (nuxtApp as any).$gtm;

    if (gtm && typeof gtm.pushEvent === "function") {
      try {
        gtm.pushEvent(baseEvent);
      } catch (e) {
        if (import.meta.dev) console.warn("GTM pushEvent failed:", e, baseEvent);
      }
    } else if (import.meta.dev) {
      console.log("[GTM Fallback]", baseEvent);
    }
  };

  return { track };
};
