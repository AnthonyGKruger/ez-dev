<script setup lang="ts">
const { portfolio, labels, products, clients } = useWork();

const groups = computed(() => [
  { key: "products", title: labels.value.products, items: products.value },
  { key: "clients", title: labels.value.clients, items: clients.value },
]);
</script>

<template>
  <section
    class="mx-auto max-w-[1240px] px-[clamp(16px,5vw,24px)] pt-[clamp(56px,7vw,112px)] pb-[clamp(64px,7vw,100px)]"
  >
    <p class="eyebrow mb-2.5 md:mb-3.5">{{ portfolio.eyebrow }}</p>
    <h1
      class="text-[length:clamp(40px,1.6vw_+_33px,56px)] leading-[1.04] font-black tracking-[-0.035em] text-[#f4f7fa]"
    >
      {{ portfolio.heading }}
    </h1>
    <p
      class="mt-4 max-w-[640px] text-[length:clamp(17px,0.2vw_+_16px,19px)] leading-relaxed md:mt-5"
    >
      {{ portfolio.intro }}
    </p>

    <template v-for="(group, gi) in groups" :key="group.key">
      <div
        class="mb-4 flex items-center gap-4 md:mb-5"
        :class="gi === 0 ? 'mt-10 md:mt-14' : 'mt-12 md:mt-16'"
      >
        <h2 class="mono text-xs font-bold tracking-[0.12em] text-[#f4f7fa] uppercase md:text-[13px]">
          {{ group.title }}
        </h2>
        <span class="h-px flex-1 bg-primary-gold/20" aria-hidden="true" />
        <span class="mono text-xs text-primary-gold md:text-[13px]">
          {{ String(group.items.length).padStart(2, "0") }}
        </span>
      </div>
      <ul class="grid gap-5 md:grid-cols-2 md:gap-6">
        <li v-for="p in group.items" :key="p.id">
          <PagesPortfolioProductCard
            v-if="p.kind === 'product'"
            :project="p"
            :labels="labels"
            detailed
            heading-tag="h3"
          />
          <PagesPortfolioClientCard
            v-else
            :project="p"
            :labels="labels"
            detailed
            heading-tag="h3"
          />
        </li>
      </ul>
    </template>
  </section>
</template>
