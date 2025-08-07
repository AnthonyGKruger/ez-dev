<script setup lang="ts">
interface INavLinkProps {
  to: string;
  name: string;
  currentPath: string;
}
defineProps<INavLinkProps>();

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
</script>

<template>
  <span
    ref="element"
    class="w-full cursor-pointer capitalize transition-all duration-300 text-center truncate py-4 px-4 text-sm 2xl:text-xl font-base dark:text-white text-alternative-blue hover:text-light-gold dark:hover:text-black hover:border-light-gold hover:bg-primary-blue dark:hover:bg-light-gold bg-white dark:bg-neutral-950 border-y border-primary-gold"
    :class="{
      'underline decoration-solid underline-offset-8 decoration-light-gold':
        currentPath === to,
      'hidden lg:block': [
        'Skills',
        'Qualifications',
        'Languages',
        'Portfolio',
      ].some((link: string) => name === link),
    }"
    ><NuxtLink :to="to">{{ name }}</NuxtLink>
  </span>
</template>
