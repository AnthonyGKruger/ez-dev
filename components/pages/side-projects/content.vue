<script setup lang="ts">
const { t } = useTranslate();
const route = useRoute();
</script>

<template>
  <div
    class="py-16 px-4 sm:px-6"
    :class="{ 'min-h-screen': route.path === '/side-projects' }"
  >
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-neutral-900 dark:text-white mb-8">
        {{ t("side-projects-title") }}
      </h1>
      <div class="grid gap-4">
        <NuxtLink
          pull
          to="/side-projects/weather-app"
          class="block rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 bg-white dark:bg-neutral-800 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <h2
                class="text-xl font-semibold text-neutral-900 dark:text-white"
              >
                {{ t("weather-title") }}
              </h2>
              <p class="text-neutral-600 dark:text-neutral-400 mt-1">
                {{ t("weather-meta-desc") }}
              </p>
            </div>
            <Icon name="mdi:arrow-right" class="w-6 h-6 text-neutral-400" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
