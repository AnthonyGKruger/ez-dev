<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("qualifications", { title: t("qualifications-title") });
</script>

<template>
  <PagesQualificationContent />
</template>
