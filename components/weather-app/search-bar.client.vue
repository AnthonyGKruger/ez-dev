<script setup lang="ts">
interface Props {
  modelValue: string;
  loading?: boolean;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "search", query: string): void;
  (e: "locate"): void;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<Emits>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const handleSearch = () => {
  if (inputValue.value.trim()) {
    emit("search", inputValue.value.trim());
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};

const handleLocate = () => {
  emit("locate");
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <Icon
          name="mdi:magnify"
          class="w-5 h-5 text-gray-400 dark:text-gray-500"
        />
      </div>

      <input
        v-model="inputValue"
        @keydown="handleKeydown"
        type="text"
        placeholder="Search for a city (e.g. New York, London, Tokyo)"
        class="w-full p-4 pl-10 pr-28 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-800 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-blue dark:focus:border-primary-blue"
        :disabled="loading"
      />

      <div class="absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          @click="handleLocate"
          :disabled="loading"
          type="button"
          class="p-2 mr-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-blue focus:z-10 focus:ring-2 focus:ring-primary-blue focus:text-primary-blue dark:bg-neutral-800 dark:text-gray-400 dark:border-neutral-600 dark:hover:text-white dark:hover:bg-neutral-700 dark:focus:ring-primary-blue disabled:opacity-50 disabled:cursor-not-allowed"
          title="Use my location"
        >
          <Icon name="mdi:crosshairs-gps" class="w-5 h-5" />
        </button>

        <button
          @click="handleSearch"
          :disabled="loading || !inputValue.trim()"
          type="button"
          class="p-2 text-sm font-medium text-white bg-primary-blue rounded-lg border border-primary-blue hover:bg-light-blue focus:ring-2 focus:outline-none focus:ring-primary-blue dark:bg-primary-blue dark:hover:bg-light-blue dark:focus:ring-primary-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon
            v-if="loading"
            name="mdi:loading"
            class="w-5 h-5 animate-spin"
          />
          <Icon v-else name="mdi:arrow-right" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      <p>Enter a city name to get weather information</p>
    </div>
  </div>
</template>
