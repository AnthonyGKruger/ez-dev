<script setup lang="ts">
interface Props {
  modelValue: boolean;
  checkedValue?: string;
  uncheckedValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checkedValue: "On",
  uncheckedValue: "Off",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const toggle = () => {
  emit("update:modelValue", !props.modelValue);
};
</script>

<template>
  <button
    @click="toggle"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
      modelValue
        ? 'bg-primary-blue dark:bg-light-gold'
        : 'bg-neutral-200 dark:bg-neutral-700',
    ]"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        modelValue ? 'translate-x-6' : 'translate-x-1',
      ]"
    />
  </button>
</template>
