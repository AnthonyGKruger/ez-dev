<script setup lang="ts">
const { trackFeatureUsage } = useGtm();
const colorMode = useColorMode();
const handleToggle = () => {
  colorMode.value === "dark"
    ? (colorMode.preference = "light")
    : (colorMode.preference = "dark");
  trackFeatureUsage("language-toggle", {
    "previous-theme": colorMode.value === "dark" ? "light" : "dark",
    "new-theme": colorMode.value,
  });
};
</script>
<template>
  <UxFeatureToggle
    id="theme-toggle"
    name="theme-toggle"
    bottom="12px"
    right="0"
    type="theme"
    :checked-value="$colorMode.value === 'light'"
    @toggle="handleToggle"
  />
</template>
