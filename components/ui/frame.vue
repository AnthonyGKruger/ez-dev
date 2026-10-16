<script setup lang="ts">
/**
 * Browser-chrome frame: three dots, a label (domain or slug) and an index,
 * with optional gold corner brackets. Content goes in the default slot.
 */
withDefaults(
  defineProps<{ label?: string; index?: string; brackets?: boolean; tag?: string }>(),
  { label: "", index: "", brackets: false, tag: "div" },
);
</script>

<template>
  <component :is="tag" class="frame">
    <div class="frame-chrome mono text-[oklch(78%_0.02_250)]">
      <span class="flex flex-none gap-1.5" aria-hidden="true">
        <span class="frame-dot" /><span class="frame-dot" /><span class="frame-dot" />
      </span>
      <span class="min-w-0 flex-1 truncate text-[10px] md:text-[11px] tracking-[0.04em]">{{ label }}</span>
      <span v-if="index" class="flex-none text-[10px] md:text-[11px] text-primary-gold">{{ index }}</span>
    </div>
    <slot />
    <template v-if="brackets">
      <span class="bracket bracket-tl" aria-hidden="true" />
      <span class="bracket bracket-tr" aria-hidden="true" />
      <span class="bracket bracket-bl" aria-hidden="true" />
      <span class="bracket bracket-br" aria-hidden="true" />
    </template>
  </component>
</template>
