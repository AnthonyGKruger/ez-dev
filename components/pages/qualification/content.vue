<script setup lang="ts">
import { qualifications } from "~/assets/config/data";
const { t } = useTranslate();
</script>

<template>
  <section class="max-w-[1080px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        // CREDENTIALS
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <div class="flex items-end justify-between gap-6 mb-11 flex-wrap">
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        Always leveling up
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)]">
        FORMAL &amp; CONTINUOUS LEARNING
      </p>
    </div>

    <!-- Featured degree -->
    <div
      class="border border-primary-gold/50 rounded-2xl bg-surface-bg p-8 mb-8 flex items-center gap-7 flex-wrap"
    >
      <Icon name="mdi:school" size="56" class="text-light-gold flex-shrink-0" />
      <div class="flex-1 min-w-[240px]">
        <p class="mono text-xs tracking-[.1em] text-primary-gold mb-1.5">
          2019 — 2021 · RICHFIELD GRADUATE INSTITUTE OF TECHNOLOGY
        </p>
        <h2 class="text-[26px] font-bold text-[#f4f7fa]">
          BSc IT
          <span class="text-[oklch(72%_0.02_250)] font-normal text-base"
            >— SAQA ID #35954</span
          >
        </h2>
      </div>
      <div class="flex gap-2.5 flex-wrap">
        <span
          class="mono text-xs px-[13px] py-[7px] rounded-lg bg-primary-gold/10 text-light-gold border border-primary-gold/30"
        >
          SYSTEMS DEVELOPMENT
        </span>
        <span
          class="mono text-xs px-[13px] py-[7px] rounded-lg bg-primary-gold/10 text-light-gold border border-primary-gold/30"
        >
          8 DISTINCTIONS
        </span>
      </div>
    </div>

    <!-- Certifications -->
    <p class="mono text-xs tracking-[.14em] text-primary-gold mb-[18px]">
      CERTIFICATIONS &amp; COURSES
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <a
        v-for="c in qualifications.filter((q) => q.link)"
        :key="c.id"
        :href="c.link"
        target="_blank"
        rel="noreferrer noopener"
        class="flex items-center gap-3.5 px-5 py-4 border border-primary-gold/20 rounded-xl bg-surface-bg transition-all duration-300 hover:border-primary-gold/60 hover:bg-[oklch(26%_0.05_251)]"
      >
        <Icon name="mdi:certificate" size="24" class="text-light-gold flex-shrink-0" />
        <div class="flex-1">
          <div class="text-sm font-medium text-[#eef2f6] leading-[1.35]">
            {{ c.qualification }}
          </div>
          <div class="mono text-[11px] tracking-[.06em] text-[oklch(64%_0.02_250)] mt-[3px]">
            {{ c.institution }}
          </div>
        </div>
        <span class="mono text-[11px] text-primary-gold">&nearr;</span>
      </a>
    </div>

    <!-- NSC -->
    <div
      class="mt-3 flex items-center gap-3.5 px-5 py-4 border border-primary-gold/20 rounded-xl bg-surface-bg"
    >
      <Icon name="mdi:school-outline" size="24" class="text-light-gold flex-shrink-0" />
      <div class="flex-1">
        <div class="text-sm font-medium text-[#eef2f6]">National Senior Certificate</div>
        <div class="mono text-[11px] tracking-[.06em] text-[oklch(64%_0.02_250)] mt-[3px]">
          2006 — 2010 · Lyttleton Manor High School · Half Colours for Academics
        </div>
      </div>
    </div>
  </section>
</template>
