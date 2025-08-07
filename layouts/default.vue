<script setup lang="ts"></script>

<template>
  <div>
    <UiMouseHoverOverlay />
    <UiNav />
    <main class="min-h-screen pt-13 dark:bg-neutral-950"><slot></slot></main>
    <UiFooter />
    <UxCookieNotice />
    <UxScrollToTop />
    <UxThemeToggle />
  </div>
</template>
