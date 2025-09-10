<script setup lang="ts">
const { x, y } = useMouse();
const isSafari = computed(
  () =>
    !["chrome", "firefox"].some((browser) =>
      navigator?.userAgent?.toLowerCase()?.includes(browser),
    ),
);
</script>
<template>
  <div
    ref="div"
    v-if="!isSafari"
    class="absolute bg-radial-[at_1%_0%] from-primary-gold blur-2xl w-16 h-16 z-50 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none navigation hidden md:block"
    :style="{ top: `${y}px`, left: `${x}px` }"
  ></div>
</template>
