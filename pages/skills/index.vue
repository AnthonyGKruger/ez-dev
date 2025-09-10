<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("skills", { title: t("skills-title"), description: t("skills-heading") });
</script>

<template>
  <PagesSkillsGrid />
</template>
