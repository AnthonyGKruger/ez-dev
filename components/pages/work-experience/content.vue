<script setup lang="ts">
import { workExperienceItems } from "~/assets/config/data";
const { t } = useTranslate();
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/workExperience.json"
    :content="t('work-heading')"
    :subtitle="t('work-subtitle')"
  />
  <div
    class="flex flex-col gap-7 items-center justify-center text-base-priority bg-light-blue dark:bg-transparent py-7 px-2"
  >
    <PagesWorkExperienceMotionCard
      v-for="(experience, index) in workExperienceItems"
      :key="experience.id"
      :experience="experience"
      :index="index"
    />
  </div>
</template>
