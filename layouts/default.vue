<script setup lang="ts">
const { getLang } = useTranslate();
onMounted(() => getLang());
</script>

<template>
  <div>
    <UiMouseHoverOverlay />
    <UiNav />
    <main class="dark:bg-neutral-950"><slot /></main>
    <UiFooter />
    <UxCookieNotice />
    <UxScrollToTop />
    <UxLanguageToggle />
    <UxThemeToggle />
  </div>
</template>
