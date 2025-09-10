<script setup lang="ts">
const colorMode = useColorMode();
const logoComputed = computed(() =>
  colorMode.value === "dark"
    ? "/media/logos/ezdev-logo-white.png"
    : "/media/logos/ezdev-logo.png",
);
</script>

<template>
  <NuxtLink to="/"
    ><NuxtImg :src="logoComputed" class="w-30 md:w-60 lg:70"
  /></NuxtLink>
</template>
