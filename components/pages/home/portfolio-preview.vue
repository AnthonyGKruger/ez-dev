<script setup lang="ts">
const content = useContent("portfolio");

const projects = computed(() =>
  content.value.projects.map((p, i) => ({
    ...p,
    index: String(i + 1).padStart(2, "0"),
    domain: p.link?.replace("https://", "").replace("www.", "") || "",
  }))
);
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 py-20 reveal">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        {{ content.eyebrow }}
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <div
      class="flex items-end justify-between gap-6 mb-[52px] flex-wrap"
    >
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        {{ content.heading }}
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)] max-w-[26em] text-right">
        {{ content.intro }}
      </p>
    </div>

    <!-- Project cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-7">
      <div
        v-for="p in projects"
        :key="p.id"
        class="border border-primary-gold/25 rounded-2xl bg-surface-bg overflow-hidden flex flex-col transition-all duration-[.4s] hover:-translate-y-1.5 hover:border-primary-gold/70"
        style="box-shadow: 0 24px 50px -20px oklch(0% 0 0 / .6)"
      >
        <!-- Browser chrome -->
        <div
          class="mono flex items-center gap-2 px-3.5 py-2.5 border-b border-primary-gold/20 bg-body-bg"
        >
          <span
            class="w-[9px] h-[9px] rounded-full bg-primary-gold/50"
          ></span>
          <span
            class="w-[9px] h-[9px] rounded-full bg-primary-gold/30"
          ></span>
          <span
            class="w-[9px] h-[9px] rounded-full bg-primary-gold/30"
          ></span>
          <span
            class="flex-1 text-center text-[11px] tracking-[.04em] text-[oklch(68%_0.02_250)]"
          >
            {{ p.domain }}
          </span>
          <span class="text-[11px] text-primary-gold">{{ p.index }}</span>
        </div>

        <!-- Image area -->
        <div class="aspect-[16/9] bg-[#fff] overflow-hidden">
          <img
            v-if="p.image"
            :src="p.image"
            :alt="p.title"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="w-full h-full flex flex-col items-center justify-center gap-2"
            style="background: repeating-linear-gradient(135deg, oklch(26% 0.05 251) 0 12px, oklch(23% 0.045 252) 12px 24px)"
          >
            <span class="mono text-[22px] font-bold text-light-gold tracking-[.02em]">
              {{ p.title }}
            </span>
            <span class="mono text-[11px] tracking-[.1em] text-[oklch(62%_0.02_250)]">
              ↳ {{ content.labels.screenshot }}
            </span>
          </div>
        </div>

        <!-- Card content -->
        <div class="p-[26px] flex flex-col flex-1 pt-6">
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-[22px] font-bold text-[#f4f7fa]">
              {{ p.title }}
            </h3>
          </div>
          <p class="text-[15px] leading-relaxed text-[oklch(78%_0.02_250)] mt-3 mb-[18px] flex-1">
            {{ p.description }}
          </p>

          <!-- Action buttons -->
          <div class="flex gap-3 flex-wrap">
            <a
              v-if="p.link"
              :href="p.link"
              target="_blank"
              rel="noreferrer noopener"
              class="mono inline-flex items-center gap-[7px] px-[18px] py-2.5 rounded-lg text-[13px] font-bold bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold"
            >
              {{ content.labels.visit }} &nearr;
            </a>
            <a
              v-if="p.sourceCode"
              :href="p.sourceCode"
              target="_blank"
              rel="noreferrer noopener"
              class="mono inline-flex items-center gap-[7px] px-[18px] py-2.5 rounded-lg text-[13px] font-bold bg-transparent text-light-gold border border-primary-gold/40 transition-all duration-300 hover:border-light-gold"
            >
              {{ content.labels.code }}
            </a>
            <a
              v-if="p.referralLetter"
              :href="p.referralLetter"
              target="_blank"
              rel="noreferrer noopener"
              class="mono inline-flex items-center gap-[7px] px-[18px] py-2.5 rounded-lg text-[13px] font-bold bg-transparent text-[oklch(78%_0.02_250)] border border-primary-gold/40"
            >
              <Icon name="mdi:email-newsletter" size="15" class="text-light-gold" />
              {{ content.labels.referralLetter }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- View all work -->
    <NuxtLink
      to="/portfolio"
      class="flex items-center justify-between gap-4 mt-7 p-[26px] px-7 border border-dashed border-primary-gold/35 rounded-2xl transition-all duration-300 hover:bg-surface-bg hover:border-primary-gold/70"
    >
      <div class="flex items-center gap-4">
        <span class="mono text-xs tracking-[.1em] text-primary-gold"
          >{{ content.viewAll.label }}</span
        >
        <span class="text-[oklch(60%_0.02_250)]">/</span>
        <span class="text-[17px] font-bold text-[#f4f7fa]"
          >{{ content.viewAll.text }}</span
        >
      </div>
      <Icon name="mdi:arrow-right" size="22" class="text-light-gold" />
    </NuxtLink>
  </section>
</template>
