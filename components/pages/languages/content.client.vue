<script setup lang="ts">
const { t } = useTranslate();
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/Language.json"
    :content="t('languages-i-am-fluent-in')"
    :subtitle="t('keep-up-with-the-lingo')"
  />
  <article class="py-28 bg-alternative-blue dark:bg-transparent">
    <div
      class="flex w-[50%] mx-auto bg-alternative-blue dark:bg-transparent flex-col sm:flex-row"
    >
      <div class="inline w-full lg:w-[50%] text-center">
        <div
          class="text-light-gold text-xl flex flex-col items-center justify-center"
        >
          <LottiePlayer
            src="/lotties/EnglishFlag.json"
            height="100px"
            width="100px"
          />
          <span>{{ t('language-english') }}</span>
        </div>
      </div>
      <div class="inline w-full lg:w-[50%] text-center">
        <div
          class="text-light-gold text-xl flex flex-col items-center justify-center"
        >
          <LottiePlayer
            src="/lotties/SouthAfricanFlag.json"
            height="100px"
            width="100px"
          />
          <span>{{ t('language-afrikaans') }}</span>
        </div>
      </div>
    </div>
  </article>
</template>
