<script setup lang="ts">
const route = useRoute();
const site = useContent("site");
const nav = computed(() => site.value.nav);
const banner = computed(() => site.value.banner);
const isOpen = ref(false);

const navItems = computed(() => [
  { label: nav.value.work, to: "/portfolio" },
  { label: nav.value.services, to: "/#services" },
  { label: nav.value.about, to: "/#about" },
  { label: nav.value.contact, to: "/contact-me" },
]);

// Only real routes get the active state; hash links point into the home page.
const isActive = (to: string) => !to.includes("#") && route.path.startsWith(to);

// Close the menu on navigation (covers hash links to the current page too).
watch(() => route.fullPath, () => (isOpen.value = false));

// The menu floats over the page: tapping anywhere outside it (or Escape)
// closes it. The toggle button is ignored so it can still close the menu.
const menuPanel = ref<HTMLElement | null>(null);
const menuButton = ref<HTMLElement | null>(null);
onClickOutside(menuPanel, () => (isOpen.value = false), { ignore: [menuButton] });
useEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Escape" && isOpen.value) {
    isOpen.value = false;
    menuButton.value?.focus();
  }
});
</script>

<template>
  <!-- Top status bar -->
  <div class="border-b border-primary-gold/15 bg-surface-bg">
    <p
      class="mono mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 px-[clamp(16px,5vw,24px)] py-2 text-[10px] tracking-[0.14em] text-light-gold uppercase md:h-9 md:py-0 md:text-[11px]"
    >
      <span class="inline-flex items-center gap-2">
        <span aria-hidden="true" class="size-1.5 rounded-full bg-light-gold md:size-[7px]" />
        {{ banner.available }}
      </span>
    </p>
  </div>

  <!-- Main nav -->
  <header
    class="sticky top-0 z-50 w-full border-b border-primary-gold/20"
    style="background: oklch(19% 0.03 253 / 0.82); backdrop-filter: blur(10px)"
  >
    <nav
      class="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 px-[clamp(16px,5vw,24px)] md:h-19"
      aria-label="Main"
    >
      <!-- Logo -->
      <NuxtLink to="/" class="flex min-h-11 flex-none items-center gap-2.5" aria-label="EZdev Solutions, home">
        <img src="/media/logos/code.svg" alt="" class="h-[22px] w-auto">
        <span class="mono text-sm font-bold tracking-[.14em] text-[#eef2f6] max-[359px]:hidden">EZ&bull;DEV</span>
      </NuxtLink>

      <!-- Desktop links (from 900px) -->
      <ul class="hidden items-center gap-1 min-[900px]:flex">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            class="block px-3 py-3 text-[15px] font-medium transition-colors hover:text-[#f4f7fa]"
            :class="isActive(item.to) ? 'text-[#f4f7fa] shadow-[inset_0_-2px_0] shadow-primary-gold' : ''"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="flex items-center gap-2.5 min-[900px]:gap-4">
        <div class="hidden min-[900px]:block">
          <UxLanguageToggle />
        </div>
        <UiButton variant="primary" size="sm" to="/contact-me">{{ nav.cta }}</UiButton>

        <!-- Menu button (below 900px) -->
        <button
          ref="menuButton"
          type="button"
          class="relative size-11 flex-none min-[900px]:hidden"
          :aria-expanded="isOpen ? 'true' : 'false'"
          aria-controls="mobile-menu"
          :aria-label="isOpen ? nav.menuClose : nav.menuOpen"
          @click="isOpen = !isOpen"
        >
          <span class="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <!-- Each state gets its own classes: conflicting utilities on one
                 element (e.g. -translate-y-2 + translate-y-0) don't resolve by
                 class order in Tailwind v4. -->
            <span
              class="absolute block h-0.5 rounded-full bg-[#eef2f6] transition-all duration-300"
              :class="isOpen ? 'w-6 translate-y-0 rotate-45' : 'w-[18px] -translate-y-2'"
            />
            <span
              class="absolute block h-0.5 w-6 rounded-full bg-[#eef2f6] transition duration-300"
              :class="{ 'opacity-0': isOpen }"
            />
            <span
              class="absolute block h-0.5 rounded-full bg-[#eef2f6] transition-all duration-300"
              :class="isOpen ? 'w-6 translate-y-0 -rotate-45' : 'w-3 translate-y-2'"
            />
          </span>
        </button>
      </div>
    </nav>

    <!-- Menu panel (below 900px): floats under the header instead of
         pushing the page down -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-show="isOpen"
        id="mobile-menu"
        ref="menuPanel"
        class="absolute inset-x-0 top-full border-y border-primary-gold/20 bg-body-bg shadow-[0_24px_48px_rgb(0_0_0/0.45)] min-[900px]:hidden"
      >
        <ul class="mx-auto flex max-w-[1240px] flex-col px-[clamp(16px,5vw,24px)] py-3">
          <li v-for="item in navItems" :key="item.to + '-mobile'">
            <NuxtLink
              :to="item.to"
              :aria-current="isActive(item.to) ? 'page' : undefined"
              class="flex min-h-11 items-center text-[17px] font-medium hover:text-[#f4f7fa]"
              :class="isActive(item.to) ? 'text-[#f4f7fa]' : ''"
              @click="isOpen = false"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
          <li class="mt-3 border-t border-primary-gold/15 pt-4">
            <UxLanguageToggle />
          </li>
        </ul>
      </div>
    </Transition>
  </header>

  <!-- Backdrop: dims the page and catches the outside tap so it doesn't
       also hit a link underneath -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-150"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-body-bg/50 min-[900px]:hidden"
      aria-hidden="true"
      @click="isOpen = false"
    />
  </Transition>
</template>
