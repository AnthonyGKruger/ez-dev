<script setup lang="ts">
import type { WorkItem } from "~/composables/useWork";
import type { WorkLabels } from "~/types/content";

withDefaults(defineProps<{
  project: WorkItem;
  labels: WorkLabels;
  /**
   * /portfolio variant: a stacked large card (screenshot on top) with a
   * category line and stack tags. Otherwise the compact home card, which
   * goes horizontal from 560px.
   */
  detailed?: boolean;
  /** Card title element; h4 under the home section's h3 group headings */
  headingTag?: "h3" | "h4";
}>(), { detailed: false, headingTag: "h4" });
</script>

<template>
  <article
    class="frame h-full"
    :class="
      detailed
        ? 'flex flex-col'
        : 'flex flex-col min-[560px]:grid min-[560px]:grid-cols-[minmax(170px,38%)_minmax(0,1fr)] min-[1100px]:grid-cols-[200px_minmax(0,1fr)]'
    "
  >
    <NuxtImg
      :src="project.image"
      :alt="`${project.title} screenshot`"
      :sizes="detailed ? '100vw md:50vw xl:620px' : '100vw sm:60vw xl:480px'"
      format="webp"
      quality="80"
      loading="lazy"
      class="block w-full object-cover"
      :class="
        detailed
          ? 'aspect-video object-top'
          : 'aspect-video object-top min-[560px]:aspect-auto min-[560px]:h-full min-[560px]:min-h-[220px] min-[560px]:object-left-top'
      "
    />
    <div class="flex flex-1 flex-col gap-2.5 p-5 md:px-6.5 md:py-6">
      <p class="mono flex min-w-0 gap-3 text-[10px] tracking-[0.06em] text-primary-gold md:text-[11px]">
        <span class="truncate">{{ project.domain }}</span>
        <span class="flex-none">{{ project.index }}</span>
      </p>
      <p
        v-if="detailed && project.category"
        class="mono text-[10px] tracking-[0.14em] uppercase md:text-[11px]"
      >
        {{ labels.clientLabel }} · {{ project.category }}
      </p>
      <component
        :is="headingTag"
        class="text-xl leading-tight font-black tracking-[-0.02em] text-[#f4f7fa] md:text-[22px]"
      >
        {{ project.title }}
      </component>
      <p class="leading-relaxed md:text-base">{{ project.description }}</p>
      <ul v-if="detailed && project.stack?.length" class="flex flex-wrap gap-2">
        <li v-for="tag in project.stack" :key="tag" class="chip min-h-7 text-[11px]">{{ tag }}</li>
      </ul>
      <div
        class="mt-auto grid grid-cols-2 gap-2.5 pt-1 min-[560px]:flex min-[560px]:flex-wrap"
      >
        <UiButton size="sm" :href="project.link">{{ labels.visit }}</UiButton>
        <UiButton v-if="project.referralLetter" size="sm" :href="project.referralLetter">
          {{ labels.referral }}
        </UiButton>
      </div>
    </div>
  </article>
</template>
