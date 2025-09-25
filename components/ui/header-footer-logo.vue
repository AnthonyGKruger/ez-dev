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
    ><LazyNuxtImg
      :src="logoComputed"
      alt="EZdev"
      class="w-30 md:w-60 lg:70"
      loading="lazy"
  /></NuxtLink>
</template>
