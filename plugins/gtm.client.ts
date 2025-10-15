import type {
  GTMWindow,
  GTMDataLayer,
  CustomGTMEvent,
  GTMConfig,
} from "~/types/analytics";

declare const window: GTMWindow;

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const gtmId = config.public.gtmId as string;

  const initializeDataLayer = (): void => {
    (window as GTMWindow).dataLayer = (window as GTMWindow).dataLayer || [];
    (window as GTMWindow).dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });
  };

  const pushEvent = (eventData: CustomGTMEvent): void => {
    if (import.meta.dev) {
      console.log("GTM Event (dev mode):", eventData);
      return;
    }

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(eventData);
    }
  };

  initializeDataLayer();

  // Script injection is handled globally in app.vue to ensure availability on all pages
  // and to avoid duplicate injections.

  return {
    provide: {
      gtm: {
        pushEvent,
      },
    },
  };
});
