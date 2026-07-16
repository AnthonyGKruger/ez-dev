<script setup lang="ts">
const { t } = useTranslate();
</script>

<template>
  <div class="relative bg-body-bg text-[#eef2f6] overflow-x-hidden">
    <!-- Section header -->
    <section class="max-w-[1240px] mx-auto px-7 pt-20 pb-10">
      <div class="flex items-center gap-5 mb-11">
        <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
          // ABOUT
        </div>
        <div class="flex-1 h-px bg-primary-gold/20"></div>
      </div>

      <div
        class="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-14 items-center"
      >
        <!-- Photo card -->
        <div class="relative">
          <div
            class="relative border border-primary-gold/35 rounded-[18px] overflow-hidden bg-surface-bg"
          >
            <div
              class="mono flex justify-between text-[11px] tracking-[.1em] text-primary-gold px-4 py-3 border-b border-primary-gold/20"
            >
              <span>ANTHONY KRUGER</span>
              <span>PRETORIA, ZA</span>
            </div>
            <img
              src="/media/AnthonyIllustrated.jpeg"
              alt="Anthony Kruger"
              class="w-full block"
            />
          </div>
          <span
            class="absolute -top-1.5 -left-1.5 w-[18px] h-[18px] border-t-2 border-l-2 border-light-gold"
          ></span>
          <span
            class="absolute -bottom-1.5 -right-1.5 w-[18px] h-[18px] border-b-2 border-r-2 border-light-gold"
          ></span>
        </div>

        <!-- Text -->
        <div>
          <h1
            class="text-[56px] leading-[1.05] font-black tracking-[-0.02em] text-[#f4f7fa]"
          >
            Building the web,<br /><span class="text-light-gold">end to end.</span>
          </h1>
          <p class="text-lg leading-relaxed text-[oklch(82%_0.02_250)] mt-7">
            {{ t("about-hero-p1") }}
          </p>
          <p class="text-base leading-relaxed text-[oklch(76%_0.02_250)] mt-[18px]">
            {{ t("about-hero-p2") }}
          </p>
          <p class="text-base leading-relaxed text-[oklch(76%_0.02_250)] mt-[18px]">
            Since then I've shipped production apps end to end — from SaaS
            platforms to e-commerce — for agencies, trading companies and my own
            clients through EZdev Solutions.
          </p>
          <div class="flex gap-3.5 mt-8 flex-wrap">
            <NuxtLink
              to="/contact-me"
              class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold hover:-translate-y-0.5"
            >
              {{ t("cta-lets-chat") }} &rarr;
            </NuxtLink>
            <NuxtLink
              to="/portfolio"
              class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-transparent text-light-gold border border-primary-gold/50 transition-all duration-300 hover:border-light-gold hover:bg-primary-gold/10"
            >
              SEE MY WORK
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Fact cards -->
    <section class="max-w-[1240px] mx-auto px-7 pb-[88px]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          class="border border-primary-gold/25 rounded-2xl bg-surface-bg p-7"
        >
          <Icon name="mdi:school" size="30" class="text-light-gold mb-4" />
          <h3 class="text-lg font-bold text-[#f4f7fa]">BSc IT, 2021</h3>
          <p class="text-sm leading-relaxed text-[oklch(76%_0.02_250)] mt-2">
            Richfield Graduate Institute of Technology — specialised in systems
            development, 8 distinctions.
          </p>
        </div>
        <div
          class="border border-primary-gold/25 rounded-2xl bg-surface-bg p-7"
        >
          <Icon name="mdi:rocket-launch" size="30" class="text-light-gold mb-4" />
          <h3 class="text-lg font-bold text-[#f4f7fa]">6+ years shipping</h3>
          <p class="text-sm leading-relaxed text-[oklch(76%_0.02_250)] mt-2">
            Production web apps across agencies, trading and my own clients —
            front-end to full-stack.
          </p>
        </div>
        <div
          class="border border-primary-gold/25 rounded-2xl bg-surface-bg p-7"
        >
          <Icon name="mdi:translate" size="30" class="text-light-gold mb-4" />
          <h3 class="text-lg font-bold text-[#f4f7fa]">Bilingual delivery</h3>
          <p class="text-sm leading-relaxed text-[oklch(76%_0.02_250)] mt-2">
            Fluent in English and Afrikaans — comfortable building and
            communicating in both.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
