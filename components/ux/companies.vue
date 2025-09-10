<script setup lang="ts">
const { t } = useTranslate();
const companies = [
  { id: "c1", logo: "/media/logos/ds-logo.png", name: "Digital Stream" },
  { id: "c2", logo: "/media/logos/DPTS.png", name: "DPTS" },
  {
    id: "c3",
    logo: "/media/logos/mumbi-logo.png",
    name: "Mumbi Trust Administrators",
  },
  // {
  // 	id: "c4",
  // 	logo: "/media/logos/Mumbi_Financial_Services_Pty_Logo-removebg-preview.png",
  // 	name: "Mumbi Financial Services",
  // },
  { id: "c5", logo: "/media/logos/av-logo.png", name: "Addventures" },
];
</script>

<template>
  <section
    class="flex flex-col w-full gap-2 bg-white dark:bg-transparent border-y border-primary-gold py-9 lg:py-28"
  >
    <h2
      class="text-center text-primary-blue dark:text-white font-extrabold text-xl md:text-3xl py-9"
    >
      {{ t("companies-heading") }}
    </h2>
    <div class="flex flex-wrap gap-6 justify-center items-center">
      <NuxtImg
        v-for="company in companies"
        :key="company.id"
        :src="company.logo"
        :class="[
          `grayscale dark:grayscale-0 hover:grayscale-0 opacity-50 hover:opacity-100
            object-contain hover:scale-125 transition-all duration-300 w-1/3 md:w-1/5`,
          {
            'dark:invert': company.name === 'Addventures',
          },
        ]"
      />
    </div>
  </section>
</template>

<style scoped></style>
