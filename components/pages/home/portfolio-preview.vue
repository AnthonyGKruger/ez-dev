<script setup lang="ts">
const { labels, products, clients } = useWork();
</script>

<template>
  <section
    id="work"
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(64px,7vw,100px)]"
  >
    <div class="reveal flex items-end justify-between gap-6">
      <div>
        <p class="eyebrow mb-2.5 md:mb-3.5">{{ labels.eyebrow }}</p>
        <h2
          class="text-[length:clamp(30px,1.4vw_+_24px,44px)] leading-[1.1] font-black tracking-[-0.03em] text-[#f4f7fa]"
        >
          {{ labels.title }}
        </h2>
      </div>
      <UiButton size="sm" to="/portfolio" class="hidden sm:inline-flex">{{ labels.all }}</UiButton>
    </div>

    <!-- Our products -->
    <div class="mt-8 mb-4 flex items-center gap-4 md:mt-12 md:mb-5">
      <h3 class="mono text-xs font-bold tracking-[0.12em] text-[#f4f7fa] uppercase md:text-[13px]">
        {{ labels.products }}
      </h3>
      <span class="h-px flex-1 bg-primary-gold/20" aria-hidden="true" />
    </div>
    <ul class="grid gap-5 md:grid-cols-2 md:gap-6" data-reveal-stagger>
      <li v-for="p in products" :key="p.id">
        <PagesPortfolioProductCard :project="p" :labels="labels" />
      </li>
    </ul>

    <!-- Client work -->
    <div class="mt-10 mb-4 flex items-center gap-4 md:mt-14 md:mb-5">
      <h3 class="mono text-xs font-bold tracking-[0.12em] text-[#f4f7fa] uppercase md:text-[13px]">
        {{ labels.clients }}
      </h3>
      <span class="h-px flex-1 bg-primary-gold/20" aria-hidden="true" />
    </div>
    <ul class="grid gap-4 min-[1100px]:grid-cols-2 min-[1100px]:gap-6" data-reveal-stagger>
      <li v-for="p in clients" :key="p.id">
        <PagesPortfolioClientCard :project="p" :labels="labels" />
      </li>
    </ul>

    <!-- Phones: "All work" moves below the list, full width -->
    <UiButton size="sm" to="/portfolio" class="mt-8 flex w-full sm:hidden">{{ labels.all }}</UiButton>
  </section>
</template>
