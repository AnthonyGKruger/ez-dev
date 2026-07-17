<script setup lang="ts">
const yScrollPosition = ref<number>(0);
const { trackFeatureUsage } = useGtm();
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  trackFeatureUsage("scroll-to-top", { value: "clicked scroll-to-top" });
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
  <button
    aria-label="Back to top"
    class="rounded-full border mr-4 bottom-32 fixed right-0 z-40 h-10 w-10 text-xl bg-surface-bg border-primary-gold/60 text-light-gold items-center justify-center cursor-pointer hover:border-light-gold hover:bg-primary-gold/10 hover:scale-105 transition-all duration-300"
    :class="showScrollToTop ? 'flex' : 'hidden'"
    @click="scrollToTop"
  >
    <Icon
      name="mdi:menu-up"
      class="text-light-gold animate-bounce duration-500"
    />
  </button>
</template>
