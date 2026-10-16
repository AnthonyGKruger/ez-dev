<script setup lang="ts">
/**
 * Shared button. `primary` is reserved for "Start a project" (nav, hero,
 * closing CTA) and the contact-form submit; everything else is `secondary`.
 * Renders a NuxtLink for `to`, an <a> for `href` (new tab when external),
 * otherwise a <button>.
 */
const props = withDefaults(
  defineProps<{
    variant?: "primary" | "secondary";
    size?: "md" | "sm";
    to?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
  }>(),
  { variant: "secondary", size: "md", type: "button" },
);

const classes = computed(() => [
  "btn",
  props.variant === "primary" ? "btn-primary" : "btn-secondary",
  props.size === "sm" ? "btn-sm" : "",
]);
const isExternal = computed(() => !!props.href && /^https?:\/\//.test(props.href));
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes"><slot /></NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :target="isExternal || href.endsWith('.pdf') ? '_blank' : undefined"
    :rel="isExternal || href.endsWith('.pdf') ? 'noopener' : undefined"
  ><slot /></a>
  <button v-else :type="type" :class="classes"><slot /></button>
</template>
