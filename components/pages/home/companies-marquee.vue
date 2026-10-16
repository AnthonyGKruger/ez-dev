<script setup lang="ts">
const site = useContent("site");
const label = computed(() => site.value.home.trusted.label);
const companies = computed(() => site.value.companies.items);
</script>

<template>
  <section :aria-label="label" class="reveal border-b border-primary-gold/10">
    <div
      class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] py-9 md:flex md:items-center md:gap-14 md:py-11"
    >
      <p class="eyebrow flex-none text-center md:text-left">{{ label }}</p>
      <ul
        class="mt-5.5 grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:mt-0 md:flex md:flex-1 md:items-center md:justify-between md:gap-10"
      >
        <li v-for="c in companies" :key="c.name" class="flex w-full justify-center md:w-auto">
          <img
            :src="c.logo"
            :alt="c.name"
            :width="c.width"
            :height="c.height"
            loading="lazy"
            class="h-6 w-auto max-w-full object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100 md:h-7"
          >
        </li>
      </ul>
    </div>
  </section>
</template>
