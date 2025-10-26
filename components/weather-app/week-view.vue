<script setup lang="ts">
import type { DailyWeather } from "~/types/weather-app";

interface Props {
  forecast: DailyWeather[];
  selectedDayIndex: number;
}

interface Emits {
  (e: "day-selected", index: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, { weekday: "short" });
};

const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, string> = {
    "01d": "mdi:weather-sunny",
    "01n": "mdi:weather-night",
    "02d": "mdi:weather-partly-cloudy",
    "02n": "mdi:weather-night-partly-cloudy",
    "03d": "mdi:weather-cloudy",
    "03n": "mdi:weather-cloudy",
    "04d": "mdi:weather-cloudy-arrow-right",
    "04n": "mdi:weather-cloudy-arrow-right",
    "09d": "mdi:weather-pouring",
    "09n": "mdi:weather-pouring",
    "10d": "mdi:weather-rainy",
    "10n": "mdi:weather-rainy",
    "11d": "mdi:weather-lightning",
    "11n": "mdi:weather-lightning",
    "13d": "mdi:weather-snowy",
    "13n": "mdi:weather-snowy",
    "50d": "mdi:weather-fog",
    "50n": "mdi:weather-fog",
  };

  return iconMap[iconCode] || "mdi:weather-cloudy";
};

const getWeatherBackground = (iconCode: string) => {
  if (iconCode.includes("01"))
    return "bg-gradient-to-br from-blue-400 to-blue-600";
  if (iconCode.includes("02"))
    return "bg-gradient-to-br from-blue-300 to-blue-500";
  if (iconCode.includes("03") || iconCode.includes("04"))
    return "bg-gradient-to-br from-gray-400 to-gray-600";
  if (iconCode.includes("09") || iconCode.includes("10"))
    return "bg-gradient-to-br from-gray-500 to-blue-700";
  if (iconCode.includes("11"))
    return "bg-gradient-to-br from-gray-600 to-purple-700";
  if (iconCode.includes("13"))
    return "bg-gradient-to-br from-blue-100 to-blue-300";
  if (iconCode.includes("50"))
    return "bg-gradient-to-br from-gray-300 to-gray-500";
  return "bg-gradient-to-br from-blue-400 to-blue-600";
};

const getPopPercentage = (pop: number) => {
  return Math.round(pop * 100);
};

const selectDay = (index: number) => {
  emit("day-selected", index);
};
</script>

<template>
  <div class="mt-8">
    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4">
      7-Day Forecast
    </h3>
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
    >
      <div
        v-for="(day, index) in forecast.slice(0, 7)"
        :key="day.dt"
        :class="[
          'rounded-2xl p-4 text-white shadow-lg relative overflow-hidden',
          getWeatherBackground(day.weather[0]?.icon || ''),
        ]"
        @click="selectDay(index)"
      >
        <!-- Date -->
        <div class="text-center mb-2">
          <span class="font-bold text-lg">
            {{ index === 0 ? "Today" : formatDate(day.dt) }}
          </span>
        </div>

        <!-- Weather Icon -->
        <div class="flex justify-center my-2">
          <Icon
            :name="getWeatherIcon(day.weather[0]?.icon || '')"
            class="w-12 h-12"
          />
        </div>

        <!-- Weather Description -->
        <div
          class="text-center text-sm mb-4 h-10 flex items-center justify-center"
        >
          <span class="capitalize">
            {{ day.weather[0]?.description || "Weather" }}
          </span>
        </div>

        <!-- Rain Chance (Bottom Left) -->
        <div class="absolute bottom-2 left-2 flex items-center">
          <Icon name="mdi:weather-rainy" class="w-4 h-4 mr-1" />
          <span class="text-sm">{{ getPopPercentage(day.pop) }}%</span>
        </div>

        <!-- Temperature (Bottom Right) -->
        <div class="absolute bottom-2 right-2 text-sm">
          <span class="font-bold">{{ Math.round(day.temp.max) }}°</span>
          <span class="opacity-80">/{{ Math.round(day.temp.min) }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>
