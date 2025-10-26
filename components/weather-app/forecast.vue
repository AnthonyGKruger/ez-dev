<script setup lang="ts">
import type { WeatherResponse, DailyWeather } from "~/types/weather-app";

interface Props {
  weather: WeatherResponse;
}

const props = defineProps<Props>();

const selectedDayIndex = ref(0);
const dailyForecast = computed(() => props.weather.daily?.slice(0, 7) || []);
const hourlyForecast = computed(() => props.weather.hourly || []);

const selectDay = (index: number) => {
  selectedDayIndex.value = index;
};

const selectedDay = computed((): DailyWeather | null => {
  return dailyForecast.value[selectedDayIndex.value] || null;
});

const selectedDayTimestamp = computed((): number => {
  return selectedDay.value?.dt || Date.now() / 1000;
});

const isToday = computed(() => selectedDayIndex.value === 0);
const isTomorrow = computed(() => selectedDayIndex.value === 1);
</script>

<template>
  <div v-if="dailyForecast.length > 0" class="space-y-8">
    <!-- Current Weather -->
    <WeatherAppTodayView v-if="weather.current" :weather="weather" />

    <!-- Day Detail View -->
    <WeatherAppDayView
      v-if="selectedDay"
      :day="selectedDay"
      :is-today="isToday"
    />

    <!-- Hourly Rain Chart -->
    <WeatherAppHourlyRainChart
      v-if="selectedDay"
      :hourly-data="hourlyForecast"
      :selected-date="selectedDayTimestamp"
      :is-today="isToday"
      :is-tomorrow="isTomorrow"
    />

    <!-- Week View with Selection -->
    <WeatherAppWeekView
      :forecast="dailyForecast"
      :selected-day-index="selectedDayIndex"
      @day-selected="selectDay"
    />
  </div>
</template>
