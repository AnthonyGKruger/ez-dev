<script setup lang="ts">
import { motion } from "motion-v";

const cardVariants = {
  offscreen: {
    x: -4000, // Move the card offscreen initially
  },
  onscreen: {
    x: 0, // Move the card onscreen with animation
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 1.5,
    },
  },
};
</script>

<template>
  <motion.div
    initial="offscreen"
    whileInView="onscreen"
    :viewport="{ once: true, amount: 0.8 }"
  >
    <motion.div :variants="cardVariants">
      <div class="w-full h-full flex py-9 xl:py-9 lg:py-14 px-9 bg-transparent">
        <NuxtImg
          src="/media/AnthonyIllustrated.jpeg"
          alt="Anthony Kruger"
          class="w-96 h-96 rounded-full shadow-lg hover:shadow-xl shadow-primary-gold hover:shadow-light-gold border border-primary-gold hover:border-primary-blue self-center mx-auto transition-all duration-500 hover:relative"
        />
      </div>
    </motion.div>
  </motion.div>
</template>

<style scoped></style>
