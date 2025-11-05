<script setup lang="ts">
interface Props {
  title: string;
  isOpen?: boolean;
  disabled?: boolean;
}

interface Emits {
  (e: "update:isOpen", value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  disabled: false,
});

const emit = defineEmits<Emits>();

const isOpenInternal = computed({
  get: () => props.isOpen,
  set: (value) => emit("update:isOpen", value),
});

const toggle = () => {
  if (!props.disabled) {
    isOpenInternal.value = !isOpenInternal.value;
  }
};
</script>

<template>
  <div
    class="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden mb-4"
  >
    <button
      @click="toggle"
      :disabled="disabled"
      :class="[
        'w-full flex justify-between items-center p-4 text-left font-medium text-neutral-900 dark:text-white bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200',
        { 'cursor-not-allowed opacity-50': disabled },
      ]"
    >
      <span class="text-lg">{{ title }}</span>
      <Icon
        v-if="!disabled"
        name="mdi:chevron-down"
        class="w-6 h-6 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      v-show="isOpen"
      class="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700"
    >
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
