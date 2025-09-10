<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo('home', { title: t('home-title') });
</script>
<template>
  <PagesHomeHero />
  <PagesSkillsGrid />
  <PagesPortfolioContent />
  <PagesContactMeForm />
  <PagesQualificationContent />
  <PagesWorkExperienceContent />
</template>
