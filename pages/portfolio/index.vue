<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("portfolio", {
  title: t("portfolio-title"),
  description: t("portfolio-subtitle"),
});
</script>

<template>
  <PagesPortfolioContent />
  <PagesContactMeForm />
</template>
