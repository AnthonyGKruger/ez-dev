<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("home", { title: t("home-title") });

// Initialize scroll-reveal on home page
useScrollReveal();
</script>

<template>
  <main>
    <PagesHomeHero />
    <PagesHomeCompaniesMarquee />
    <PagesHomeAboutPreview />
    <PagesHomePortfolioPreview />
    <PagesHomeSkillsPreview />
    <PagesHomeContactCta />
  </main>
</template>
