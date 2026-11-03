<script setup lang="ts">
const site = useContent("site");
const about = computed(() => site.value.home.about);
</script>

<template>
  <section
    id="about"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,8vw,120px)]"
  >
    <!-- Heading left, body right from 900px -->
    <div
      class="reveal grid gap-6 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-x-[clamp(40px,5vw,72px)]"
    >
      <div>
        <p class="eyebrow mb-2.5 md:mb-3.5">{{ about.eyebrow }}</p>
        <h2
          class="max-w-[720px] text-[length:clamp(30px,1.4vw_+_24px,44px)] leading-[1.1] font-black tracking-[-0.03em] text-[#f4f7fa]"
        >
          {{ about.title }}
        </h2>
      </div>

      <div class="flex max-w-[620px] flex-col gap-4 md:gap-5 min-[900px]:pt-9">
        <p
          v-for="(para, i) in about.body"
          :key="i"
          class="leading-relaxed"
          :class="i === 0 ? 'text-[length:clamp(17px,0.2vw_+_16px,19px)] text-[oklch(80%_0.02_250)]' : ''"
        >
          {{ para }}
        </p>
        <div class="pt-1">
          <UiButton to="/contact-me">{{ about.cta }}</UiButton>
        </div>
      </div>
    </div>
  </section>
</template>
