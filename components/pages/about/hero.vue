<script setup lang="ts">
const site = useContent("site");
const about = computed(() => site.value.about);
</script>

<template>
  <div class="relative bg-body-bg text-[#eef2f6] overflow-x-hidden">
    <!-- Section header -->
    <section class="max-w-[1240px] mx-auto px-7 pt-20 pb-10">
      <div class="flex items-center gap-5 mb-11">
        <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
          {{ about.eyebrow }}
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
            <NuxtLink
              to="/contact-me"
              class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold hover:-translate-y-0.5"
            >
              {{ about.ctaChat }} &rarr;
            </NuxtLink>
            <NuxtLink
              to="/portfolio"
              class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-transparent text-light-gold border border-primary-gold/50 transition-all duration-300 hover:border-light-gold hover:bg-primary-gold/10"
            >
              {{ about.ctaWork }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Fact cards -->
    <section class="max-w-[1240px] mx-auto px-7 pb-[88px]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          v-for="card in about.factCards"
          :key="card.title"
          class="border border-primary-gold/25 rounded-2xl bg-surface-bg p-7"
        >
          <Icon :name="card.icon" size="30" class="text-light-gold mb-4" />
          <h3 class="text-lg font-bold text-[#f4f7fa]">{{ card.title }}</h3>
          <p class="text-sm leading-relaxed text-[oklch(76%_0.02_250)] mt-2">
            {{ card.desc }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
