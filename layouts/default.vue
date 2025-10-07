<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";
const { getLang } = useTranslate();
onMounted(() => getLang());
</script>

<template>
  <div class="relative">
    <UiMouseHoverOverlay />
    <UiNav />
    <main class="dark:bg-neutral-950"><slot /></main>
    <UiFooter />
    <UxCookieNotice />
    <UxScrollToTop />
    <UxLanguageToggle />
    <UxThemeToggle />
    <SpeedInsights />
  </div>
</template>
