<script setup lang="ts">
const site = useContent("site");
const companies = computed(() => site.value.companies);
</script>

<template>
  <section class="border-t border-b border-primary-gold py-7 px-4">
    <h2
      class="mono text-sm tracking-[.1em] text-primary-gold text-center mb-8"
    >
      {{ companies.heading }}
    </h2>
    <div class="overflow-hidden relative max-w-[1240px] mx-auto">
      <div
        class="flex gap-16 items-center"
        style="animation: marquee 30s linear infinite; width: max-content"
      >
        <template v-for="n in 2" :key="n">
          <img
            v-for="c in companies.items"
            :key="`${n}-${c.name}`"
            :src="c.logo"
            :alt="c.name"
            class="h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-all duration-300"
            style="filter: grayscale(1)"
          />
        </template>
      </div>
    </div>
  </section>
</template>
