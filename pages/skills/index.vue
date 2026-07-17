<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
const skills = useContent("skills");
setSeo("skills", { title: t("skills-title"), description: skills.value.heading });
</script>

<template>
  <PagesSkillsGrid />
</template>
