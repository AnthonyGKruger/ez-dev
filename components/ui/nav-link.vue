<script setup lang="ts">
interface INavLinkProps {
  to: string;
  name: string;
  currentPath: string;
}
const props = defineProps<INavLinkProps>();

const element = ref<HTMLElement>();

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      element.value?.classList.remove("py-4");
      element.value?.classList.add("py-1.5");
    } else {
      element.value?.classList.add("py-4");
      element.value?.classList.remove("py-1.5");
    }
  });
});

const calculateDisplay = computed(() =>
  ["/skills", "/qualifications", "/languages", "/portfolio"].some(
    (path: string) => props.to === path,
  ),
);
</script>

<template>
  <NuxtLink
    class="w-full cursor-pointer font-base dark:text-white text-alternative-blue hover:text-light-gold dark:hover:text-black hover:border-light-gold hover:bg-primary-blue dark:hover:bg-light-gold bg-white dark:bg-neutral-950 border-y border-primary-gold"
    :class="{
      'underline decoration-solid underline-offset-8 decoration-light-gold':
        currentPath === to,
      'hidden lg:!block': calculateDisplay,
    }"
    :to="to"
  >
    <span
      class="text-center truncate py-4 px-4 capitalize text-sm 2xl:text-xl block transition-all duration-300"
      ref="element"
      >{{ name }}</span
    >
  </NuxtLink>
</template>
