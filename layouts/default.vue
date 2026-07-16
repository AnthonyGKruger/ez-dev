<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";

const { getLang } = useTranslate();

useAnalytics();

onMounted(() => getLang());
</script>

<template>
  <div class="relative bg-body-bg min-h-screen">
    <UiMouseHoverOverlay />
    <UiNav />
    <main>
      <slot />
    </main>
    <UiFooter />
    <UxCookieNotice />
    <UxScrollToTop />
    <UxLanguageToggle />
    <DevOnly>
      <ToolsDevTools />
    </DevOnly>
    <SpeedInsights />
  </div>
</template>
