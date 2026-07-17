<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
const workExperience = useContent("workExperience");
setSeo("work", {
  title: t("work-experience-title"),
  description: workExperience.value.tagline,
});
</script>

<template>
  <PagesWorkExperienceContent />
</template>
