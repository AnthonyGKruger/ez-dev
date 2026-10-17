<script setup lang="ts">
const skills = useContent("skills");
const site = useContent("site");
const stack = computed(() => site.value.home.stack);
</script>

<template>
  <section
    id="stack"
    aria-labelledby="stack-title"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,7vw,100px)]"
  >
    <div
      class="reveal frame grid gap-6 px-[clamp(20px,2.6vw,36px)] py-[clamp(24px,2.4vw,32px)] min-[900px]:grid-cols-[220px_minmax(0,1fr)] min-[900px]:gap-10"
    >
      <div>
        <p class="eyebrow mb-2">{{ stack.eyebrow }}</p>
        <h2
          id="stack-title"
          class="text-[22px] leading-tight font-black tracking-[-0.02em] text-[#f4f7fa] md:text-[26px]"
        >
          {{ stack.title }}
        </h2>
        <p class="mt-2 leading-relaxed">{{ stack.lead }}</p>
      </div>

      <!-- Capabilities: grouped so the stack backs up the services -->
      <dl class="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="group in skills.groups" :key="group.title">
          <dt
            class="mono mb-2.5 text-[10px] tracking-[0.14em] text-primary-gold uppercase md:text-[11px]"
          >
            {{ group.title }}
          </dt>
          <dd>
            <ul class="flex flex-wrap gap-2">
              <li
                v-for="item in group.items"
                :key="item"
                class="chip text-[#f4f7fa]"
              >
                {{ item }}
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
