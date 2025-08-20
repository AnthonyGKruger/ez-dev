<script setup lang="ts">
const route = useRoute();
const { t } = useTranslate();

const navLinks = [
  { name: t("nav-home"), to: "/" },
  { name: t("nav-about"), to: "/about" },
  { name: t("nav-skills"), to: "/skills" },
  { name: t("nav-qualifications"), to: "/qualifications" },
  { name: t("nav-work-experience"), to: "/work-experience" },
  { name: t("nav-languages"), to: "/languages" },
  { name: t("nav-portfolio"), to: "/portfolio" },
  { name: t("nav-contact"), to: "/contact-me" },
];
</script>

<template>
  <header class="fixed top-0 left-0 z-50 w-full">
    <nav class="flex w-full">
      <UiNavLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :current-path="route.path"
        :name="link.name"
      />
    </nav>
  </header>
</template>

<style scoped></style>
