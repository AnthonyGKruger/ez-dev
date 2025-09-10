<script setup lang="ts">
import { useTranslate } from "#imports";

const { t, getLang } = useTranslate();

const getYearDiffWithMonth = (startDate: Date, endDate: Date) => {
  const ms = endDate.getTime() - startDate.getTime();
  const date = new Date(ms);
  return Math.abs(date.getUTCFullYear() - 1970);
};
</script>

<template>
  <div class="md:w-3/4 lg:w-2/3">
    <h1 class="text-4xl md:text-5xl text-light-gold md:font-extrabold">
      {{ t("home-hero-title") }}
    </h1>
    <p class="text-2xl tracking-wide mt-5 text-white">
      {{
        t("home-hero-p1", {
          years: getYearDiffWithMonth(new Date("2020-11-01"), new Date()),
        })
      }}
    </p>
    <p class="text-2xl tracking-wide mt-5 text-white lg:h-8 md:h-16 h-24">
      {{ t("home-hero-cta-line") }}
      <PagesHomeTypedText :key="getLang()" />
    </p>
  </div>
</template>
