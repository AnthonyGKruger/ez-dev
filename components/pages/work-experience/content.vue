<script setup lang="ts">
import { workExperienceItems } from "~/assets/config/data";
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/workExperience.json"
    content="Check Out My Work Experience Below"
    subtitle="Hard Work & Perseverance"
  />
  <div
    class="flex flex-col gap-7 items-center justify-center text-base-priority bg-light-blue dark:bg-transparent py-7"
  >
    <PagesWorkExperienceMotionCard
      v-for="experience in workExperienceItems"
      :key="experience.id"
      :experience="experience"
    />
  </div>
</template>
