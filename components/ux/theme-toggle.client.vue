<script setup lang="ts">
const { trackFeatureUsage } = useGtm();
const colorMode = useColorMode();
const handleToggle = () => {
  colorMode.value === "dark"
    ? (colorMode.preference = "light")
    : (colorMode.preference = "dark");
  trackFeatureUsage("toggle-theme", {
    "previous-theme": `toggled from ${colorMode.value === "dark" ? "light" : "dark"}`,
    "new-theme": `toggled to ${colorMode.value}`,
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
