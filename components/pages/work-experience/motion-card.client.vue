<script setup lang="ts">
import { motion } from "motion-v";
import type { IWorkExperience } from "~/types/workExperience";
const { t } = useTranslate();
defineProps<{ experience: IWorkExperience }>();
const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      type: "smooth",
      bounce: 0.8,
    },
  },
};
</script>

<template>
  <motion.div
    ref="motionDiv"
    initial="hidden"
    whileInView="visible"
    :variants="variants"
    class="text-primary-blue dark:text-white bg-white dark:bg-transparent rounded-xl mx-auto border-2 border-primary-blue dark:border-primary-gold md:w-3/4 lg:w-3/5"
  >
    <div class="w-full p-1.5 flex justify-start items-center gap-2">
      <Icon name="mdi:briefcase-variant" class="text-alternative-gold" /><span
        class="text-xl"
        >{{ experience.company }}</span
      >
    </div>
    <div class="border-b border-t border-primary-gold">
      <div class="w-full p-1.5 flex justify-start items-center gap-2">
        <Icon name="mdi:account-circle" class="text-light-gold" /><span>{{
          t(experience.role)
        }}</span>
      </div>
      <div class="w-full p-1.5 flex justify-start items-center gap-2">
        <Icon name="mdi:calendar-month" class="text-indigo-600" /><span>{{
          experience.dateFrom
        }}</span
        ><Icon name="mdi:calendar-month" class="text-indigo-600" /><span>{{
          experience.dateTo
        }}</span>
      </div>
      <div class="w-full p-1.5 flex flex-col justify-start items-center gap-2">
        <p>
          {{ t(experience.summary || "") }}
        </p>
        <div class="flex gap-2 flex-col md:flex-row w-full">
          <div
            v-if="!!experience.comments.length"
            v-for="comment in experience.comments"
            class="w-full flex gap-1 items-center md:text-md px-3 py-2 rounded-xl border-2 border-primary-gold dark:border-light-gold bg-primary-blue dark:bg-transparent dark:text-white text-light-gold duration-500"
            :class="{ 'max-w-[49%]': experience.comments.length > 1 }"
            :title="t(comment)"
          >
            <Icon
              name="mdi:medal"
              class="stroke-primary-gold text-transparent min-w-6 min-h-6"
            />
            <span class="truncate text-ellipsis">{{ t(comment) }}</span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</template>

<style scoped></style>
