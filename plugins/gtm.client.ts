interface GTMWindow extends Window {
  dataLayer: GTMDataLayer[];
}

interface GTMDataLayer {
  "gtm.start"?: number;
  event?: string;
  [key: string]: any;
}

interface GTMConfig {
  gtmId: string;
  dataLayerName?: string;
}

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

  initializeDataLayer();

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
        async: true,
      },
    ],
  });
});
