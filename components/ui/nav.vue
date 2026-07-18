<script setup lang="ts">
const route = useRoute();
const { t } = useTranslate();
const isOpen = ref(false);

const navItems = computed(() => [
  { label: t("nav-about"), to: "/about" },
  { label: t("nav-work"), to: "/portfolio" },
  { label: t("nav-skills"), to: "/skills" },
  { label: t("nav-experience"), to: "/work-experience" },
  { label: t("nav-qualifications"), to: "/qualifications" },
  { label: t("nav-languages"), to: "/languages" },
]);

const isActive = (to: string) => {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
};
</script>

<template>
  <!-- Top status bar -->
  <div
    class="mono flex items-center justify-between gap-4 px-4 sm:px-7 py-2 text-[10px] sm:text-xs tracking-[.06em] text-light-gold bg-surface-bg border-b border-primary-gold/25"
  >
    <span class="inline-flex items-center gap-2 whitespace-nowrap">
      <span
        class="w-2 h-2 shrink-0 rounded-full bg-primary-gold"
        style="box-shadow: 0 0 0 3px oklch(62.28% 0.083 75.89 / .25)"
      ></span>
      {{ t("nav-available") }}
    </span>
    <span class="text-[oklch(70%_0.02_250)] whitespace-nowrap">{{
      t("nav-location")
    }}</span>
  </div>

  <!-- Main nav -->
  <header
    class="sticky top-0 z-50 w-full border-b border-primary-gold/20"
    style="background: oklch(19% 0.03 253 / .82); backdrop-filter: blur(10px)"
  >
    <div class="mx-auto max-w-[1240px] px-7">
      <nav
        class="flex h-16 items-center justify-between gap-4"
        role="navigation"
        aria-label="main navigation"
      >
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5" @click="isOpen = false">
          <img src="/media/logos/code.svg" alt="EZdev" class="h-[22px] w-auto" />
          <span class="mono text-sm font-bold tracking-[.14em] text-[#eef2f6]"
            >EZ&bull;DEV</span
          >
        </NuxtLink>

        <!-- Desktop nav links + CTA -->
        <div class="flex items-center gap-1">
          <ul
            class="mono hidden lg:flex items-center gap-0.5 text-[13px] tracking-[.04em] list-none m-0 p-0"
          >
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="block px-[13px] py-2 transition-colors duration-[.25s]"
                :class="
                  isActive(item.to)
                    ? 'text-light-gold border-b-2 border-primary-gold pb-1.5'
                    : 'text-[oklch(78%_0.02_250)] hover:text-light-gold'
                "
                @click="isOpen = false"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>

          <!-- CTA -->
          <NuxtLink
            to="/contact-me"
            class="mono inline-flex items-center gap-2 ml-2 px-3 sm:px-[18px] py-[9px] rounded-lg text-[13px] font-bold tracking-[.04em] whitespace-nowrap bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold"
          >
            {{ t("nav-start-project") }} &rarr;
          </NuxtLink>

          <!-- Hamburger -->
          <button
            class="relative block w-10 h-10 lg:hidden outline-none"
            :aria-expanded="isOpen ? 'true' : 'false'"
            aria-label="Toggle navigation"
            @click="isOpen = !isOpen"
          >
            <div
              class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <span
                aria-hidden="true"
                class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-[#eef2f6] transition-all duration-300"
                :class="{
                  'rotate-45 translate-y-0 -translate-x-0.5 !w-6': isOpen,
                }"
              ></span>
              <span
                aria-hidden="true"
                class="absolute block h-0.5 w-6 transform rounded-full bg-[#eef2f6] transition duration-300"
                :class="{ 'opacity-0': isOpen }"
              ></span>
              <span
                aria-hidden="true"
                class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-[#eef2f6] transition-all duration-300"
                :class="{ '-rotate-45 w-6': isOpen }"
              ></span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  </header>

  <!-- Mobile menu -->
  <div
    class="fixed inset-0 z-40 lg:hidden transition-opacity duration-300"
    :class="isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    style="background: oklch(19% 0.03 253 / .97); backdrop-filter: blur(16px)"
  >
    <nav
      class="flex flex-col items-center justify-center h-full gap-4"
      role="navigation"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to + '-mobile'"
        :to="item.to"
        class="mono text-xl tracking-[.06em] py-3 px-6 transition-colors duration-300"
        :class="
          isActive(item.to)
            ? 'text-light-gold'
            : 'text-[oklch(78%_0.02_250)] hover:text-light-gold'
        "
        @click="isOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      <NuxtLink
        to="/contact-me"
        class="mono mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold tracking-[.04em] bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold"
        @click="isOpen = false"
      >
        {{ t("nav-start-project") }} &rarr;
      </NuxtLink>
    </nav>
  </div>
</template>
