<script setup lang="ts">
const content = useContent("skills");

// Track which cards are flipped (tap-to-flip on touch; desktop also flips on hover)
const flipped = ref<Set<number>>(new Set());
const toggleFlip = (i: number) => {
  const next = new Set(flipped.value);
  next.has(i) ? next.delete(i) : next.add(i);
  flipped.value = next;
};
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-5">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        {{ content.eyebrow }}
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>
    <div class="flex items-end justify-between gap-6 mb-[52px] flex-wrap">
      <h1 class="text-[56px] font-black tracking-[-0.02em] text-[#f4f7fa]">
        {{ content.heading }}
      </h1>
      <p class="mono text-[13px] text-[oklch(70%_0.02_250)]">
        {{ content.flipHint }}
      </p>
    </div>

    <!-- Flip cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[18px]">
      <div
        v-for="(skill, i) in content.items"
        :key="skill.name"
        class="flip-card aspect-square cursor-pointer"
        role="button"
        tabindex="0"
        :aria-pressed="flipped.has(i)"
        :aria-label="`${skill.name}: ${skill.description}`"
        @click="toggleFlip(i)"
        @keydown.enter.prevent="toggleFlip(i)"
        @keydown.space.prevent="toggleFlip(i)"
      >
        <div class="flip-inner" :class="{ 'is-flipped': flipped.has(i) }">
          <!-- Front -->
          <div
            class="flip-face flex flex-col items-center justify-center gap-3.5 bg-surface-bg border border-primary-gold/30 rounded-2xl"
          >
            <Icon :name="skill.icon" size="60" />
            <span class="mono text-xs tracking-[.08em] uppercase text-[oklch(82%_0.02_250)]">
              {{ skill.name }}
            </span>
          </div>
          <!-- Back -->
          <div
            class="flip-face flip-back bg-primary-gold text-body-bg rounded-2xl p-5 flex items-center justify-center text-center text-sm font-medium leading-relaxed"
          >
            {{ skill.description }}
          </div>
        </div>
      </div>
    </div>

    <!-- Also comfortable with -->
    <div class="mt-14 pt-10 border-t border-primary-gold/20">
      <p class="mono text-xs tracking-[.14em] text-primary-gold mb-[22px]">
        {{ content.alsoComfortableLabel }}
      </p>
      <div class="flex gap-3 flex-wrap">
        <span
          v-for="tech in content.alsoComfortable"
          :key="tech"
          class="mono text-[13px] tracking-[.04em] px-4 py-[9px] rounded-lg bg-surface-bg text-[oklch(85%_0.02_250)] border border-primary-gold/25"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.flip-card {
  perspective: 1200px;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transform-style: preserve-3d;
}
.flip-inner.is-flipped {
  transform: rotateY(180deg);
}
/* Desktop / pointer devices: flip on hover too */
@media (hover: hover) and (pointer: fine) {
  .flip-card:hover .flip-inner {
    transform: rotateY(180deg);
  }
}
.flip-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.flip-back {
  transform: rotateY(180deg);
}
</style>
