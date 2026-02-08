<script setup lang="ts">
import { portfolioItems } from "~/assets/config/data";
const { t } = useTranslate();
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/Portfolio.json"
    :content="t('portfolio-heading')"
    :subtitle="t('portfolio-subtitle')"
  />
  <section class="py-14 bg-alternative-blue dark:bg-black overflow-hidden">
    <div class="container px-6 m-auto">
      <div class="grid grid-cols-4 gap-6 md:grid-cols-4 lg:grid-cols-12">
        <PagesPortfolioMotionCard
          v-for="portfolioItem in portfolioItems"
          :key="portfolioItem.title"
          :portfolio-item="portfolioItem"
        />
      </div>
    </div>
    <PagesSideProjectsContent />
  </section>
</template>
