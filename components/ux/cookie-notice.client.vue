<script setup lang="ts">
import { primaryButtonPassthrough } from "~/src/passthroughs/button.passthrough";
import Button from "~/src/volt/Button.vue";

const consent = useCookie("consent", {
  default: () => false,
  watch: true,
});

const acceptCookie = () => {
  consent.value = true;
};
</script>

<template>
  <article
    v-if="!consent"
    class="text-neutral-950 dark:text-white md:w-3/4 lg:w-1/3 bg-white dark:bg-black border rounded-xl mx-4 p-2 bottom-3 fixed right-0 z-10 border-[#624111] dark:border-light-gold"
  >
    <div class="container pt-0 m-auto">
      <div class="flex justify-start items-center">
        <LottiePlayer height="5rem" width="5rem" src="lotties/Cookies.json" />
        <p class="xl:text-2xl text-xl md:pt-2 truncate text-ellipsis">
          Cookie Policy and T's & C's
        </p>
      </div>
    </div>

    <div class="p-3 border-t border-[#624111] dark:border-light-gold">
      <p class="xl:text-lg text-sm">
        This website uses cookies to improve the UI and UX. By viewing my
        portfolio, you consent to all cookies & terms and conditions in
        accordance with my
        <NuxtLink
          class="hover:text-[#624111] dark:text-light-gold duration-500 font-lightbold underline"
          to="/privacy-policy"
        >
          Privacy Policy.
        </NuxtLink>
      </p>
      <div class="pt-4">
        <Button
          :pt:root:class="`${primaryButtonPassthrough} w-full md:w-fit`"
          label="Accept"
          @click="acceptCookie"
        />
      </div>
    </div>
  </article>
</template>
