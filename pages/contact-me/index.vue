<script setup lang="ts">
const { t } = useTranslate();
const { setSeo } = useSeo();
setSeo('contact', { title: t('contact-title'), description: t('contact-subtitle') });
</script>

<template>
  <PagesContactMeForm />
</template>
