<script setup lang="ts">
const content = useContent("languages");
</script>

<template>
  <section class="max-w-[1080px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        {{ content.eyebrow }}
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <div class="flex items-end justify-between gap-6 mb-[52px] flex-wrap">
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        {{ content.heading }}
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)]">
        {{ content.tagline }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="l in content.items"
        :key="l.code"
        class="border border-primary-gold/25 rounded-2xl bg-surface-bg p-8"
      >
        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <span
              class="mono flex items-center justify-center w-[52px] h-[52px] rounded-xl text-base font-bold tracking-[.06em] bg-primary-gold/10 border border-primary-gold/35 text-light-gold"
            >
              {{ l.code }}
            </span>
            <div>
              <h3 class="text-2xl font-bold text-[#f4f7fa]">{{ l.name }}</h3>
              <p class="mono text-xs tracking-[.08em] text-light-gold mt-[5px]">
                {{ l.level }}
              </p>
            </div>
          </div>
          <span class="mono text-[26px] font-bold text-light-gold">{{ l.pct }}</span>
        </div>
        <div class="mt-6 h-2 rounded-md bg-body-bg overflow-hidden">
          <div
            class="h-full rounded-md"
            style="background: linear-gradient(90deg, oklch(62.28% 0.083 75.89), oklch(85.9% 0.072 82.67)); width: 100%"
          ></div>
        </div>
        <p class="text-sm leading-relaxed text-[oklch(76%_0.02_250)] mt-5">
          {{ l.note }}
        </p>
      </div>
    </div>
  </section>
</template>
