<script setup lang="ts">
const { getLang, setLang } = useTranslate();
const { trackFeatureUsage } = useGtm();
const handleToggle = () => {
  getLang() === "en" ? setLang("af") : setLang("en");
  trackFeatureUsage("toggle-language", { value: `toggled-to-${getLang()}` });
};
</script>

<template>
  <UxFeatureToggle
    id="language-toggle"
    name="theme-toggle"
    bottom="70px"
    right="0"
    type="language"
    :checked-value="getLang() === 'af'"
    @toggle="handleToggle"
  />
</template>
