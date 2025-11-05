<script setup lang="ts">
import type { DailyWeather } from "~/types/weather-app";

const { t } = useTranslate();

interface Props {
  day: DailyWeather;
  isToday?: boolean;
}

const props = defineProps<Props>();

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
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

const getPopPercentage = (pop: number) => {
  return Math.round(pop * 100);
};

const getWindDirection = (degrees: number) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

const getUvIndexLevel = (uvi: number) => {
  if (uvi <= 2) return { level: t('uv-low'), color: "text-green-500" };
  if (uvi <= 5) return { level: t('uv-moderate'), color: "text-yellow-500" };
  if (uvi <= 7) return { level: t('uv-high'), color: "text-orange-500" };
  if (uvi <= 10) return { level: t('uv-very-high'), color: "text-red-500" };
  return { level: t('uv-extreme'), color: "text-purple-500" };
};
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-neutral-900 dark:text-white">
        {{ isToday ? t('today') : formatDate(day.dt) }}
      </h2>
      <span class="text-lg text-neutral-600 dark:text-neutral-400 capitalize">
        {{ day.weather[0]?.description }}
      </span>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-between mb-8">
      <div class="flex items-center mb-6 md:mb-0">
        <Icon
          :name="getWeatherIcon(day.weather[0]?.icon || '')"
          class="w-24 h-24 text-primary-blue dark:text-light-gold"
        />
        <div class="ml-4">
          <div class="text-5xl font-bold text-neutral-900 dark:text-white">
            {{ Math.round(day.temp.day) }}°
          </div>
          <div class="text-neutral-600 dark:text-neutral-400">
            {{ t('feels-like') }} {{ Math.round(day.feels_like.day) }}°
          </div>
        </div>
      </div>

      <div class="text-center">
        <div class="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
          {{ Math.round(day.temp.max) }}° / {{ Math.round(day.temp.min) }}°
        </div>
        <div class="flex justify-center space-x-4">
          <div class="text-center">
            <div class="text-neutral-600 dark:text-neutral-400">{{ t('sunrise') }}</div>
            <div class="font-medium text-neutral-900 dark:text-white">
              {{ formatTime(day.sunrise) }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-neutral-600 dark:text-neutral-400">{{ t('sunset') }}</div>
            <div class="font-medium text-neutral-900 dark:text-white">
              {{ formatTime(day.sunset) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-xl">
        <div class="flex items-center mb-2">
          <Icon name="mdi:water-percent" class="w-5 h-5 text-blue-500 mr-2" />
          <span class="text-neutral-600 dark:text-neutral-400">{{ t('humidity') }}</span>
        </div>
        <div class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ day.humidity }}%
        </div>
      </div>

      <div class="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-xl">
        <div class="flex items-center mb-2">
          <Icon name="mdi:weather-windy" class="w-5 h-5 text-gray-500 mr-2" />
          <span class="text-neutral-600 dark:text-neutral-400">{{ t('wind') }}</span>
        </div>
        <div class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ day.wind_speed }} m/s
        </div>
        <div class="text-sm text-neutral-600 dark:text-neutral-400">
          {{ getWindDirection(day.wind_deg) }}
        </div>
      </div>

      <div class="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-xl">
        <div class="flex items-center mb-2">
          <Icon name="mdi:weather-rainy" class="w-5 h-5 text-blue-400 mr-2" />
          <span class="text-neutral-600 dark:text-neutral-400">{{ t('rain-chance') }}</span>
        </div>
        <div class="text-2xl font-bold text-neutral-900 dark:text-white">
          {{ getPopPercentage(day.pop) }}%
        </div>
      </div>

      <div class="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-xl">
        <div class="flex items-center mb-2">
          <Icon
            name="mdi:white-balance-sunny"
            class="w-5 h-5 text-yellow-500 mr-2"
          />
          <span class="text-neutral-600 dark:text-neutral-400">{{ t('uv-index') }}</span>
        </div>
        <div class="text-2xl font-bold" :class="getUvIndexLevel(day.uvi).color">
          {{ day.uvi }}
        </div>
        <div class="text-sm" :class="getUvIndexLevel(day.uvi).color">
          {{ getUvIndexLevel(day.uvi).level }}
        </div>
      </div>
    </div>

    <div
      v-if="day.rain"
      class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"
    >
      <div class="flex items-center">
        <Icon name="mdi:weather-pouring" class="w-5 h-5 text-blue-500 mr-2" />
        <span class="text-neutral-900 dark:text-white">
          {{ t('rain-expected', { mm: day.rain }) }}
        </span>
      </div>
    </div>
  </div>
</template>
