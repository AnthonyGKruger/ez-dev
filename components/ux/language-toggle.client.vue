<script setup lang="ts">
import type { SupportedLang } from "assets/config/translations";

const { getLang, setLang } = useTranslate();
const { trackFeatureUsage } = useGtm();
const site = useContent("site");

const locales: { code: SupportedLang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "af", label: "AF" },
];

const select = (code: SupportedLang) => {
  if (getLang() === code) return;
  setLang(code);
  trackFeatureUsage("toggle-language", { value: `toggled-to-${getLang()}` });
};
</script>

<template>
  <div
    role="group"
    :aria-label="site.nav.language"
    class="inline-flex overflow-hidden rounded-sm border border-primary-gold/35"
  >
    <button
      v-for="l in locales"
      :key="l.code"
      type="button"
      :aria-pressed="getLang() === l.code"
      class="mono h-11 min-w-11 px-2 text-[11px] font-bold tracking-[0.1em] transition-colors md:h-9 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-light-gold"
      :class="
        getLang() === l.code
          ? 'bg-primary-gold/20 text-[#f4f7fa]'
          : 'bg-transparent text-[oklch(78%_0.02_250)] hover:text-[#f4f7fa]'
      "
      @click="select(l.code)"
    >
      {{ l.label }}
    </button>
  </div>
</template>
