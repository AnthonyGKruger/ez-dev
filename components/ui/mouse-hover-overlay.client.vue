<script setup lang="ts">
const { x, y } = useMouse();
</script>
<template>
  <div
    ref="div"
    class="absolute bg-primary-gold w-16 h-16 z-50 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none blur-2xl hidden md:block"
    :style="{ top: `${y}px`, left: `${x}px` }"
  ></div>
</template>
