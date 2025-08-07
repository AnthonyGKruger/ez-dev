<script setup lang="ts">
const getYearDiffWithMonth = (startDate: Date, endDate: Date) => {
  const ms = endDate.getTime() - startDate.getTime();
  const date = new Date(ms);
  return Math.abs(date.getUTCFullYear() - 1970);
};
</script>

<template>
  <div class="lg:w-2/3">
    <h1 class="text-4xl md:text-5xl text-light-gold md:font-extrabold">
      Hi there, my name is Anthony & I am a Web Developer!
    </h1>
    <p class="text-2xl tracking-wide mt-5 text-white">
      I'm an ambitious and determined individual with a Bachelor's degree in
      information technology and
      {{ getYearDiffWithMonth(new Date("2020-11-01"), new Date()) }}
      years of experience in web development.
    </p>
    <p class="text-2xl tracking-wide mt-5 text-white lg:h-8 md:h-16 h-24">
      Looking for a Skilled Web Developer?
      <PagesHomeTypedText />
    </p>
  </div>
</template>
