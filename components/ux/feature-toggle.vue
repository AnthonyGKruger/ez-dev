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
    class="rounded-full w-max mr-4 fixed z-40"
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
        :class="[
          `peer relative h-10 w-20 cursor-pointer appearance-none rounded-full
         bg-surface-bg ring-2 ring-inset ring-primary-gold/60 transition-all duration-300
         after:flex after:justify-center after:items-center after:text-2xl after:absolute
         after:top-0 after:left-0 after:h-10 after:w-10 after:rounded-full
         after:bg-body-bg after:ring-2 after:ring-inset after:ring-primary-gold
         after:transition-all checked:after:left-10
         hover:ring-light-gold after:hover:ring-light-gold
         disabled:cursor-not-allowed`,
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
