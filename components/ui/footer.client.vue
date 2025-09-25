<script setup lang="ts">
const date = ref<Date>();
const { t } = useTranslate();
const footerNavs = [
  {
    to: "/",
    name: "nav-about",
  },
  {
    to: "/portfolio",
    name: "nav-portfolio",
  },
  {
    to: "/contact-me",
    name: "nav-contact",
  },
  {
    to: "/privacy-policy",
    name: "nav-privacy",
  },
  {
    to: "https://github.com/AnthonyGKruger",
    name: "skill-icons:github-dark",
    isIcon: true,
    isExternal: true,
  },
  {
    to: "https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/",
    name: "skill-icons:linkedin",
    isIcon: true,
    isExternal: true,
  },
];

onMounted(() => (date.value = new Date()));

const dateComputed = computed(() => date.value?.getFullYear() || 2025);
</script>

<template>
  <footer
    class="mx-auto border-t border-primary-gold bg-white dark:bg-neutral-950 dark:text-white"
  >
    <UxCompanies />
    <div
      class="flex dark:bg-neutral-950 items-center justify-center w-full pt-4"
    >
      <UiHeaderFooterLogo />
    </div>
    <div class="mx-auto">
      <UxSocialLinks :links="footerNavs" />
      <div
        class="mt-10 py-5 border-t border-primary-gold text-center bg-alternative-blue dark:bg-transparent text-white cursor-auto"
      >
        <p>
          © {{ dateComputed + " " }}
          <NuxtLink
            to="/"
            class="hover:text-light-gold dark:hover:text-primary-gold duration-500"
          >
            EZdev Solutions (PTY) LTD.
          </NuxtLink>
          {{ t("footer-all-rights-reserved") }}
        </p>
      </div>
    </div>
  </footer>
</template>
