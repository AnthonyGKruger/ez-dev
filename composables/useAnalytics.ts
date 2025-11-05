import { useHead } from "#imports";
import { useRuntimeConfig } from "#imports";

export default () => {
  const config = useRuntimeConfig();
  const HOTJAR_ID = 3647050;
  const HOTJAR_SV = 6;

  const gtmId = computed(() => config.public.gtmId as string);

  useHead({
    script: [
      gtmId.value
        ? {
            key: "gtm-base",
            src: `https://www.googletagmanager.com/gtm.js?id=${gtmId.value}`,
            async: true,
          }
        : null,
      {
        key: "hotjar-base",
        innerHTML: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${HOTJAR_ID},hjsv:${HOTJAR_SV}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
        type: "text/javascript",
      },
    ].filter(Boolean),
  });
};
