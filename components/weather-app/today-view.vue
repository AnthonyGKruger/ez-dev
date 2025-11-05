<script setup lang="ts">
import type { WeatherResponse } from "~/types/weather-app";

const { t } = useTranslate();

interface Props {
  weather: WeatherResponse;
}

const props = defineProps<Props>();

const current = computed(() => props.weather.current);
const daily = computed(() => props.weather.daily);
const today = computed(() => daily.value?.[0]);

const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString(undefined, {
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
</script>

<template>
  <div v-if="current" class="space-y-8">
    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-4">
      {{ t('today') }}
    </h3>
    <div
      :class="[
        'rounded-2xl p-6 text-white shadow-xl',
        getWeatherBackground(current.weather[0]?.icon || ''),
      ]"
    >
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-center md:text-left mb-6 md:mb-0">
          <h2 class="text-2xl font-bold">
            {{ weather.timezone.replace(/\/.*\//, "") }}
          </h2>
          <p class="text-lg opacity-90">{{ formatDate(current.dt) }}</p>
          <p class="text-sm opacity-80">{{ formatTime(current.dt) }}</p>
        </div>

        <div class="flex items-center">
          <div class="text-center">
            <Icon
              :name="getWeatherIcon(current.weather[0]?.icon || '')"
              class="w-24 h-24 mx-auto"
            />
            <p class="text-xl capitalize mt-2">
              {{ current.weather[0]?.description || t('weather-generic') }}
            </p>
          </div>
        </div>

        <div class="text-center md:text-right">
          <div class="text-6xl font-bold">{{ Math.round(current.temp) }}°</div>
          <div class="text-lg">
            {{ t('feels-like') }} {{ Math.round(current.feels_like) }}°
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div class="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
          <div class="flex items-center">
            <Icon name="mdi:water-percent" class="w-6 h-6 mr-2" />
            <span>{{ t('humidity') }}</span>
          </div>
          <div class="text-2xl font-bold mt-1">{{ current.humidity }}%</div>
        </div>

        <div class="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
          <div class="flex items-center">
            <Icon name="mdi:weather-windy" class="w-6 h-6 mr-2" />
            <span>{{ t('wind') }}</span>
          </div>
          <div class="text-2xl font-bold mt-1">
            {{ current.wind_speed }} m/s
          </div>
        </div>

        <div class="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
          <div class="flex items-center">
            <Icon name="mdi:gauge" class="w-6 h-6 mr-2" />
            <span>{{ t('pressure') }}</span>
          </div>
          <div class="text-2xl font-bold mt-1">{{ current.pressure }} hPa</div>
        </div>

        <div class="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
          <div class="flex items-center">
            <Icon name="mdi:eye" class="w-6 h-6 mr-2" />
            <span>{{ t('visibility') }}</span>
          </div>
          <div class="text-2xl font-bold mt-1">
            {{ (current.visibility / 1000).toFixed(1) }} km
          </div>
        </div>
      </div>

      <div v-if="today" class="mt-8 pt-6 border-t border-white/30">
        <h3 class="text-xl font-bold mb-4">{{ t('todays-forecast') }}</h3>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <Icon
              :name="getWeatherIcon(today.weather[0]?.icon || '')"
              class="w-12 h-12 mr-3"
            />
            <span class="text-lg capitalize">{{
              today.weather[0]?.description
            }}</span>
          </div>
          <div class="text-2xl font-bold">
            {{ Math.round(today.temp.max) }}° /
            {{ Math.round(today.temp.min) }}°
          </div>
        </div>
        <div class="flex justify-between mt-4 text-sm">
          <div>
            <div class="flex items-center">
              <Icon name="mdi:weather-sunset-up" class="w-5 h-5 mr-1" />
              <span>{{ t('sunrise') }}: {{ formatTime(today.sunrise) }}</span>
            </div>
          </div>
          <div>
            <div class="flex items-center">
              <Icon name="mdi:weather-sunset-down" class="w-5 h-5 mr-1" />
              <span>{{ t('sunset') }}: {{ formatTime(today.sunset) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
