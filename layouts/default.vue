<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";

const { getLang } = useTranslate();
const route = useRoute();

useAnalytics();

const marginTopComputed = computed(() =>
  route.path === "/" ? "mt-[54px]" : "mt-[111px]",
);

onMounted(() => getLang());
</script>

<template>
  <div class="relative dark:bg-neutral-950">
    <UiMouseHoverOverlay />
    <UiNav />
    <main class="dark:bg-neutral-950" :class="marginTopComputed">
      <slot />
    </main>
    <UiFooter />
    <UxCookieNotice />
    <UxScrollToTop />
    <UxLanguageToggle />
    <UxThemeToggle />
    <DevOnly>
      <ToolsDevTools />
    </DevOnly>
    <SpeedInsights />
  </div>
</template>
