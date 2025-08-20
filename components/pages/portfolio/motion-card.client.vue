<script setup lang="ts">
import { motion } from "motion-v";
import type { IPortfolioItem } from "~/types/portfolio";
const { t } = useTranslate();
defineProps<{ portfolioItem: IPortfolioItem }>();
const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.4,
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
    class="col-span-4 md:col-span-2 lg:col-span-6 xl:col-span-4 self-center h-full w-full overflow-hidden text-center bg-white dark:bg-neutral-900 rounded-lg hover:rounded-3xl hover:text-secondary-gold shadow-lg dark:shadow hover:shadow-dark dark:hover:shadow-lg shadow-alternative-blue hover:shadow-secondary-gold dark:hover:shadow-secondary-gold border border-primary-gold duration-500"
  >
    <div
      class="h-full pb-3 pt-5 px-5 overflow-hidden text-center bg-white dark:bg-neutral-900 rounded-lg hover:rounded-3xl dark:text-white text-neutral-950 hover:text-secondary-gold dark:hover:text-light-gold shadow-lg dark:shadow hover:shadow dark:hover:shadow-lg shadow-alternative-blue hover:shadow-secondary-gold dark:hover:shadow-secondary-gold border border-primary-gold duration-1000 flex flex-col justify-center"
    >
      <div class="flex justify-center items-center h-full">
        <div class="relative w-full h-40 md:h-40">
          <div class="absolute inset-0">
            <NuxtImg
              :src="portfolioItem.image"
              :alt="portfolioItem.title"
              class="object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
      <dl class="mt-5 text-sm leading-normal">
        <dt class="sr-only">Description</dt>
        <dd class="text-gray 2xl:text-xl text-left">
          {{ t(portfolioItem.description) }}
        </dd>
      </dl>
      <div class="pt-9 flex items-center justify-center gap-2">
        <button
          class="w-full hover:scale-105 mx-auto text-center border-2 border-alternative-gold dark:border-light-gold hover:border-primary-blue dark:hover:border-light-gold rounded-xl px-3 py-2 pointer bg-primary-blue dark:bg-transparent dark:hover:bg-light-gold hover:bg-white text-[#f1d6b0] dark:text-white dark:hover:text-black hover:text-primary-blue duration-500"
        >
          <NuxtLink
            :to="portfolioItem.link"
            class="font-base text-base tracking-wide items-center justify-center flex"
            target="_blank"
          >
            <Icon
              name="mdi:monitor-dashboard"
              class="inline self-center mr-2 w-4"
            />
            <span class="inline">{{ t('portfolio-view') }}</span>
          </NuxtLink>
        </button>

        <button
          v-if="portfolioItem.referralLetter"
          class="w-full hover:scale-105 mx-auto text-center border-2 border-alternative-gold dark:border-light-gold hover:border-primary-blue dark:hover:border-light-gold rounded-xl px-3 py-2 pointer bg-primary-blue dark:bg-transparent dark:hover:bg-light-gold hover:bg-white text-[#f1d6b0] dark:text-white dark:hover:text-black hover:text-primary-blue duration-500"
        >
          <NuxtLink
            :to="portfolioItem.referralLetter"
            class="font-base text-base tracking-wide items-center justify-center flex"
            target="_blank"
          >
            <Icon
              name="mdi:email-newsletter"
              class="inline self-center mr-2 font-bold w-4"
            />
            <span class="inline">{{ t('portfolio-referral-letter') }}</span>
          </NuxtLink>
        </button>

        <button
          v-if="portfolioItem.sourceCode"
          class="w-full hover:scale-105 mx-auto text-center border-2 border-alternative-gold dark:border-light-gold hover:border-primary-blue dark:hover:border-light-gold rounded-xl px-3 py-2 pointer bg-primary-blue dark:bg-transparent dark:hover:bg-light-gold hover:bg-white text-[#f1d6b0] dark:text-white dark:hover:text-black hover:text-primary-blue duration-500"
        >
          <NuxtLink
            :to="portfolioItem.sourceCode"
            class="font-base text-base tracking-wide items-center justify-center flex"
            target="_blank"
          >
            <Icon name="mdi:code-tags" class="inline self-center mr-2 w-4" />
            <span class="inline">{{ t('portfolio-code') }}</span>
          </NuxtLink>
        </button>
      </div>
    </div>
  </motion.div>
</template>
