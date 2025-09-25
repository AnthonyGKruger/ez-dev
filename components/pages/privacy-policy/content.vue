<script setup lang="ts">
const { t } = useTranslate();
</script>

<template>
  <div>
    <UiSectionDivider
      lottie-src="/lotties/key-lock.json"
      :subtitle="t('privacy-subtitle')"
      :content="t('privacy-title')"
    />

    <article
      class="2xl:max-w-7xl xl:max-w-4xl max-w-2xl mx-auto px-5 py-9 text-base-priority dark:text-white"
    >
      <p class="text-xl mb-6">
        {{ t("privacy-intro") }}
      </p>

      <p class="text-xl font-semibold mb-3">{{ t("privacy-topics-title") }}</p>

      <ul class="list-disc pl-8 mb-6">
        <li>
          <NuxtLink
            to="#what"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-what-info") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="#how"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-how-use") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="#information"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-access") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="#cookies"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-cookies") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="#other"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-other-sites") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="#review"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-policy-changes") }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="#contact"
            class="hover:text-primary-gold transition duration-300"
          >
            {{ t("privacy-contact-us") }}
          </NuxtLink>
        </li>
      </ul>

      <p id="what" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-what-info") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-what-info-content") }}
      </p>

      <p id="how" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-how-use") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-how-use-content") }}
      </p>

      <p id="use" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-use-info-title") }}
      </p>

      <ul class="list-disc pl-8 mb-6">
        <li>{{ t("privacy-use-contact") }}</li>
        <li>{{ t("privacy-use-monitor") }}</li>
      </ul>

      <p class="mb-6">
        {{ t("privacy-contact-change") }}
      </p>

      <p id="information" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-access") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-access-content") }}
      </p>

      <p id="cookies" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-cookies") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-cookies-content") }}
      </p>

      <p id="other" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-other-sites") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-other-sites-content") }}
      </p>

      <p id="review" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-policy-changes") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-changes-content") }}
      </p>

      <p id="contact" class="text-xl font-semibold text-primary-gold">
        {{ t("privacy-contact-us") }}
      </p>
      <p class="mb-6">
        {{ t("privacy-contact-content") }}
      </p>

      <p class="hover:text-primary-gold transition duration-300">
        <NuxtLink to="mailto:anthony@ezdev.solutions">
          {{ t("privacy-email-label") }}
        </NuxtLink>
      </p>
    </article>
  </div>
</template>
