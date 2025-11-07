<script setup lang="ts">
import type { HourlyWeather } from "~/types/weather-app";

const { t } = useTranslate();
const { track } = useGtmTrack();

interface Props {
  hourlyData: HourlyWeather[];
  selectedDate: number;
  isToday: boolean;
  isTomorrow: boolean;
}

const props = defineProps<Props>();

const hourlyForecast = computed(() => {
  if (!props.isToday && !props.isTomorrow) {
    return [];
  }

  const selectedDay = new Date(props.selectedDate * 1000);
  selectedDay.setHours(0, 0, 0, 0);

  const nextDay = new Date(selectedDay);
  nextDay.setDate(nextDay.getDate() + 1);

  return props.hourlyData.filter((hour) => {
    const hourDate = new Date(hour.dt * 1000);
    return hourDate >= selectedDay && hourDate < nextDay;
  });
});

const precipitationData = computed(() => {
  if (hourlyForecast.value.length === 0) return [];

  return hourlyForecast.value.map((hour) => ({
    time: new Date(hour.dt * 1000).getHours(),
    pop: hour.pop,
    precipitation: Math.round(hour.pop * 100),
    temp: Math.round(hour.temp),
    weather: hour.weather[0],
  }));
});

const formatHour = (hour: number) => {
  if (hour === 0) return t("time-12am");
  if (hour < 12) return t("time-am", { h: hour });
  if (hour === 12) return t("time-12pm");
  return t("time-pm", { h: hour - 12 });
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

// Get bar height based on precipitation probability
const getBarHeight = (precipitation: number) => {
  return `${Math.max(5, precipitation)}%`;
};

// Check if there's significant rain (>= 30% chance)
const hasSignificantRain = computed(() => {
  return precipitationData.value.some((data) => data.precipitation >= 10);
});

// Check if we have data for this day
const hasHourlyData = computed(() => {
  return props.isToday || props.isTomorrow;
});

const animatedBars = ref<boolean[]>([]);
const barObserver: { current: IntersectionObserver | null } = { current: null };
const barRefs = ref<(HTMLElement | null)[]>([]);
const firstBarTracked = ref(false);
let chartLoadedTracked = false;

const setBarRef = (el: HTMLElement | null, index: number) => {
  barRefs.value[index] = el;
};

const observeBars = () => {
  if (barObserver.current) barObserver.current.disconnect();
  barObserver.current = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const idxAttr = target.getAttribute("data-index");
          const idx = idxAttr ? parseInt(idxAttr, 10) : -1;
          if (idx >= 0) {
            animatedBars.value[idx] = true;
            if (!firstBarTracked.value) {
              firstBarTracked.value = true;
              track("weather-hourly-first-bar-animated");
            }
            barObserver.current?.unobserve(target);
          }
        }
      });
    },
    { threshold: 0.25 },
  );

  barRefs.value.forEach((el) => {
    if (el) barObserver.current?.observe(el);
  });
};

watch(
  precipitationData,
  async (newData) => {
    // reset per-load tracking flags
    firstBarTracked.value = false;
    chartLoadedTracked = false;

    animatedBars.value = Array(newData.length).fill(false);
    await nextTick();
    observeBars();

    if (hasHourlyData.value) {
      if (newData.length > 0 && !chartLoadedTracked) {
        chartLoadedTracked = true;
        track("weather-hourly-chart-loaded", { bars: newData.length });
      }
      if (newData.length === 0) {
        track("weather-hourly-no-data");
      }
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  if (barObserver.current) {
    barObserver.current.disconnect();
    barObserver.current = null;
  }
});
</script>

<template>
  <div class="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg mt-8">
    <h3 class="text-xl font-bold text-neutral-900 dark:text-white mb-6">
      {{ t("weather-accordion-hourly") }}
    </h3>

    <div v-if="!hasHourlyData" class="text-center py-8">
      <Icon
        name="mdi:information-outline"
        class="w-16 h-16 text-blue-500 mx-auto mb-4"
      />
      <p class="text-neutral-600 dark:text-neutral-400">
        {{ t("hourly-only-today-tomorrow") }}
      </p>
    </div>

    <div v-else-if="precipitationData.length === 0" class="text-center py-8">
      <Icon
        name="mdi:weather-sunny"
        class="w-16 h-16 text-yellow-500 mx-auto mb-4"
      />
      <p class="text-neutral-600 dark:text-neutral-400">
        {{ t("hourly-no-data") }}
      </p>
    </div>

    <div v-else-if="!hasSignificantRain" class="text-center py-8">
      <Icon
        name="mdi:weather-sunny"
        class="w-16 h-16 text-yellow-500 mx-auto mb-4"
      />
      <p class="text-neutral-600 dark:text-neutral-400">
        {{ t("hourly-no-significant-precip") }}
      </p>
    </div>

    <div ref="chartContainer" v-else>
      <div class="overflow-x-auto">
        <div class="flex flex-nowrap gap-2 pr-2">
          <div
            v-for="(hour, index) in precipitationData"
            :key="hour.time"
            class="px-1 flex-none"
          >
            <div class="flex flex-col items-center px-2 py-4">
              <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                {{ formatHour(hour.time) }}
              </div>

              <div class="flex flex-col items-center mb-2">
                <Icon
                  :name="getWeatherIcon(hour.weather.icon)"
                  class="w-8 h-8 text-neutral-700 dark:text-neutral-300 mb-1"
                />
                <span
                  class="text-sm font-medium text-neutral-900 dark:text-white"
                >
                  {{ hour.temp }}°
                </span>
              </div>

              <div class="relative flex flex-col items-center w-12">
                <div
                  class="w-8 h-32 bg-neutral-100 dark:bg-neutral-700 rounded-full flex items-end justify-center mb-2 overflow-hidden"
                >
                  <div
                    class="w-full rounded-full transition-all duration-700 ease-out"
                    :class="{
                      'bg-blue-500': hour.precipitation > 0,
                      'bg-neutral-200 dark:bg-neutral-600':
                        hour.precipitation === 0,
                    }"
                    :style="{
                      height: animatedBars[index]
                        ? getBarHeight(hour.precipitation)
                        : '0%',
                    }"
                    :data-index="String(index)"
                    :ref="(el) => setBarRef(el as HTMLElement | null, index)"
                  ></div>
                </div>
                <div
                  class="text-sm font-medium"
                  :class="{
                    'text-blue-600 dark:text-blue-400': hour.precipitation > 0,
                    'text-neutral-500 dark:text-neutral-400':
                      hour.precipitation === 0,
                  }"
                >
                  {{ hour.precipitation }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="hasHourlyData && precipitationData.length > 0"
      class="mt-6 flex items-center justify-center text-sm text-neutral-600 dark:text-neutral-400"
    >
      <Icon name="mdi:information-outline" class="w-4 h-4 mr-2" />
      <span>{{ t("hourly-legend") }}</span>
    </div>
  </div>
</template>
