<script setup lang="ts">
import Typewriter from "typewriter-effect/dist/core";
import { useTranslate } from "#imports";

const { t } = useTranslate();

const strings = computed(() => [
  t("home-typed-collaborate"),
  t("home-typed-build-together"),
  t("home-typed-portfolio"),
  t("home-typed-contact"),
]);

onMounted(() =>
  setTimeout(
    () =>
      new Typewriter("#typed", {
        strings: strings.value,
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
