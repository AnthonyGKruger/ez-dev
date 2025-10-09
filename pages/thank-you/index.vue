<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();

setSeo("thank-you", {
  title: t("thank-you-title"),
  description: t("thank-you-description"),
});

onMounted(() => {
  try {
    const key = "ezdev-contact-sent";
    const flag = sessionStorage.getItem(key);
    if (!flag) {
      navigateTo("/");
      return;
    }
    sessionStorage.removeItem(key);
  } catch (_) {
    navigateTo("/");
  }
});
</script>

<template>
  <PagesThankYouContent />
</template>
