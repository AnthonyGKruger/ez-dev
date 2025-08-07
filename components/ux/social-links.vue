<script setup lang="ts">
withDefaults(
  defineProps<{
    links: {
      name: string;
      to: string;
      isIcon?: boolean;
      isExternal?: boolean;
    }[];
  }>(),
  {
    links: {
      isIcon: false,
      isExternal: false,
    },
  },
);
</script>

<template>
  <div class="justify-center sm:flex pt-10">
    <div class="space-y-6 cursor-pointer">
      <ul
        class="flex flex-wrap items-center gap-4 text-sm 2xl:text-xl sm:text-base justify-center"
      >
        <li v-for="link in links" :key="link.to + link.name">
          <NuxtLink
            v-if="link.isIcon && link.isExternal"
            :to="link.to"
            target="_blank"
            ><Icon
              :name="link.name"
              class="hover:!text-primary-gold transition duration-500"
            />
          </NuxtLink>
          <NuxtLink v-else-if="link.isIcon" :to="link.to">
            <Icon
              :name="link.name"
              class="hover:!text-primary-gold transition duration-500"
            />
          </NuxtLink>
          <NuxtLink
            v-else
            :to="link.to"
            class="hover:text-light-gold dark:hover:text-primary-gold duration-500"
            >{{ link.name }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>
