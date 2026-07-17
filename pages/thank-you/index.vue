<script setup lang="ts">
const { setSeo } = useSeo();
const { t } = useTranslate();

setSeo("thank-you", {
  title: t("thank-you-title"),
  description: t("thank-you-description"),
});

// Post-submit page (redirects without the session flag) — keep it out of
// search results.
useSeoMeta({ robots: "noindex, nofollow" });

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
