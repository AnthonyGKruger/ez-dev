<script setup lang="ts">
const site = useContent("site");
const cta = computed(() => site.value.home.cta);
</script>

<template>
  <section
    id="contact"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,7vw,100px)] pb-20 md:pb-30"
  >
    <div
      class="frame flex flex-col gap-7 px-[clamp(24px,4.4vw,64px)] py-[clamp(40px,5vw,72px)] min-[900px]:flex-row min-[900px]:items-center min-[900px]:justify-between min-[900px]:gap-12"
    >
      <div class="grid-backdrop cta-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

      <div class="relative">
        <p class="eyebrow mb-2.5 md:mb-3.5">{{ cta.eyebrow }}</p>
        <h2
          class="text-[length:clamp(32px,2.1vw_+_22px,52px)] leading-[1.06] font-black tracking-[-0.035em] text-[#f4f7fa]"
        >
          {{ cta.title }}
          <span class="text-light-gold">{{ cta.titleAccent }}</span>
        </h2>
        <p class="mt-4 text-[length:clamp(17px,0.2vw_+_16px,19px)]">{{ cta.reply }}</p>
      </div>

      <div
        class="relative flex flex-col items-stretch gap-2 min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-6 min-[900px]:flex-none min-[900px]:flex-col min-[900px]:items-end min-[900px]:gap-4"
      >
        <UiButton variant="primary" to="/contact-me" class="md:min-h-14 md:px-8">
          {{ cta.button }}
        </UiButton>
        <a
          :href="`mailto:${cta.email}`"
          class="mono inline-flex min-h-11 items-center justify-center py-2.5 text-sm text-light-gold hover:text-[#f4f7fa] md:text-[15px]"
        >
          {{ cta.email }}
        </a>
      </div>

      <span class="bracket bracket-tl" aria-hidden="true" />
      <span class="bracket bracket-tr" aria-hidden="true" />
      <span class="bracket bracket-bl" aria-hidden="true" />
      <span class="bracket bracket-br" aria-hidden="true" />
    </div>
  </section>
</template>

<style scoped>
/* Grid mask centred right, behind the actions */
.cta-backdrop {
  mask-image: radial-gradient(ellipse 60% 90% at 85% 50%, #000 30%, transparent 80%);
}
</style>
