<script setup lang="ts">
const route = useRoute();

const navLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Skills", to: "/skills" },
  { name: "Qualifications", to: "/qualifications" },
  { name: "Work Experience", to: "/work-experience" },
  { name: "Languages", to: "/languages" },
  { name: "Portfolio", to: "/portfolio" },
  { name: "Contact", to: "/contact-me" },
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
