<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("work", {
  title: t("work-experience-title"),
  description: t("work-subtitle"),
});
</script>

<template>
  <PagesWorkExperienceContent />
</template>
