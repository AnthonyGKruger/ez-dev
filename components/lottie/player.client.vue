<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
withDefaults(defineProps<{ src: string; height?: string; width?: string }>(), {
  src: "",
  height: "10rem",
  width: "10rem",
});
</script>

<template>
  <DotLottieVue :style="{ height, width }" autoplay loop :src="src" />
</template>
