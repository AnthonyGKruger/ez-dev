<script setup lang="ts">
const { getLang } = useTranslate();
</script>

<template>
  <PagesContactMeForm :key="getLang()" />
</template>
