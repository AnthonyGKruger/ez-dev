<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("home", { title: t("home-title"), rawTitle: true });

// Initialize scroll-reveal on home page
useScrollReveal();
</script>

<template>
  <main>
    <PagesHomeHero />
    <PagesHomeCompaniesMarquee />
    <PagesHomePortfolioPreview />
    <PagesHomeServicesPreview />
    <PagesHomeAboutPreview />
    <PagesHomeSkillsPreview />
    <PagesHomeContactCta />
  </main>
</template>
