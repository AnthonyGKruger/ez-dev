<script setup lang="ts">
const { getLang, setLang } = useTranslate();
</script>

<template>
  <UxFeatureToggle
    id="language-toggle"
    name="theme-toggle"
    bottom="70px"
    right="0"
    type="language"
    :checked-value="getLang() === 'af'"
    @toggle="() => (getLang() === 'en' ? setLang('af') : setLang('en'))"
  />
</template>
