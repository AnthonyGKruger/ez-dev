<script setup lang="ts">
import Button from "~/src/volt/Button.vue";

const { t } = useTranslate();
const { setSeo } = useSeo();
const error = useError();

setSeo("error-404", {
  title: t("error-404-title"),
  description: t("error-404-subtitle"),
});

const lottieDimensions = 300;

const handleGoHome = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div class="min-h-screen dark:bg-neutral-950 bg-white">
    <UiNav />

    <main class="dark:bg-neutral-950">
      <section class="py-14">
        <div class="container mx-auto">
          <div class="flex flex-col items-center justify-center">
            <LottiePlayer
              src="/lotties/404.json"
              :loop="true"
              :autoplay="true"
              :style="{
                width: `${lottieDimensions}px`,
                height: `${lottieDimensions}px`,
                margin: '0 auto',
              }"
            />
            <p
              class="text-center text-2xl px-5 text-base-priority dark:text-white mt-6"
            >
              {{ t("error-404-title") }}
            </p>
            <p
              class="text-center italic font-thin mt-5 px-5 text-base-priority dark:text-white"
            >
              {{ t("error-404-subtitle") }}
            </p>

            <div v-if="error" class="mt-4 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Error {{ error.statusCode }}: {{ error.statusMessage }}
              </p>
            </div>

            <div class="flex gap-4 mt-6">
              <Button @click="handleGoHome" variant="outline">
                {{ t("go-home") }}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
    <UiFooter />
  </div>
</template>
