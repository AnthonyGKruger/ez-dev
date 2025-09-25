<script setup lang="ts">
interface IFeatureToggleProps {
  name: string;
  checkedValue: boolean;
  id: string;
  bottom: string;
  right: string;
  type: "theme" | "language";
}
defineProps<IFeatureToggleProps>();
const { getLang } = useTranslate();
const emits = defineEmits(["toggle"]);
const themeAfterContentClasses = computed(
  () => "dark:after:content-['🌙'] after:content-['☀️']",
);
const languageAfterContentClasses = computed(() =>
  getLang() === "en" ? "after:!content-['🏴󠁧󠁢󠁥󠁮󠁧󠁿']" : 'after:!content-["🇿🇦"]',
);
const consent = useCookie("consent", {
  default: () => false,
  watch: true,
});
</script>
<template>
  <article
    class="bg-white rounded-full w-max mr-4 fixed z-40"
    :class="{ hidden: !consent }"
    :style="{
      bottom: bottom,
      right: right,
    }"
  >
    <div class="relative flex flex-wrap items-center">
      <label :for="name"></label>
      <input
        :id="name"
        :name="name"
        :checked="checkedValue"
        @change="() => {}"
        @click="emits('toggle')"
        class=""
        :class="[
          `peer relative h-10 w-20 cursor-pointer appearance-none rounded-full
         ring-2 ring-inset ring-light-gold transition-all duration-300 dark:bg-black bg-primary-blue
         after:flex after:justify-center after:items-center after:text-2xl after:absolute
         after:top-0 after:left-0 after:h-10 after:w-10 after:rounded-full dark:after:bg-black after:bg-primary-blue
         after:ring-2 after:ring-inset after:ring-light-gold after:transition-all
         checked:bg-primary-blue checked:ring-alternative-blue checked:after:left-10
         dark:checked:bg-black dark:checked:ring-alternative-gold
         checked:after:bg-light-blue checked:after:ring-alternative-blue
         dark:checked:after:bg-light-gold dark:checked:after:ring-alternative-gold
         hover:ring-primary-blue after:hover:ring-alternative-blue
         dark:hover:ring-primary-gold dark:after:hover:ring-primary-gold
         checked:hover:bg-primary-blue checked:hover:ring-primary-blue
         dark:checked:hover:bg-black dark:checked:hover:ring-primary-gold
         checked:after:hover:ring-alternative-blue disabled:cursor-not-allowed
         dark:checked:after:hover:ring-alternative-gold`,
          {
            [themeAfterContentClasses]: type === 'theme',
            [languageAfterContentClasses]: type === 'language',
          },
        ]"
        type="checkbox"
        value=""
      />
    </div>
  </article>
</template>
