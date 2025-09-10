<script setup lang="ts">
interface ISectionDividerProps {
  lottieSrc: string;
  subtitle?: string;
  content: string;
}
defineProps<ISectionDividerProps>();
const route = useRoute();
</script>

<template>
  <section>
    <div class="p-7 m-auto border-t border-b border-primary-gold">
      <div
        class="flex flex-col sm:flex-row mx-auto md:mx-0 justify-center items-center lg:aspect-[8/1] p-4"
      >
        <div class="md:w-max w-fit mx-auto md:mx-0 aspect-square">
          <LottiePlayer :src="lottieSrc" />
        </div>

        <div
          class="h-full w-full md:w-fit flex flex-col sm:items-start gap-3 justify-center"
        >
          <p
            v-if="!!subtitle"
            class="lg:text-md md:text-sm xl:text-md text-md font-base md:text-left text-center text-alternative-gold dark:text-light-gold"
          >
            {{ subtitle }}
          </p>
          <p
            class="dark:text-white lg:text-3xl md:text-3xl xl:text-4xl text-2xl font-bold md:text-left text-center"
          >
            {{ content }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
