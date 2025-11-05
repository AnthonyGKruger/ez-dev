<script setup lang="ts">
import type { DailyWeather } from "~/types/weather-app";

const { t } = useTranslate();

interface Props {
  dailyData: DailyWeather[];
  selectedDay: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "day-selected", day: number): void;
}>();

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, { weekday: "short" });
};

const formatDateFull = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const isToday = (timestamp: number) => {
  const today = new Date();
  const date = new Date(timestamp * 1000);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (timestamp: number) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(timestamp * 1000);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
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

const selectDay = (index: number) => {
  emit("day-selected", index);
};
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
      {{ t('weather-accordion-weekly') }}
    </h2>

    <div class="overflow-x-auto">
      <div class="flex flex-nowrap gap-4 pr-2 py-3">
        <div v-for="(day, index) in dailyData" :key="day.dt" class="px-2 flex-none">
          <div
            class="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md h-full"
            :class="{
              'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20':
                selectedDay === index,
              'hover:bg-neutral-100 dark:hover:bg-neutral-600':
                selectedDay !== index,
            }"
            @click="selectDay(index)"
          >
            <div class="text-center">
              <div
                class="font-semibold text-neutral-900 dark:text-white"
                :class="{
                  'text-blue-600 dark:text-blue-400': selectedDay === index,
                }"
              >
                <span v-if="isToday(day.dt)">{{ t('today') }}</span>
                <span v-else-if="isTomorrow(day.dt)">{{ t('tomorrow') }}</span>
                <span v-else>{{ formatDate(day.dt) }}</span>
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                {{ formatDateFull(day.dt) }}
              </div>

              <div class="my-3 flex justify-center">
                <Icon
                  :name="getWeatherIcon(day.weather[0].icon)"
                  class="w-12 h-12 text-neutral-700 dark:text-neutral-300"
                />
              </div>

              <div class="flex justify-between items-center mt-2">
                <span
                  class="text-lg font-bold text-neutral-900 dark:text-white"
                >
                  {{ Math.round(day.temp.max) }}°
                </span>
                <span class="text-neutral-600 dark:text-neutral-400">
                  {{ Math.round(day.temp.min) }}°
                </span>
              </div>

              <div
                class="mt-2 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-center"
              >
                <Icon name="mdi:water" class="w-4 h-4 mr-1" />
                {{ Math.round(day.pop * 100) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
