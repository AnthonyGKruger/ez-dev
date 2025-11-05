<script setup lang="ts">
import { primaryButtonPassthrough } from "~/src/passthroughs/button.passthrough";
const route = useRoute();
const { t } = useTranslate();
const isOpen = ref(false);

const navItems = [
  { name: "nav-about", to: "/about" },
  { name: "nav-skills", to: "/skills" },
  { name: "nav-qualifications", to: "/qualifications" },
  { name: "nav-work-experience", to: "/work-experience" },
  { name: "nav-languages", to: "/languages" },
  { name: "nav-portfolio", to: "/portfolio" },
  { name: "side-projects-title", to: "/side-projects" },
];

const inlineNavItems = [
  { name: "nav-about", to: "/about" },
  { name: "nav-qualifications", to: "/qualifications" },
  { name: "nav-work-experience", to: "/work-experience" },
  { name: "nav-portfolio", to: "/portfolio" },
  { name: "side-projects-title", to: "/side-projects" },
];

const isActive = (to: string) => route.path === to;
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full border-b shadow-lg border-slate-200 bg-white/90 shadow-slate-700/5 after:absolute after:top-full after:left-0 after:z-10 after:block after:h-px after:w-full after:bg-slate-200 md:border-slate-200 md:backdrop-blur-sm md:after:hidden dark:bg-neutral-950 dark:border-neutral-800"
  >
    <div
      class="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]"
    >
      <nav
        aria-label="main navigation"
        class="flex h-[3.5rem] items-center justify-between gap-2 lg:gap-4 font-medium text-slate-700 dark:text-neutral-200"
        role="navigation"
      >
        <UiHeaderFooterLogo
          class="flex-shrink-0 mr-2"
          :class="{
            invisible: route.path === '/',
          }"
          class-over-ride="h-10 md:h-12 2xl:h-16 w-auto"
        />
        <span class="sr-only">Home</span>

        <ul
          role="menubar"
          aria-label="Select page"
          class="fixed inset-0 left-0 top-0 ml-auto h-screen w-screen justify-center overflow-hidden overflow-y-auto overscroll-contain bg-white/90 dark:bg-neutral-900/95 px-8 pb-12 pt-28 font-medium transition-[opacity,visibility] duration-300"
          :class="[
            isOpen ? 'visible opacity-100 z-40' : 'invisible opacity-0 z-[-1]',
          ]"
        >
          <li
            v-for="item in navItems"
            :key="item.to"
            role="none"
            class="flex items-stretch"
          >
            <NuxtLink
              role="menuitem"
              aria-haspopup="false"
              class="flex items-center gap-2 py-4 transition-colors duration-300 hover:text-primary-gold focus:outline-none focus-visible:outline-none lg:px-8"
              :class="{
                'text-primary-gold border-b border-primary-gold': isActive(
                  item.to,
                ),
              }"
              :to="item.to"
              @click="isOpen = false"
            >
              <span class="capitalize truncate">{{ t(item.name) }}</span>
            </NuxtLink>
          </li>
        </ul>

        <div class="flex items-center gap-3 px-0">
          <ul
            role="menubar"
            aria-label="Inline navigation"
            class="hidden lg:flex lg:items-stretch lg:h-full lg:w-auto lg:gap-0"
          >
            <li
              v-for="item in inlineNavItems"
              :key="item.to + '-inline-right'"
              role="none"
              class="flex items-stretch"
            >
              <NuxtLink
                role="menuitem"
                aria-haspopup="false"
                class="flex items-center gap-2 py-4 px-4 transition-colors duration-300 hover:text-primary-gold focus:outline-none focus-visible:outline-none"
                :class="{
                  'text-primary-gold': isActive(item.to),
                }"
                :to="item.to"
              >
                <span class="capitalize truncate">{{ t(item.name) }}</span>
              </NuxtLink>
            </li>
          </ul>

          <NuxtLink
            to="/contact-me"
            class="inline-flex items-center"
            :class="primaryButtonPassthrough"
          >
            <span>{{ t("nav-contact") }}</span>
          </NuxtLink>

          <button
            class="relative block w-10 h-10 z-50 outline-none"
            :aria-expanded="isOpen ? 'true' : 'false'"
            aria-label="Toggle navigation"
            @click="isOpen = !isOpen"
          >
            <div
              class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            >
              <span
                aria-hidden="true"
                class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 dark:bg-neutral-100 transition-all duration-300"
                :class="{ 'rotate-45 translate-y-0 !w-6': isOpen }"
              ></span>
              <span
                aria-hidden="true"
                class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 dark:bg-neutral-100 transition duration-300"
                :class="{ 'opacity-0': isOpen }"
              ></span>
              <span
                aria-hidden="true"
                class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 dark:bg-neutral-100 transition-all duration-300"
                :class="{ '-rotate-45 translate-y-[0.5rem] w-6': isOpen }"
              ></span>
            </div>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
