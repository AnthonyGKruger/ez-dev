<script setup lang="ts">
import { motion } from "motion-v";
const props = defineProps<{ scaleFactor: number }>();
const motionDiv = ref<HTMLElement>();
const state = ref<boolean>(false);
const variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: props.scaleFactor * Math.random() * 0.5,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.9,
    },
    transform: state.value ? "rotateY(180deg)" : "rotateY(0deg)",
  },
};

watch(state, () => {
  state.value
    ? motionDiv.value?.classList.add("rotate-y-180")
    : motionDiv.value?.classList.remove("rotate-y-180");
  if (state.value)
    setTimeout(() => {
      state.value = !state.value;
    }, 10000);
});
</script>

<template>
  <motion.div
    initial="hidden"
    whileInView="visible"
    :variants="variants"
    class="group aspect-square transform perspective-1000 h-36 w-36 overflow-hidden text-center bg-white dark:bg-neutral-900 rounded-lg hover:rounded-3xl hover:text-secondary-gold shadow-lg dark:shadow hover:shadow-dark dark:hover:shadow-lg shadow-alternative-blue hover:shadow-secondary-gold dark:hover:shadow-secondary-gold border border-primary-gold duration-500"
  >
    <div
      ref="motionDiv"
      @click="state = !state"
      class="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180"
    >
      <div
        class="absolute backface-hidden w-full h-full flex flex-col items-center justify-center gap-2 text-neutral-950 dark:text-white"
      >
        <slot name="icon" />
        <slot name="title" />
      </div>
      <div
        class="absolute w-full h-full backface-hidden bg-secondary-gold text-white rounded-lg p-4 flex items-center justify-center rotate-y-180"
      >
        <slot name="description" />
      </div>
    </div>
  </motion.div>
</template>
<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
