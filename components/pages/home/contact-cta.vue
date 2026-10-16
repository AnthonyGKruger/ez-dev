<script setup lang="ts">
const site = useContent("site");
const cta = computed(() => site.value.contact.cta);
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 py-20 reveal">
    <div
      class="flex flex-col lg:flex-row items-center gap-14 border border-primary-gold/30 rounded-[18px] bg-surface-bg p-8 lg:p-12"
    >
      <div class="flex-1 text-center lg:text-left">
        <h2
          class="text-[42px] font-black tracking-[-0.02em] leading-[1.05] text-[#f4f7fa]"
        >
          {{ cta.heading }}
        </h2>
        <p
          class="text-lg leading-relaxed text-[oklch(78%_0.02_250)] mt-6 max-w-[30em]"
        >
          {{ cta.subtitle }}
        </p>
        <UiButton variant="primary" to="/contact-me" class="mt-8">{{ cta.button }}</UiButton>
      </div>
      <div class="flex-shrink-0 mx-auto">
        <LottiePlayer src="/lotties/ContactMe.json" />
      </div>
    </div>
  </section>
</template>
