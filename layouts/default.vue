<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
const { getLang } = useTranslate();

const config = useRuntimeConfig();
const route = useRoute();
const gtmId = config.public.gtmId as string;
const marginTopComputed = computed(() =>
  route?.path === "/" ? "mt-[54px]" : "mt-[111px]",
);
onMounted(() => {
  getLang();
  useHead({
    script: [
      {
        key: "gtm-base",
        src: `https://www.googletagmanager.com/gtm.js?id=${gtmId}`,
        async: true,
      },
      {
        key: "hotjar-base",
        innerHTML: `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:3647050,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `,
        type: "text/javascript",
      },
    ],
  });
});
</script>

<template>
  <div class="relative dark:bg-neutral-950">
    <UiMouseHoverOverlay />
    <UiNav />
    <main class="dark:bg-neutral-950" :class="marginTopComputed"><slot /></main>
    <UiFooter />
    <UxCookieNotice />
    <UxScrollToTop />
    <UxLanguageToggle />
    <UxThemeToggle />
    <SpeedInsights />
  </div>
</template>
