<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";

const { getLang } = useTranslate();

useAnalytics();

onMounted(() => getLang());
</script>

<template>
  <div class="relative dark:bg-neutral-950">
    <UiMouseHoverOverlay />
    <UiNav />
    <main class="dark:bg-neutral-950 mt-10">
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
