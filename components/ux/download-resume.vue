<script setup lang="ts">
import Button from "~/src/volt/Button.vue";
const { t } = useTranslate();
</script>

<template>
  <h2 class="text-lg">
    {{ t('download-resume-heading') }}
  </h2>
  <a href="/media/resume/Anthony_Gordon_Kruger.pdf" download>
    <Button> {{ t('download-resume-button') }} </Button>
  </a>
</template>
