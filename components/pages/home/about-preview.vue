<script setup lang="ts">
const site = useContent("site");
const about = computed(() => site.value.about);
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 py-20 reveal">
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        {{ about.eyebrow }}
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-14 items-center"
    >
      <!-- Photo card -->
      <div class="relative reveal-l hidden lg:block">
        <div
          class="relative border border-primary-gold/35 rounded-[18px] overflow-hidden bg-surface-bg"
        >
          <div
            class="mono flex justify-between text-[11px] tracking-[.1em] text-primary-gold px-4 py-3 border-b border-primary-gold/20"
          >
            <span>{{ about.photoName }}</span>
            <span>{{ about.photoLocation }}</span>
          </div>
          <img
            src="/media/AnthonyIllustrated.jpeg"
            alt="Anthony Kruger"
            class="w-full block"
          />
        </div>
        <span
          class="absolute -top-1.5 -left-1.5 w-[18px] h-[18px] border-t-2 border-l-2 border-light-gold"
        />
        <span
          class="absolute -bottom-1.5 -right-1.5 w-[18px] h-[18px] border-b-2 border-r-2 border-light-gold"
        />
      </div>

      <!-- Text -->
      <div class="reveal-r">
        <h1
          class="text-[56px] leading-[1.05] font-black tracking-[-0.02em] text-[#f4f7fa]"
        >
          {{ about.headline }}<br /><span class="text-light-gold">{{
            about.headlineAccent
          }}</span>
        </h1>
        <p
          v-for="(para, i) in about.paragraphs"
          :key="i"
          :class="
            i === 0
              ? 'text-lg leading-relaxed text-[oklch(82%_0.02_250)] mt-7'
              : 'text-base leading-relaxed text-[oklch(76%_0.02_250)] mt-[18px]'
          "
        >
          {{ para }}
        </p>
        <div class="flex gap-3.5 mt-8 flex-wrap">
          <UiButton to="/contact-me">{{ about.ctaChat }}</UiButton>
          <UiButton to="/portfolio">{{ about.ctaWork }}</UiButton>
        </div>
      </div>
    </div>
  </section>
</template>
