<script setup lang="ts">
const content = useContent("privacy");
</script>

<template>
  <section class="max-w-[820px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        {{ content.eyebrow }}
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <h1 class="text-[48px] font-black tracking-[-0.02em] text-[#f4f7fa]">
      {{ content.heading }}
    </h1>
    <p class="text-base leading-relaxed text-[oklch(80%_0.02_250)] mt-6 mb-2">
      {{ content.intro }}
    </p>
    <p class="mono text-xs tracking-[.06em] text-[oklch(62%_0.02_250)] mb-10">
      {{ content.lastUpdated }}
    </p>

    <div class="flex flex-col gap-8">
      <div
        v-for="topic in content.topics"
        :key="topic.num"
        class="border-l-2 border-primary-gold/50 pl-[22px]"
      >
        <div class="flex items-baseline gap-3">
          <span class="mono text-[13px] text-primary-gold">{{ topic.num }}</span>
          <h2 class="text-[22px] font-bold text-[#f4f7fa]">{{ topic.title }}</h2>
        </div>
        <p class="text-[15px] leading-relaxed text-[oklch(78%_0.02_250)] mt-3">
          {{ topic.body }}
        </p>
      </div>
    </div>

    <div
      class="mt-10 p-6 border border-primary-gold/30 rounded-2xl bg-surface-bg"
    >
      <p class="mono text-xs tracking-[.1em] text-primary-gold mb-2">
        {{ content.contact.label }}
      </p>
      <p class="text-[15px] leading-relaxed text-[oklch(80%_0.02_250)]">
        {{ content.contact.text }}
        <a
          :href="`mailto:${content.contact.email}`"
          class="text-light-gold"
        >{{ content.contact.email }}</a>.
      </p>
    </div>
  </section>
</template>
