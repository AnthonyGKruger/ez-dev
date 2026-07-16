<script setup lang="ts">
const { t } = useTranslate();
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 py-20 reveal">
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        // ABOUT
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-14 items-center">
      <!-- Photo card -->
      <div class="relative reveal-l">
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
      <div class="reveal-r">
        <h1
          class="text-[56px] leading-[1.05] font-black tracking-[-0.02em] text-[#f4f7fa]"
        >
          Building the web,<br /><span class="text-light-gold">end to end.</span>
        </h1>
        <p class="text-lg leading-relaxed text-[oklch(82%_0.02_250)] mt-7">
          Fueled by a passion for technology and a knack for problem-solving,
          I'm a web developer with a drive to craft intuitive and impactful web
          experiences.
        </p>
        <p class="text-base leading-relaxed text-[oklch(76%_0.02_250)] mt-[18px]">
          My journey began in the dynamic world of retail, where I honed my
          leadership and customer-centric skills as a Branch Manager. While
          exceeding sales targets and building a thriving team, I discovered a
          passion for web development — which led me to a Bachelor's degree in
          Information Technology, graduating in 2021 with a comprehensive
          understanding of web principles.
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
            {{ t("about-see-work") || "SEE MY WORK" }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
