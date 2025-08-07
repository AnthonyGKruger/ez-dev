<script setup lang="ts"></script>

<template>
  <UxFeatureToggle
    id="language-toggle"
    checked-emoji="🇿🇦af"
    unchecked-emoji="🇿🇦en"
    name="theme-toggle"
    bottom="12px"
    right="0"
    :checked-value="$colorMode.value === 'light'"
    @toggle="
      () =>
        $colorMode.value === 'dark'
          ? ($colorMode.preference = 'light')
          : ($colorMode.preference = 'dark')
    "
  />
</template>

<style scoped></style>
