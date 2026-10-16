<script setup lang="ts">
import type { WorkItem } from "~/composables/useWork";
import type { WorkLabels } from "~/types/content";

withDefaults(defineProps<{
  project: WorkItem;
  labels: WorkLabels;
  /** /portfolio variant: category line and stack tags */
  detailed?: boolean;
  /** Card title element; h4 under the home section's h3 group headings */
  headingTag?: "h3" | "h4";
}>(), { detailed: false, headingTag: "h4" });
</script>

<template>
  <UiFrame
    tag="article"
    :label="project.domain"
    :index="project.index"
    brackets
    class="flex h-full flex-col"
  >
    <NuxtImg
      :src="project.image"
      :alt="`${project.title} screenshot`"
      sizes="100vw md:50vw xl:620px"
      format="webp"
      quality="80"
      loading="lazy"
      class="block aspect-video w-full object-cover object-top"
    />
    <div class="flex flex-1 flex-col gap-3 p-[clamp(20px,2vw,28px)] md:gap-3.5">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span class="badge-product">{{ labels.productBadge }}</span>
        <span
          v-if="detailed && project.category"
          class="mono text-[10px] tracking-[0.14em] uppercase md:text-[11px]"
        >{{ project.category }}</span>
      </div>
      <component
        :is="headingTag"
        class="text-[length:clamp(24px,0.4vw_+_22px,28px)] leading-tight font-black tracking-[-0.02em] text-[#f4f7fa]"
      >
        {{ project.title }}
      </component>
      <p class="leading-relaxed">{{ project.description }}</p>
      <div
        v-if="project.metric?.value"
        class="flex items-baseline gap-3 border border-dashed border-primary-gold/45 px-4 py-3.5"
      >
        <span class="mono text-xl font-bold text-light-gold md:text-[22px]">{{ project.metric.value }}</span>
        <span class="mono text-[10px] tracking-[0.12em] uppercase md:text-[11px]">{{ project.metric.label }}</span>
      </div>
      <ul v-if="detailed && project.stack?.length" class="flex flex-wrap gap-2">
        <li v-for="tag in project.stack" :key="tag" class="chip min-h-7 text-[11px]">{{ tag }}</li>
      </ul>
      <div class="mt-auto pt-1">
        <UiButton size="sm" :href="project.link">
          {{ labels.visit }}
          <!-- The domain is in the chrome bar too; drop it where the label can't fit. -->
          <span class="-ml-1 max-[359px]:hidden">{{ project.domain }}</span>
        </UiButton>
      </div>
    </div>
  </UiFrame>
</template>
