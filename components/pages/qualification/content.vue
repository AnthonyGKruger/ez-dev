<script setup lang="ts">
import { qualifications } from "~/assets/config/data";
const { t } = useTranslate();
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/Education.json"
    :content="t('qualifications-heading')"
    :subtitle="t('qualifications-subtitle')"
  />
  <div
    class="flex flex-col gap-7 items-center justify-center text-base-priority bg-light-blue dark:bg-transparent py-7 px-2"
  >
    <PagesQualificationMotionCard
      v-for="(qualification, index) in qualifications"
      :key="qualification.id"
      :qualification="qualification"
      :index="index"
    />
  </div>
</template>
