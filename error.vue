<script setup lang="ts">
const { t } = useTranslate();
const { setSeo } = useSeo();
const error = useError();

setSeo("error-404", {
  title: t("error-404-title"),
  description: t("error-404-subtitle"),
});

const handleGoHome = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="min-h-screen bg-body-bg">
    <UiNav />

    <main>
      <section class="py-44">
        <div class="container mx-auto">
          <div class="flex flex-col items-center justify-center">
            <LottiePlayer
              src="/lotties/404.json"
              :loop="true"
              :autoplay="true"
              :style="{
                width: '300px',
                height: '300px',
                margin: '0 auto',
              }"
            />
            <p class="text-center text-2xl px-5 text-[#eef2f6] mt-6">
              {{ t("error-404-title") }}
            </p>
            <p class="text-center italic font-thin mt-5 px-5 text-[oklch(78%_0.02_250)]">
              {{ t("error-404-subtitle") }}
            </p>

            <div v-if="error" class="mt-4 text-center">
              <p class="text-sm text-[oklch(65%_0.02_250)]">
                Error {{ error.statusCode }}: {{ error.statusMessage }}
              </p>
            </div>

            <div class="flex gap-4 mt-6">
              <button
                @click="handleGoHome"
                class="mono inline-flex items-center gap-2 px-[26px] py-3.5 rounded-[9px] text-sm font-bold tracking-[.03em] bg-primary-gold text-body-bg transition-all duration-300 hover:bg-light-gold"
              >
                {{ t("go-home") }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <UiFooter />
  </div>
</template>
