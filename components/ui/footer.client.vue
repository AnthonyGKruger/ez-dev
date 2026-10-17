<script setup lang="ts">
const { t } = useTranslate();
const site = useContent("site");
const nav = computed(() => site.value.nav);
const footer = computed(() => site.value.footer);

const year = ref(2026);
onMounted(() => (year.value = new Date().getFullYear()));

const siteLinks = computed(() => [
  { label: nav.value.work, to: "/portfolio" },
  { label: nav.value.services, to: "/#services" },
  { label: nav.value.about, to: "/about" },
  { label: t("nav-skills"), to: "/skills" },
  { label: t("nav-experience"), to: "/work-experience" },
  { label: t("nav-qualifications"), to: "/qualifications" },
]);

const products = [
  { label: "Votera", href: "https://votera.co.za" },
  { label: "Chilli Collective", href: "https://chilli-collective.com" },
];

// 44px tap height on touch layouts, compact 32px rows on desktop.
const linkClass =
  "flex min-h-11 items-center text-[15px] transition-colors hover:text-[#f4f7fa] min-[900px]:block min-[900px]:min-h-0 min-[900px]:leading-8";
const headingClass = "eyebrow mb-3";
</script>

<template>
  <footer class="border-t border-primary-gold/15">
    <div class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(44px,4.4vw,64px)] pb-20">
      <div class="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-10">
        <!-- Brand -->
        <div class="col-span-2 sm:col-span-3 lg:col-span-1">
          <NuxtLink to="/" class="inline-flex min-h-11 items-center gap-2.5" aria-label="EZdev Solutions, home">
            <img src="/media/logos/code.svg" alt="" class="h-5 w-auto">
            <span class="mono text-sm font-bold tracking-[.14em] text-[#eef2f6]">EZ&bull;DEV</span>
          </NuxtLink>
          <p class="mt-3 max-w-[340px] text-[15px] leading-relaxed">{{ footer.blurb }}</p>
        </div>

        <!-- Site -->
        <nav :aria-label="footer.siteHeading">
          <h2 :class="headingClass">{{ footer.siteHeading }}</h2>
          <ul>
            <li v-for="l in siteLinks" :key="l.to">
              <NuxtLink :to="l.to" :class="linkClass">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Our products -->
        <div>
          <h2 :class="headingClass">{{ footer.productsHeading }}</h2>
          <ul>
            <li v-for="p in products" :key="p.href">
              <a :href="p.href" target="_blank" rel="noopener" :class="linkClass">{{ p.label }}</a>
            </li>
          </ul>
          <p class="mono mt-2 text-[10px] tracking-[0.12em] uppercase">{{ footer.productsNote }}</p>
        </div>

        <!-- Contact -->
        <div class="col-span-2 sm:col-span-1">
          <h2 :class="headingClass">{{ footer.contactHeading }}</h2>
          <ul>
            <li>
              <a href="mailto:anthony@ezdev.solutions" :class="linkClass">anthony@ezdev.solutions</a>
            </li>
            <li>
              <NuxtLink to="/contact-me" :class="linkClass">{{ footer.contactForm }}</NuxtLink>
            </li>
            <li class="flex min-h-11 items-center text-[15px] min-[900px]:block min-[900px]:min-h-0 min-[900px]:leading-8">
              {{ footer.location }}
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-primary-gold/10 pt-5 text-[13px]"
      >
        <p>{{ footer.copyright.replace("{year}", String(year)) }}</p>
        <NuxtLink to="/privacy-policy" class="inline-flex min-h-11 items-center hover:text-[#f4f7fa]">
          {{ footer.privacy }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
