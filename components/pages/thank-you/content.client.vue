<script setup lang="ts">
const { t } = useTranslate();
const lottieDimensions = 400;
</script>

<template>
  <div class="container mx-auto px-4 py-14">
    <div class="flex justify-center mb-8">
      <LottiePlayer
        src="/lotties/ThankYou.json"
        :loop="true"
        :autoplay="true"
        :style="{
          width: `${lottieDimensions}px`,
          height: `${lottieDimensions}px`,
        }"
      />
    </div>

    <article class="text-center text-base-priority dark:text-white">
      <p class="md:text-4xl text-3xl font-bold mb-6">
        {{ t("thank-you-awesome") }}
      </p>
      <p class="text-2xl md:px-20 px-5 lg:py-9 py-4 leading-relaxed">
        {{ t("thank-you-message") }}
      </p>
    </article>
  </div>
</template>
