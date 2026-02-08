<script setup lang="ts">
defineProps<{ classOverRide?: string }>();
const colorMode = useColorMode();
const route = useRoute();
const isHome = computed(() => route.path === "/");
const logoComputed = computed(() =>
  isHome.value
    ? "/media/logos/code.svg"
    : colorMode.value === "dark"
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
      :class="[classOverRide, { 'invert dark:invert-0': isHome }]"
      loading="lazy"
  /></NuxtLink>
</template>
