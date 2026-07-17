<script setup lang="ts">
import { primaryButtonPassthrough } from "~/src/passthroughs/button.passthrough";
import Button from "~/src/volt/Button.vue";

const consent = useCookie("consent", {
  default: () => false,
  watch: true,
});

const { trackCookieAction } = useGtm();
const { t } = useTranslate();

const acceptCookie = () => {
  consent.value = true;
  trackCookieAction("accept");
};
</script>

<template>
  <article
    v-if="!consent"
    role="dialog"
    aria-label="Cookie notice"
    class="fixed bottom-4 right-4 left-4 md:left-auto md:max-w-[420px] z-40 rounded-[18px] border border-primary-gold/35 bg-surface-bg/95 shadow-2xl overflow-hidden"
    style="backdrop-filter: blur(12px)"
  >
    <div class="flex items-center gap-2 px-5 pt-3 pb-2">
      <LottiePlayer height="3.5rem" width="3.5rem" src="lotties/Cookies.json" />
      <p class="mono text-sm font-bold tracking-[.08em] text-light-gold">
        {{ t("cookie-title") }}
      </p>
    </div>

    <div class="px-5 pb-5 pt-3 border-t border-primary-gold/25">
      <p class="text-sm leading-relaxed text-[oklch(78%_0.02_250)]">
        {{ t("cookie-text-1") }}
        <NuxtLink
          class="text-light-gold underline duration-300 hover:text-primary-gold"
          to="/privacy-policy"
        >
          {{ t("cookie-privacy-policy") }}
        </NuxtLink>
      </p>
      <div class="pt-4">
        <Button
          :pt:root:class="`${primaryButtonPassthrough} w-full md:w-fit`"
          :label="t('cookie-accept')"
          @click="acceptCookie"
        />
      </div>
    </div>
  </article>
</template>
