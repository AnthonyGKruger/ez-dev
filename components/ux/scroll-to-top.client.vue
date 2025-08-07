<script setup lang="ts">
const yScrollPosition = ref<number>(0);

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

const showScrollToTop = computed(() => yScrollPosition.value > 100);

onMounted(() => {
  window.addEventListener(
    "scroll",
    () => (yScrollPosition.value = window?.scrollY),
  );
});

onBeforeUnmount(() => window.removeEventListener("scroll", () => null));
</script>

<template>
  <div
    class="rounded-full border-2 mr-4 bottom-16 fixed right-0 z-40 h-10 w-10 text-xl bg-white dark:bg-black flex items-center justify-center dark:border-light-gold border-alternative-blue dark:hover:bg-light-gold hover:bg-light-blue dark:hover:text-black hover:scale-105 transition-all duration-500"
    :class="{
      block: showScrollToTop,
      hidden: !showScrollToTop,
    }"
    @click="scrollToTop"
  >
    <Icon
      name="mdi:menu-up"
      class="dark:text-white text-alternative-blue hover:text-light-gold dark:hover:text-black hover:scale-105 animate-bounce duration-500"
    />
  </div>
</template>
