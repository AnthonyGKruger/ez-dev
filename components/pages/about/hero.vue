<script setup lang="ts">
const site = useContent("site");
const about = computed(() => site.value.about);
</script>

<template>
  <div class="relative bg-body-bg text-[#eef2f6] overflow-x-hidden">
    <!-- Section header -->
    <section class="max-w-[1240px] mx-auto px-7 pt-20 pb-10">
      <div class="flex items-center gap-5 mb-11">
        <div class="eyebrow">
          {{ about.eyebrow }}
        </div>
        <div class="flex-1 h-px bg-primary-gold/20"></div>
      </div>

      <div>
        <!-- Text -->
        <div class="max-w-[760px]">
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

    <!-- Fact cards -->
    <section class="max-w-[1240px] mx-auto px-7 pb-[88px]">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
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
