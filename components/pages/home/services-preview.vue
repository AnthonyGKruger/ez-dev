<script setup lang="ts">
const site = useContent("site");
const services = computed(() => site.value.home.services);
</script>

<template>
  <section
    id="services"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,8vw,120px)]"
  >
    <div class="reveal">
      <p class="eyebrow mb-2.5 md:mb-3.5">{{ services.eyebrow }}</p>
      <h2
      class="mb-7 text-[length:clamp(30px,1.4vw_+_24px,44px)] leading-[1.1] font-black tracking-[-0.03em] text-[#f4f7fa] md:mb-12"
    >
      {{ services.title }}
      </h2>
    </div>

    <ul class="grid gap-4 min-[720px]:grid-cols-3 min-[720px]:gap-5" data-reveal-stagger>
      <li v-for="(item, i) in services.items" :key="item.slug" class="flex">
        <UiFrame
          :label="item.slug"
          :index="String(i + 1).padStart(2, '0')"
          class="flex w-full flex-col"
        >
          <div
            class="flex flex-1 flex-col gap-2 p-5 md:min-h-[230px] md:gap-3.5 md:px-7 md:pt-8 md:pb-7.5"
          >
            <h3
              class="text-[21px] font-black tracking-[-0.02em] text-[#f4f7fa] md:text-2xl"
            >
              {{ item.title }}
            </h3>
            <p class="leading-relaxed">{{ item.body }}</p>
            <NuxtLink
              to="#work"
              class="mono mt-auto inline-flex min-h-11 items-center self-start pt-3 text-[10px] tracking-[0.08em] text-light-gold uppercase hover:text-[#f4f7fa] md:text-[11px]"
            >
              <span>{{ item.proof }}<span aria-hidden="true">&nbsp;→</span></span>
            </NuxtLink>
          </div>
        </UiFrame>
      </li>
    </ul>
  </section>
</template>
