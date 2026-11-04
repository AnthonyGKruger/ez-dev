<script setup lang="ts">
const site = useContent("site");
const about = computed(() => site.value.home.about);
</script>

<template>
  <section
    id="about"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,8vw,120px)]"
  >
    <!-- Heading and intro side by side from 900px -->
    <div
      class="reveal grid gap-5 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-x-[clamp(40px,5vw,72px)]"
    >
      <div>
        <p class="eyebrow mb-2.5 md:mb-3.5">{{ about.eyebrow }}</p>
        <h2
          class="text-[length:clamp(30px,1.4vw_+_24px,44px)] leading-[1.1] font-black tracking-[-0.03em] text-[#f4f7fa]"
        >
          {{ about.title }}
        </h2>
      </div>

      <div class="flex flex-col items-start gap-5 min-[900px]:pt-7">
        <p
          v-for="(para, i) in about.body"
          :key="i"
          class="text-[length:clamp(17px,0.2vw_+_16px,19px)] leading-relaxed text-[oklch(80%_0.02_250)]"
        >
          {{ para }}
        </p>
        <UiButton to="/contact-me">{{ about.cta }}</UiButton>
      </div>
    </div>

    <!-- Points: one row under a gold rule, split like the hero stats -->
    <ul
      class="reveal mt-10 grid border-t border-primary-gold/20 md:mt-14 min-[720px]:grid-cols-3"
      data-reveal-stagger
    >
      <li
        v-for="(point, i) in about.points"
        :key="point.title"
        class="flex flex-col gap-2 py-6 max-[719px]:not-first:border-t max-[719px]:not-first:border-primary-gold/10 min-[720px]:pt-7 min-[720px]:pb-0"
        :class="i > 0 ? 'min-[720px]:border-l min-[720px]:border-primary-gold/20 min-[720px]:pl-[clamp(20px,2.4vw,36px)]' : ''"      >
        <span class="mono text-[11px] tracking-[0.14em] text-primary-gold md:text-xs">
          {{ String(i + 1).padStart(2, "0") }}
        </span>
        <h3 class="text-lg font-bold tracking-[-0.01em] text-[#f4f7fa] md:text-xl">
          {{ point.title }}
        </h3>
        <p class="max-w-[340px] leading-relaxed min-[720px]:pr-[clamp(12px,2vw,28px)]">
          {{ point.body }}
        </p>
      </li>
    </ul>
  </section>
</template>
