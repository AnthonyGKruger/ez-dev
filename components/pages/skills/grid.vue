<script setup lang="ts">
const content = useContent("skills");
</script>

<template>
  <section
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(56px,7vw,112px)] pb-[clamp(64px,7vw,100px)]"
  >
    <p class="eyebrow mb-2.5 md:mb-3.5">{{ content.eyebrow }}</p>
    <h1
      class="text-[length:clamp(40px,1.6vw_+_33px,56px)] leading-[1.04] font-black tracking-[-0.035em] text-[#f4f7fa]"
    >
      {{ content.heading }}
    </h1>

    <!-- Core tools: one framed card each, everything visible at once -->
    <ul class="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-5">
      <li v-for="(tool, i) in content.items" :key="tool.name" class="flex">
        <UiFrame
          tag="article"
          :label="tool.name"
          :index="String(i + 1).padStart(2, '0')"
          class="flex w-full flex-col"
        >
          <div class="flex flex-1 flex-col gap-3 p-[clamp(20px,2vw,28px)]">
            <Icon :name="tool.icon" size="40" aria-hidden="true" />
            <h2 class="mt-2 text-[21px] font-black tracking-[-0.02em] text-[#f4f7fa] md:text-2xl">
              {{ tool.label || tool.name }}
            </h2>
            <p class="leading-relaxed">{{ tool.description }}</p>
          </div>
        </UiFrame>
      </li>
    </ul>

    <!-- Also comfortable with -->
    <div class="mt-12 border-t border-primary-gold/20 pt-8 md:mt-14 md:pt-10">
      <p class="eyebrow mb-4">{{ content.alsoComfortableLabel }}</p>
      <ul class="flex flex-wrap gap-2">
        <li v-for="tech in content.alsoComfortable" :key="tech" class="chip">
          {{ tech }}
        </li>
      </ul>
    </div>
  </section>
</template>
