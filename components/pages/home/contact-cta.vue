<script setup lang="ts">
const { t } = useTranslate();
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 py-20 reveal">
    <div
      class="flex flex-col lg:flex-row items-center gap-14 border border-primary-gold/30 rounded-[18px] bg-surface-bg p-8 lg:p-12"
    >
      <div class="flex-1 text-center lg:text-left">
        <h2 class="text-[42px] font-black tracking-[-0.02em] leading-[1.05] text-[#f4f7fa]">
          {{ t("contact-heading-revamp") || "Let's build something together." }}
        </h2>
        <p class="text-lg leading-relaxed text-[oklch(78%_0.02_250)] mt-6 max-w-[30em]">
          Have a project in mind, or a role you're hiring for? Get in touch and
          I'll get back to you shortly.
        </p>
        <NuxtLink
          to="/contact-me"
          class="mono inline-flex items-center gap-2 mt-8 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold hover:-translate-y-0.5"
        >
          {{ t("nav-start-project") }} &rarr;
        </NuxtLink>
      </div>
      <div class="flex-shrink-0 w-[200px] h-[200px]">
        <LottiePlayer src="/lotties/ContactMe.json" />
      </div>
    </div>
  </section>
</template>
