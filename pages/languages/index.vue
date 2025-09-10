<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo('languages', { title: t('languages-title') });
</script>

<template>
  <PagesLanguagesContent />
</template>
