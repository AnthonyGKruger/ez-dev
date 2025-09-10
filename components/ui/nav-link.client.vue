<script setup lang="ts">
interface INavLinkProps {
  to: string;
  name: string;
  currentPath: string;
}

const { scrollY } = useScroll();
const props = defineProps<INavLinkProps>();
const { t } = useTranslate();
const element = ref<HTMLElement>();

const updatePadding = () => {
  if (!element.value) return;
  if (scrollY.current > 80) {
    element.value.classList.remove("py-4");
    element.value.classList.add("py-1.5");
  } else {
    element.value.classList.add("py-4");
    element.value.classList.remove("py-1.5");
  }
};

const calculateDisplay = computed(() =>
  ["/skills", "/qualifications", "/languages", "/portfolio"].some(
    (path: string) => props.to === path,
  ),
);
onMounted(() =>
  useEventListener(window, "scroll", () => nextTick(() => updatePadding())),
);
</script>

<template>
  <NuxtLink
    class="w-full cursor-pointer font-base dark:text-white text-alternative-blue hover:text-light-gold dark:hover:text-black hover:border-light-gold hover:bg-primary-blue dark:hover:bg-light-gold bg-white dark:bg-neutral-950 border-y border-primary-gold"
    :class="{
      'underline decoration-solid underline-offset-8 decoration-light-gold':
        currentPath === to,
      'hidden lg:!block': calculateDisplay,
      'hidden sm:block': to === '/work-experience',
    }"
    :to="to"
  >
    <span
      class="text-center truncate text-ellipsis py-4 px-4 capitalize text-sm 2xl:text-xl block transition-all duration-300 w-full"
      ref="element"
      @scroll="console.log(scrollY)"
      >{{ t(name) }}</span
    >
  </NuxtLink>
</template>
