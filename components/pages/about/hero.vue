<script setup lang="ts">
import Button from "~/src/volt/Button.vue";
const { t } = useTranslate();
</script>
<template>
  <section
    aria-labelledby="about-heading"
    class="lg:py-20 pb-9 bg-alternative-blue dark:bg-transparent"
  >
    <div class="container px-6 m-auto">
      <div class="flex flex-col xl:flex-row gap-6 items-stretch">
        <div class="w-full xl:w-5/12 self-center aspect-square">
          <PagesAboutHeroImage />
        </div>
        <div class="w-full xl:w-7/12">
          <h1
            id="about-heading"
            class="text-5xl text-light-gold md:font-extrabold text-center xl:text-left"
          >
            {{ t("about-hero-title") }}
          </h1>
          <p class="text-xl tracking-wide mt-5 text-white">
            {{ t("about-hero-p1") }}
          </p>
          <p class="text-xl tracking-wide mt-5 text-white">
            {{ t("about-hero-p2") }}
          </p>
          <p class="text-xl tracking-wide mt-5 text-white">
            {{ t("about-hero-p3") }}
          </p>
          <p class="text-xl tracking-wide mt-5 text-white">
            {{ t("about-hero-p4") }}
          </p>
          <div class="pt-9">
            <NuxtLink to="/contact-me" class="mt-5">
              <Button>{{ t("cta-lets-chat") }}</Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
