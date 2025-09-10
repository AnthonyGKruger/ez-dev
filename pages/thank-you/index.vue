<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo('thank-you', { 
  title: t('thank-you-title'), 
  description: t('thank-you-description') 
});
</script>

<template>
  <PagesThankYouContent />
</template>