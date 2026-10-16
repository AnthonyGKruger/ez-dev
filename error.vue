<script setup lang="ts">
const { t } = useTranslate();
const { setSeo } = useSeo();
const error = useError();

// Only a real 404 gets the "page not found" copy; anything else (e.g. a
// render error) shows the generic message so it isn't mistaken for a
// missing page.
const isNotFound = computed(() => error.value?.statusCode === 404);
const titleKey = computed(() => (isNotFound.value ? "error-404-title" : "error-title"));
const subtitleKey = computed(() => (isNotFound.value ? "error-404-subtitle" : "error-subtitle"));

setSeo("error-404", {
  title: t(titleKey.value),
  description: t(subtitleKey.value),
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
              :src="isNotFound ? '/lotties/404.json' : '/lotties/500.json'"
              :loop="true"
              :autoplay="true"
              :style="{
                width: '300px',
                height: '300px',
                margin: '0 auto',
              }"
            />
            <p class="text-center text-2xl px-5 text-[#eef2f6] mt-6">
              {{ t(titleKey) }}
            </p>
            <p class="text-center italic font-thin mt-5 px-5 text-[oklch(78%_0.02_250)]">
              {{ t(subtitleKey) }}
            </p>

            <div v-if="error" class="mt-4 text-center">
              <p class="text-sm text-[oklch(65%_0.02_250)]">
                Error {{ error.statusCode }}: {{ error.statusMessage }}
              </p>
            </div>

            <div class="flex gap-4 mt-6">
              <UiButton @click="handleGoHome">{{ t("go-home") }}</UiButton>
            </div>
          </div>
        </div>
      </section>
    </main>
    <UiFooter />
  </div>
</template>
