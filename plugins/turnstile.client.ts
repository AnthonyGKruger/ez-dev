import { useHead } from "#imports";

export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  useHead({
    script: [
      {
        key: "cf-turnstile-api",
        src: "https://challenges.cloudflare.com/turnstile/v0/api.js",
        async: true,
        defer: true,
      },
    ],
  });
});
