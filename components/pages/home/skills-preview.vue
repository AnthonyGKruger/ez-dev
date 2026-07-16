<script setup lang="ts">
import { skills } from "~/assets/config/data";
const { t } = useTranslate();

const alsoComfortable = [
  "Vue 3",
  "Node.js",
  "JavaScript",
  "HTML & CSS",
  "Git",
  "Microsoft Azure",
  "Figma",
  "SEO",
  "Accessibility",
  "Agile / Scrum",
];
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 py-20 reveal">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        // STACK
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <div
      class="flex items-end justify-between gap-6 mb-[52px] flex-wrap"
    >
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        Tools I reach for daily
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)]">
        HOVER TO FLIP &rarr;
      </p>
    </div>

    <!-- Flip cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[18px]">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="aspect-square"
        style="perspective: 1200px"
      >
        <div
          class="group relative w-full h-full transition-transform duration-[.7s] [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]"
        >
          <!-- Front -->
          <div
            class="absolute [backface-visibility:hidden] w-full h-full flex flex-col items-center justify-center gap-3.5 bg-surface-bg border border-primary-gold/30 rounded-2xl"
          >
            <Icon :name="skill.icon" size="60" />
            <span
              class="mono text-xs tracking-[.08em] uppercase text-[oklch(82%_0.02_250)]"
            >
              {{ skill.name }}
            </span>
          </div>
          <!-- Back -->
          <div
            class="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-primary-gold text-body-bg rounded-2xl p-5 flex items-center justify-center text-center text-sm font-medium leading-relaxed"
          >
            {{ t(skill.description) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Also comfortable with -->
    <div class="mt-14 pt-10 border-t border-primary-gold/20">
      <p class="mono text-xs tracking-[.14em] text-primary-gold mb-[22px]">
        ALSO COMFORTABLE WITH
      </p>
      <div class="flex gap-3 flex-wrap">
        <span
          v-for="t in alsoComfortable"
          :key="t"
          class="mono text-[13px] tracking-[.04em] px-4 py-[9px] rounded-lg bg-surface-bg text-[oklch(85%_0.02_250)] border border-primary-gold/25"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </section>
</template>
