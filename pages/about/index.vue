<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("about", { title: t("about-title") });
</script>

<template>
  <PagesAboutHero />
</template>
