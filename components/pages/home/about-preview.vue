<script setup lang="ts">
const site = useContent("site");
const about = computed(() => site.value.home.about);

// Swap for "/media/anthony-headshot.jpg" once a real headshot exists.
const photo = "/media/anthony-headshot-placeholder.svg";
</script>

<template>
  <section
    id="about"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,8vw,120px)]"
  >
    <!-- Grid areas: heading leads on small screens, photo left from 900px -->
    <div
      class="grid gap-6 [grid-template-areas:'head'_'photo'_'body'] min-[900px]:grid-cols-[clamp(300px,32vw,420px)_minmax(0,1fr)] min-[900px]:grid-rows-[auto_1fr] min-[900px]:gap-x-[clamp(40px,5vw,72px)] min-[900px]:gap-y-5 min-[900px]:[grid-template-areas:'photo_head'_'photo_body']"
    >
      <div class="[grid-area:head] min-[900px]:self-end">
        <p class="eyebrow mb-2.5 md:mb-3.5">{{ about.eyebrow }}</p>
        <h2
          class="max-w-[620px] text-[length:clamp(30px,1.4vw_+_24px,44px)] leading-[1.1] font-black tracking-[-0.03em] text-[#f4f7fa]"
        >
          {{ about.title }}
        </h2>
      </div>

      <figure class="w-full max-w-[360px] [grid-area:photo] min-[900px]:max-w-none">
        <div class="frame aspect-[4/5] p-[clamp(10px,1vw,14px)]">
          <img
            :src="photo"
            :alt="about.photoAlt"
            width="400"
            height="500"
            loading="lazy"
            class="block h-full w-full object-cover object-top"
          >
          <span class="bracket bracket-tl" aria-hidden="true" />
          <span class="bracket bracket-tr" aria-hidden="true" />
          <span class="bracket bracket-bl" aria-hidden="true" />
          <span class="bracket bracket-br" aria-hidden="true" />
        </div>
        <figcaption class="mono mt-3 text-[10px] tracking-[0.12em] uppercase md:text-[11px]">
          {{ about.caption }}
          <span class="text-primary-gold">· {{ about.role }}</span>
        </figcaption>
      </figure>

      <div class="flex max-w-[620px] flex-col gap-4 [grid-area:body] md:gap-5">
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
