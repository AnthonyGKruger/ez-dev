<script setup lang="ts">
defineProps<{ classOverRide?: string }>();
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
      class="h-10 md:h-12 2xl:h-16 w-auto"
      :class="classOverRide"
      loading="lazy"
  /></NuxtLink>
</template>
