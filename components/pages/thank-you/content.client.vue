<script setup lang="ts">
const site = useContent("site");
const thankYou = computed(() => site.value.thankYou);
</script>

<template>
  <section
    class="flex items-center justify-center px-7 py-20 min-h-[70vh]"
  >
    <div class="max-w-[620px] text-center">
      <div class="w-[200px] h-[200px] mx-auto mb-2">
        <LottiePlayer src="/lotties/ContactMe.json" height="200px" width="200px" />
      </div>
      <p class="mono text-[13px] tracking-[.16em] text-primary-gold mb-4">
        {{ thankYou.eyebrow }}
      </p>
      <h1 class="text-[52px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        {{ thankYou.heading }}
      </h1>
      <p class="text-lg leading-relaxed text-[oklch(80%_0.02_250)] mt-5 mb-9">
        {{ thankYou.message }}
      </p>
      <div class="flex gap-3.5 justify-center flex-wrap">
        <NuxtLink
          to="/"
          class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold"
        >
          {{ thankYou.ctaHome }}
        </NuxtLink>
        <NuxtLink
          to="/portfolio"
          class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-transparent text-light-gold border border-primary-gold/50 transition-all duration-300 hover:border-light-gold hover:bg-primary-gold/10"
        >
          {{ thankYou.ctaWork }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
