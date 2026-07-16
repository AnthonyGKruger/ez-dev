<script setup lang="ts">
const date = ref<Date>();
const { t } = useTranslate();

onMounted(() => (date.value = new Date()));

const dateComputed = computed(() => date.value?.getFullYear() || 2025);
</script>

<template>
  <footer class="border-t border-primary-gold/25 bg-surface-bg/50">
    <div
      class="max-w-[1240px] mx-auto px-7 pt-[52px] pb-7 flex items-start justify-between gap-8 flex-wrap"
    >
      <!-- Logo + tagline -->
      <div>
        <div class="flex items-center gap-2.5">
          <img
            src="/media/logos/code.svg"
            alt="EZdev"
            class="h-5 w-auto"
            style="filter: invert(84%) sepia(24%) saturate(500%) hue-rotate(2deg) brightness(96%)"
          />
          <span class="mono text-sm font-bold tracking-[.14em] text-[#eef2f6]"
            >EZ&bull;DEV</span
          >
        </div>
        <p class="text-sm text-[oklch(70%_0.02_250)] mt-3.5 max-w-[24em]">
          {{ t("footer-tagline") }}
        </p>
      </div>

      <!-- Link columns -->
      <div class="mono flex gap-14 text-[13px]">
        <!-- SITE -->
        <div class="flex flex-col gap-3">
          <span
            class="text-[11px] tracking-[.12em] text-primary-gold"
          >{{ t("footer-site") }}</span>
          <NuxtLink
            to="/portfolio"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >{{ t("nav-portfolio") }}</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >{{ t("nav-about") }}</NuxtLink
          >
          <NuxtLink
            to="/contact-me"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >{{ t("nav-contact") }}</NuxtLink
          >
          <NuxtLink
            to="/privacy-policy"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >{{ t("nav-privacy") }}</NuxtLink
          >
        </div>

        <!-- ELSEWHERE -->
        <div class="flex flex-col gap-3">
          <span
            class="text-[11px] tracking-[.12em] text-primary-gold"
          >{{ t("footer-elsewhere") }}</span>
          <a
            href="https://github.com/AnthonyGKruger"
            target="_blank"
            rel="noreferrer noopener"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >GitHub &nearr;</a
          >
          <a
            href="https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/"
            target="_blank"
            rel="noreferrer noopener"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >LinkedIn &nearr;</a
          >
          <a
            href="mailto:anthony@ezdev.solutions"
            class="text-[oklch(78%_0.02_250)] hover:text-light-gold transition-colors duration-300"
            >Email &nearr;</a
          >
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div
      class="mono border-t border-primary-gold/20 py-[18px] px-7 text-center text-xs tracking-[.04em] text-[oklch(65%_0.02_250)]"
    >
      &copy; {{ dateComputed }} EZdev Solutions (PTY) LTD.
      {{ t("footer-all-rights-reserved") }}
    </div>
  </footer>
</template>
