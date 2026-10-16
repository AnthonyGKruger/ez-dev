<script setup lang="ts">
const skills = useContent("skills");
const site = useContent("site");
const stack = computed(() => site.value.home.stack);
</script>

<template>
  <section
    aria-labelledby="stack-title"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,7vw,100px)]"
  >
    <div
      class="frame grid gap-4 px-[clamp(20px,2.6vw,36px)] py-[clamp(24px,2.4vw,32px)] min-[900px]:grid-cols-[200px_minmax(0,1fr)] min-[900px]:items-start min-[900px]:gap-10"
    >
      <div>
        <p class="eyebrow mb-2">{{ stack.eyebrow }}</p>
        <h2
          id="stack-title"
          class="text-[22px] leading-tight font-black tracking-[-0.02em] text-[#f4f7fa] md:text-[26px]"
        >
          {{ stack.title }}
        </h2>
      </div>

      <div class="flex flex-col gap-5">
        <ul class="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
          <li
            v-for="tool in skills.items"
            :key="tool.name"
            class="chip min-h-11 border-primary-gold/55 px-3 text-sm sm:px-4.5 text-[#f4f7fa] md:min-h-12"
          >
            <Icon :name="tool.icon" size="22" aria-hidden="true" />
            {{ tool.label || tool.name }}
          </li>
        </ul>

        <div class="flex flex-col gap-2.5 min-[900px]:flex-row min-[900px]:items-start min-[900px]:gap-4">
          <p
            class="mono flex-none text-[10px] tracking-[0.14em] text-primary-gold uppercase min-[900px]:pt-2.5 md:text-[11px]"
          >
            {{ stack.alsoLabel }}
          </p>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tech in skills.alsoComfortable" :key="tech" class="chip">
              {{ tech }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
