<script setup lang="ts">
const route = useRoute();
const { scrollY } = useScroll();
const logo = ref<HTMLElement>();
const navLinks = [
  { name: "nav-home", to: "/" },
  { name: "nav-about", to: "/about" },
  { name: "nav-skills", to: "/skills" },
  { name: "nav-qualifications", to: "/qualifications" },
  { name: "nav-work-experience", to: "/work-experience" },
  { name: "nav-languages", to: "/languages" },
  { name: "nav-portfolio", to: "/portfolio" },
  { name: "nav-contact", to: "/contact-me" },
];

const toggleLogo = () => {
  if (!logo.value) return;
  if (scrollY.current >= 80) {
    logo.value.classList.add("hidden");
  } else {
    logo.value.classList.remove("hidden");
  }
};

onMounted(() =>
  useEventListener(window, "scroll", () => nextTick(() => toggleLogo())),
);
</script>

<template>
  <header class="fixed top-0 left-0 z-50 w-full">
    <div
      ref="logo"
      v-if="route.path !== '/'"
      class="flex dark:bg-neutral-950 items-center justify-center w-full"
    >
      <UiHeaderFooterLogo />
    </div>
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
