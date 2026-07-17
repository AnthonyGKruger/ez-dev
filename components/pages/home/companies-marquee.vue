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
      <div class="marquee-track flex items-center">
        <!--
          Two identical copies; each copy (including its trailing pr-16,
          which stands in for the flex gap) is exactly 50% of the track, so
          the translateX(-50%) loop point is seamless. Putting both copies
          in one gapped flex row instead leaves an odd number of gaps and
          the loop jumps by half a gap.
        -->
        <div
          v-for="n in 2"
          :key="n"
          class="flex gap-16 items-center pr-16"
          :aria-hidden="n === 2 ? 'true' : undefined"
        >
          <img
            v-for="c in companies.items"
            :key="`${n}-${c.name}`"
            :src="c.logo"
            :alt="n === 1 ? c.name : ''"
            :width="c.width"
            :height="c.height"
            class="h-12 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300"
            style="filter: grayscale(1)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marquee-track {
  width: max-content;
  animation: marquee 30s linear infinite;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
