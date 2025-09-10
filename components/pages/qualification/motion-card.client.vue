<script setup lang="ts">
import { motion } from "motion-v";
import type { IQualification } from "~/types/qualification";
defineProps<{ qualification: IQualification }>();
const { t } = useTranslate();
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
      <Icon name="mdi:map-marker-star" class="text-red-500" /><span
        class="text-xl"
        >{{ qualification.institution }}</span
      >
    </div>
    <div class="border-b border-t border-primary-gold">
      <div class="w-full p-1.5 flex justify-start items-center gap-2">
        <Icon name="mdi:certificate" class="text-light-gold" /><span>{{
          qualification.qualification
        }}</span>
      </div>
      <div class="w-full p-1.5 flex justify-start items-center gap-2">
        <Icon name="mdi:calendar-month" class="text-indigo-600" /><span>{{
          qualification.dateFrom
        }}</span
        ><Icon name="mdi:calendar-month" class="text-indigo-600" /><span>{{
          qualification.dateTo
        }}</span>
      </div>
      <div class="w-full p-1.5 flex justify-start items-center gap-2">
        <NuxtLink
          v-if="!!qualification.link"
          :to="qualification.link"
          target="_blank"
        >
          <div
            class="flex gap-2 items-center cursor-pointer md:text-md px-3 py-2 rounded-xl border-2 border-primary-gold dark:border-light-gold hover:border-primary-blue dark:hover:border-primary-gold bg-primary-blue dark:bg-transparent hover:bg-white dark:hover:bg-light-gold dark:text-white dark:hover:text-black text-light-gold hover:text-primary-blue duration-500"
          >
            <Icon
              name="mdi:file-certificate"
              class="stroke-primary-gold text-transparent w-6 h-6"
            />
            <span>{{ t("view-certificate") }}</span>
          </div>
        </NuxtLink>
        <div
          v-if="!!qualification.comments.length"
          v-for="comment in qualification.comments"
          class="flex gap-2 items-center md:text-md px-3 py-2 rounded-xl border-2 border-primary-gold dark:border-light-gold bg-primary-blue dark:bg-transparent dark:text-white text-light-gold duration-500"
        >
          <Icon
            name="mdi:medal"
            class="stroke-primary-gold text-transparent w-6 h-6"
          />
          <span class="ml-3 inline">{{ t(comment) }}</span>
        </div>
      </div>
    </div>
  </motion.div>
</template>
