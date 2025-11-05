<script setup lang="ts">
import type { WeatherResponse } from "~/types/weather-app";

const { t } = useTranslate();
const { track } = useGtmTrack();

definePageMeta({
  layout: "default",
});

useHead({
  title: t('weather-title'),
  meta: [
    {
      name: "description",
      content: t('weather-meta-desc'),
    },
  ],
});

const searchQuery = ref("");
const weatherData = ref<WeatherResponse | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const { location, isLocationLoading, locationError, requestLocation } =
  useGeolocation();
const { fetchWeatherByCity, fetchWeatherByCoordinates } = useWeather();

onMounted(async () => {
  track('weather-page-view');
  if (!location.value) await handleLocate();
});

watch(locationError, (val) => {
  if (val) track('weather-location-error', { message: String(val) });
});

const handleSearch = async (query: string) => {
  if (!query.trim()) return;

  loading.value = true;
  error.value = null;
  weatherData.value = null;
  track('weather-search-request', { query });

  try {
    const result = await fetchWeatherByCity(query);
    weatherData.value = result;
    track('weather-search-success', {
      query,
      lat: result.lat,
      lon: result.lon,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : t('weather-error-generic');
    error.value = message;
    track('weather-search-error', { query, message });
    console.error("Weather search error:", err);
  } finally {
    loading.value = false;
  }
};

const handleLocate = async () => {
  track('weather-locate-request');
  const userLocation = await requestLocation();
  if (userLocation) {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetchWeatherByCoordinates(
        userLocation.lat,
        userLocation.lon,
      );
      weatherData.value = response;
      searchQuery.value = `${response.lat.toFixed(2)}, ${response.lon.toFixed(2)}`;
      track('weather-locate-success', { lat: userLocation.lat, lon: userLocation.lon });
      track('weather-locate-weather-success', { lat: response.lat, lon: response.lon });
    } catch (err) {
      const message = err instanceof Error ? err.message : t('weather-error-location');
      error.value = message;
      track('weather-locate-weather-error', { message });
      console.error("Weather location error:", err);
    } finally {
      loading.value = false;
    }
  } else {
    track('weather-locate-denied-or-failed');
  }
};
</script>

<template>
  <div class="min-h-screen py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-lg text-neutral-600 dark:text-neutral-400">
          {{ t('weather-meta-desc') }}
        </h1>
      </div>

      <div class="mb-8">
        <WeatherAppSearchBar
          v-model="searchQuery"
          :loading="loading || isLocationLoading"
          @search="handleSearch"
          @locate="handleLocate"
        />
      </div>

      <div
        v-if="locationError"
        class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"
      >
        <div class="flex items-center">
          <Icon
            name="mdi:alert-circle"
            class="w-5 h-5 text-red-500 dark:text-red-400 mr-2"
          />
          <p class="text-red-800 dark:text-red-400">{{ locationError }}</p>
        </div>
      </div>

      <div
        v-if="error"
        class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg"
      >
        <div class="flex items-center">
          <Icon
            name="mdi:alert-circle"
            class="w-5 h-5 text-red-500 dark:text-red-400 mr-2"
          />
          <p class="text-red-800 dark:text-red-400">{{ error }}</p>
        </div>
      </div>

      <div
        v-if="loading || isLocationLoading"
        class="flex justify-center my-12"
      >
        <div class="text-center">
          <Icon
            name="mdi:loading"
            class="w-12 h-12 text-primary-blue animate-spin mx-auto mb-4"
          />
          <p class="text-neutral-600 dark:text-neutral-400">
            {{
              isLocationLoading
                ? t('weather-loading-getting-location')
                : t('weather-loading-fetching')
            }}
          </p>
        </div>
      </div>

      <div v-else-if="!weatherData && !error" class="text-center py-12">
        <div
          class="inline-block p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6"
        >
          <Icon name="mdi:weather-cloudy" class="w-16 h-16 text-primary-blue" />
        </div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {{ t('weather-welcome-title') }}
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          {{
            location
              ? t('weather-welcome-with-location')
              : t('weather-welcome-no-location')
          }}
        </p>
      </div>

      <div v-else-if="weatherData" class="mt-8">
        <WeatherAppForecast :weather="weatherData" />
      </div>
    </div>
  </div>
</template>
