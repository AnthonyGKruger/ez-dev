<script setup lang="ts">
import { qualifications } from "~/assets/config/data";
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/Education.json"
    content="Have A Look At My Qualifications"
    subtitle="Always Leveling Up"
  />
  <div
    class="flex flex-col gap-7 items-center justify-center text-base-priority bg-light-blue dark:bg-transparent py-7"
  >
    <PagesQualificationMotionCard
      v-for="qualification in qualifications"
      :key="qualification.id"
      :qualification="qualification"
    />
  </div>
</template>
