<script setup lang="ts">
import Typewriter from "typewriter-effect/dist/core";

const strings = reactive([
  "Let's collaborate!",
  "Let's build something together!",
  "Have a look at my portfolio!",
  "Contact me!",
]);

onMounted(() =>
  setTimeout(
    () =>
      new Typewriter("#typed", {
        strings,
        autoStart: true,
        cursor: "|",
        loop: true,
        delay: "natural",
      }),
    500,
  ),
);
</script>

<template>
  <span id="typed" class="duration-200 transition-all text-white"></span>
</template>
