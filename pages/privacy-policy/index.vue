<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();
setSeo("privacy", { title: t("privacy-policy-title") });
</script>

<template>
  <PagesPrivacyPolicyContent />
</template>
