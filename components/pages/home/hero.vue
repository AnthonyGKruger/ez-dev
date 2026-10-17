<script setup lang="ts">
const site = useContent("site");
const hero = computed(() => site.value.home.hero);

const yearsExp = new Date().getFullYear() - 2020;
const withYears = (s: string) => s.replace("{years}", String(yearsExp));

// Showcase frames: A = Votera, B = Chilli Collective.
const frameA = computed(() => hero.value.showcase[0]);
const frameB = computed(() => hero.value.showcase[1]);

// Same sizes for the phone-only frame and frame A, so a phone resolves both
// to the same srcset candidate and downloads the Votera screenshot once.
const sizesA = "100vw sm:80vw lg:500px";
const sizesB = "100vw sm:60vw lg:380px";
</script>

<template>
  <section class="relative overflow-hidden border-b border-primary-gold/10">
    <div class="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

    <div
      class="relative mx-auto grid max-w-[1240px] items-center gap-16 px-[clamp(16px,5vw,24px)] pt-[clamp(56px,7vw,112px)] pb-[clamp(64px,7.5vw,120px)] lg:grid-cols-2"
    >
      <!-- Left: copy -->
      <div class="flex min-w-0 flex-col gap-5.5 md:gap-7">
        <!-- Keep each "·" part on one line, so narrow screens wrap after the
             dot rather than inside a word ("Sagteware-|ateljee"). -->
        <p class="eyebrow">
          <template v-for="(part, i) in hero.eyebrow.split(' · ')" :key="i">
            <template v-if="i > 0"> · </template><span class="whitespace-nowrap">{{ part }}</span>
          </template>
        </p>

        <h1
          class="text-[length:clamp(38px,2.6vw_+_27px,64px)] leading-[1.02] font-black tracking-[-0.035em] text-[#f4f7fa]"
        >
          {{ hero.title }}
          <span class="text-light-gold">{{ hero.titleAccent }}</span>
        </h1>

        <p
          class="max-w-[520px] text-[length:clamp(17px,0.2vw_+_16px,19px)] leading-relaxed text-[oklch(80%_0.02_250)]"
        >
          {{ withYears(hero.lead) }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-3.5">
          <UiButton variant="primary" to="/contact-me">{{ hero.ctaPrimary }}</UiButton>
          <UiButton variant="secondary" to="#work">{{ hero.ctaSecondary }}</UiButton>
        </div>

        <!-- Phones only: one compact Votera frame between CTAs and stats -->
        <figure v-if="frameA" class="sm:hidden">
          <UiFrame :label="frameA.domain" index="01">
            <NuxtImg
              :src="frameA.image"
              :alt="frameA.alt"
              :sizes="sizesA"
              format="webp"
              quality="80"
              loading="eager"
              fetchpriority="high"
              class="block aspect-video w-full object-cover object-top"
            />
          </UiFrame>
          <figcaption class="mono mt-2.5 text-[10px] uppercase tracking-[0.12em]">
            {{ frameA.domain }}
            <span class="text-primary-gold">· {{ frameA.caption }}</span>
          </figcaption>
        </figure>

        <!-- Stats: label-then-value in the DOM, number shown first visually -->
        <dl
          class="mt-2 grid border-t border-primary-gold/20 md:mt-3"
          :style="{
            gridTemplateColumns: `repeat(${hero.stats.length}, minmax(0, 1fr))`,
            maxWidth: `${hero.stats.length * 180}px`,
          }"
        >
          <div
            v-for="(stat, i) in hero.stats"
            :key="stat.label"
            class="flex flex-col-reverse gap-1 pt-4 md:pt-5"
            :class="i > 0 ? 'border-l border-primary-gold/20 pl-3 md:pl-5' : ''"
          >
            <dt
              class="mono text-[length:clamp(9px,0.15vw_+_8.4px,11px)] uppercase tracking-[0.14em] text-[oklch(78%_0.02_250)]"
            >
              {{ stat.label }}
            </dt>
            <dd
              class="mono text-[length:clamp(26px,0.5vw_+_24px,32px)] leading-none font-bold"
              :class="i === 1 ? 'text-light-gold' : 'text-[#f4f7fa]'"
            >
              {{ withYears(stat.value) }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Product showcase (≥640): two overlapping browser frames -->
      <div
        v-if="frameA && frameB"
        class="hidden min-w-0 grid-cols-10 grid-rows-[auto_clamp(56px,8vw,120px)_auto] sm:grid"
      >
        <figure class="col-[1/9] row-[1/3]">
          <figcaption class="mono mb-2.5 text-[11px] uppercase tracking-[0.12em]">
            {{ frameA.domain }}
            <span class="text-primary-gold">· {{ frameA.caption }}</span>
          </figcaption>
          <UiFrame
            :label="frameA.domain"
            index="01"
            brackets
            class="shadow-[0_30px_60px_rgb(0_0_0/0.35)]"
          >
            <NuxtImg
              :src="frameA.image"
              :alt="frameA.alt"
              :sizes="sizesA"
              format="webp"
              quality="80"
              loading="eager"
              fetchpriority="high"
              class="block aspect-video w-full object-cover object-top"
            />
          </UiFrame>
        </figure>

        <figure class="z-10 col-[5/11] row-[2/4] self-end">
          <UiFrame
            :label="frameB.domain"
            index="02"
            brackets
            class="shadow-[0_40px_80px_rgb(0_0_0/0.5)]"
          >
            <NuxtImg
              :src="frameB.image"
              :alt="frameB.alt"
              :sizes="sizesB"
              format="webp"
              quality="80"
              loading="lazy"
              class="block aspect-video w-full object-cover object-top"
            />
          </UiFrame>
          <figcaption
            class="mono mt-2.5 text-right text-[11px] uppercase tracking-[0.12em]"
          >
            {{ frameB.domain }}
            <span class="text-primary-gold">· {{ frameB.caption }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
