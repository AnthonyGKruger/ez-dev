<script setup lang="ts">
import type { WeatherResponse } from "~/types/weather-app";

definePageMeta({
  layout: "default",
});

useHead({
  title: "Weather App",
  meta: [
    {
      name: "description",
      content: "Check the weather in any city around the world",
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

// Request location on component mount
onMounted(async () => {
  // Only request location if we haven't already
  if (!location.value) await handleLocate();
});

const handleSearch = async (query: string) => {
  if (!query.trim()) return;

  loading.value = true;
  error.value = null;
  weatherData.value = null;

  try {
    weatherData.value = await fetchWeatherByCity(query);
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "Failed to fetch weather data. Please try again.";
    console.error("Weather search error:", err);
  } finally {
    loading.value = false;
  }
};

const handleLocate = async () => {
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
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : "Failed to fetch weather data for your location.";
      console.error("Weather location error:", err);
    } finally {
      loading.value = false;
    }
  }
};

const handleSearchUpdate = (query: string) => {
  searchQuery.value = query;
};
</script>

<template>
  <div class="min-h-screen py-16 px-4 sm:px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-lg text-neutral-600 dark:text-neutral-400">
          Check the weather in any city around the world
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

      <!-- Location error message -->
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

      <!-- Search error message -->
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

      <!-- Loading state -->
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
                ? "Getting your location..."
                : "Loading weather data..."
            }}
          </p>
        </div>
      </div>

      <!-- Initial state (no search yet) -->
      <div v-else-if="!weatherData && !error" class="text-center py-12">
        <div
          class="inline-block p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full mb-6"
        >
          <Icon name="mdi:weather-cloudy" class="w-16 h-16 text-primary-blue" />
        </div>
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          Welcome to the Weather App
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          {{
            location
              ? "Search for a city or use the location button to get started"
              : "Search for a city or allow location access to get started"
          }}
        </p>
      </div>

      <!-- Weather data display -->
      <div v-else-if="weatherData" class="mt-8">
        <WeatherAppForecast :weather="weatherData" />
      </div>
    </div>
  </div>
</template>
