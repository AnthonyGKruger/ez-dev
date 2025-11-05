<script setup lang="ts">
import type { WeatherResponse, DailyWeather } from "~/types/weather-app";

const { t } = useTranslate();
const { track } = useGtmTrack();

interface Props {
  weather: WeatherResponse;
}

const props = defineProps<Props>();

const dailyForecast = computed(() => props.weather.daily?.slice(0, 7) || []);
const hourlyForecast = computed(() => props.weather.hourly || []);

const accordionStates = reactive({
  currentWeather: true,
  selectedDay: true,
  hourlyForecast: false,
  weeklyForecast: false,
});

const selectedDayIndex = ref(0);

const trackAccordion = (section: string, isOpen: boolean) => {
  track('weather-accordion-toggle', { section, isOpen });
};

const selectDay = (index: number) => {
  selectedDayIndex.value = index;
  accordionStates.selectedDay = true;
  const day = dailyForecast.value[index];
  track('weather-day-selected', {
    index,
    dt: day?.dt,
    isToday: index === 0,
    isTomorrow: index === 1,
  });
};

const selectedDay = computed((): DailyWeather | null => {
  return dailyForecast.value[selectedDayIndex.value] || null;
});

const selectedDayTimestamp = computed((): number => {
  return selectedDay.value?.dt || Date.now() / 1000;
});

const isToday = computed(() => selectedDayIndex.value === 0);
const isTomorrow = computed(() => selectedDayIndex.value === 1);

watch(selectedDayIndex, () => {
  accordionStates.selectedDay = true;
});

watch(
  () => accordionStates.currentWeather,
  (open) => track('weather-accordion-toggle', { section: 'current', isOpen: open }),
);
watch(
  () => accordionStates.selectedDay,
  (open) => track('weather-accordion-toggle', { section: 'day-details', isOpen: open }),
);
watch(
  () => accordionStates.hourlyForecast,
  (open) => track('weather-accordion-toggle', { section: 'hourly', isOpen: open }),
);
watch(
  () => accordionStates.weeklyForecast,
  (open) => track('weather-accordion-toggle', { section: 'weekly', isOpen: open }),
);
</script>

<template>
  <div v-if="dailyForecast.length > 0" class="space-y-4">
    <UiAccordion
      v-if="weather.current"
      :title="t('weather-accordion-current')"
      v-model:is-open="accordionStates.currentWeather"
    >
      <WeatherAppTodayView :weather="weather" />
    </UiAccordion>

    <UiAccordion
      v-if="selectedDay"
      :title="t('weather-accordion-day-details')"
      v-model:is-open="accordionStates.selectedDay"
    >
      <WeatherAppDayView :day="selectedDay" :is-today="isToday" />
    </UiAccordion>

    <UiAccordion
      v-if="selectedDay"
      :title="t('weather-accordion-hourly')"
      v-model:is-open="accordionStates.hourlyForecast"
      :disabled="!isToday && !isTomorrow"
    >
      <template #default>
        <WeatherAppHourlyRainChart
          :hourly-data="hourlyForecast"
          :selected-date="selectedDayTimestamp"
          :is-today="isToday"
          :is-tomorrow="isTomorrow"
        />
      </template>
    </UiAccordion>

    <UiAccordion
      :title="t('weather-accordion-weekly')"
      v-model:is-open="accordionStates.weeklyForecast"
    >
      <template #default>
        <WeatherAppWeekView
          :daily-data="dailyForecast"
          :selected-day="selectedDayIndex"
          @day-selected="selectDay"
        />
      </template>
    </UiAccordion>
  </div>
</template>
