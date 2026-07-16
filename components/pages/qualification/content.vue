<script setup lang="ts">
const content = useContent("qualifications");
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
    <div class="flex items-end justify-between gap-6 mb-11 flex-wrap">
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        {{ content.heading }}
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)]">
        {{ content.tagline }}
      </p>
    </div>

    <!-- Featured degree -->
    <div
      class="border border-primary-gold/50 rounded-2xl bg-surface-bg p-8 mb-8 flex items-center gap-7 flex-wrap"
    >
      <Icon name="mdi:school" size="56" class="text-light-gold flex-shrink-0" />
      <div class="flex-1 min-w-[240px]">
        <p class="mono text-xs tracking-[.1em] text-primary-gold mb-1.5">
          {{ content.featured.period }}
        </p>
        <h2 class="text-[26px] font-bold text-[#f4f7fa]">
          {{ content.featured.title }}
          <span class="text-[oklch(72%_0.02_250)] font-normal text-base">{{
            content.featured.saqa
          }}</span>
        </h2>
      </div>
      <div class="flex gap-2.5 flex-wrap">
        <span
          v-for="tag in content.featured.tags"
          :key="tag"
          class="mono text-xs px-[13px] py-[7px] rounded-lg bg-primary-gold/10 text-light-gold border border-primary-gold/30"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Certifications -->
    <p class="mono text-xs tracking-[.14em] text-primary-gold mb-[18px]">
      {{ content.certsLabel }}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <a
        v-for="c in content.certs"
        :key="c.id"
        :href="c.link"
        target="_blank"
        rel="noreferrer noopener"
        class="flex items-center gap-3.5 px-5 py-4 border border-primary-gold/20 rounded-xl bg-surface-bg transition-all duration-300 hover:border-primary-gold/60 hover:bg-[oklch(26%_0.05_251)]"
      >
        <Icon name="mdi:certificate" size="24" class="text-light-gold flex-shrink-0" />
        <div class="flex-1">
          <div class="text-sm font-medium text-[#eef2f6] leading-[1.35]">
            {{ c.title }}
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
        <div class="text-sm font-medium text-[#eef2f6]">{{ content.nsc.title }}</div>
        <div class="mono text-[11px] tracking-[.06em] text-[oklch(64%_0.02_250)] mt-[3px]">
          {{ content.nsc.meta }}
        </div>
      </div>
    </div>
  </section>
</template>
