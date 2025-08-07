<script setup lang="ts">
import { skills } from "~/assets/config/data";
</script>

<template>
  <UiSectionDivider
    :lottieSrc="
      $colorMode.value === 'dark'
        ? '/lotties/darkSkill.json'
        : '/lotties/Skill.json'
    "
    content="Some Of The Skills & Awesome Technologies I Use!"
  />
  <section class="flex flex-wrap gap-4 px-4 py-14 items-center justify-center">
    <PagesSkillsMotionCard
      v-for="(skill, idx) in skills"
      :key="skill.name"
      :scale-factor="idx"
    >
      <template #icon>
        <Icon class="!text-7xl" :name="skill.icon" />
      </template>
      <template #title>
        <span class="capitalize">{{ skill.name }}</span>
      </template>
      <template #description>
        {{ skill.description }}
      </template>
    </PagesSkillsMotionCard>
  </section>
</template>
