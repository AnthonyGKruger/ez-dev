<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue";

useAnalytics();
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
    <DevOnly>
      <ToolsDevTools />
    </DevOnly>
    <SpeedInsights />
  </div>
</template>
