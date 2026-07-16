<script setup lang="ts">
import { workExperienceItems } from "~/assets/config/data";
const { t } = useTranslate();
</script>

<template>
  <section class="max-w-[1080px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        // EXPERIENCE
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <div class="flex items-end justify-between gap-6 mb-[52px] flex-wrap">
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        Where I've built
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)]">
        HARD WORK &amp; PERSEVERANCE
      </p>
    </div>

    <!-- Timeline -->
    <div class="relative pl-[34px]">
      <!-- Vertical line -->
      <div
        class="absolute left-1.5 top-1.5 bottom-1.5 w-0.5"
        style="background: linear-gradient(oklch(62.28% 0.083 75.89), oklch(62.28% 0.083 75.89 / .15))"
      ></div>

      <div class="flex flex-col gap-3.5">
        <div
          v-for="w in workExperienceItems"
          :key="w.id"
          class="relative border border-primary-gold/25 rounded-2xl bg-surface-bg p-6 transition-colors duration-[.4s] hover:border-primary-gold/60"
        >
          <!-- Timeline dot -->
          <span
            class="absolute -left-[34px] top-7 w-3.5 h-3.5 rounded-full bg-primary-gold"
            style="box-shadow: 0 0 0 4px oklch(19% 0.03 253), 0 0 0 6px oklch(62.28% 0.083 75.89 / .3)"
          ></span>

          <div class="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 class="text-[21px] font-bold text-[#f4f7fa]">{{ w.company }}</h3>
            <span class="mono text-xs tracking-[.06em] text-primary-gold whitespace-nowrap">
              {{ w.dateFrom }} — {{ w.dateTo }}
            </span>
          </div>
          <p class="mono text-[13px] tracking-[.04em] text-light-gold mt-2">
            {{ t(w.role) }}
          </p>
          <p
            v-if="w.summary"
            class="text-[15px] leading-relaxed text-[oklch(76%_0.02_250)] mt-3.5"
          >
            {{ t(w.summary) }}
          </p>

          <!-- Highlight badges -->
          <div v-if="w.comments && w.comments.length" class="flex gap-2.5 flex-wrap mt-4">
            <span
              v-for="c in w.comments"
              :key="c"
              class="mono inline-flex items-center gap-[7px] text-xs px-3 py-1.5 rounded-[7px] bg-primary-gold/10 text-light-gold border border-primary-gold/25"
            >
              <Icon name="mdi:medal" size="14" class="text-light-gold" />
              {{ t(c) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
