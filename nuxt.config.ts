import tailwindcss from "@tailwindcss/vite";

// DEV_CLEAN_UI=true (in .env) hides the Nuxt DevTools panel and the Nuxt
// Studio dev editor — both persist/re-mount across refreshes, which gets in
// the way when testing the UI (e.g. mobile inspection). Flip it off to get
// the tools back.
const cleanDevUi = process.env.DEV_CLEAN_UI === "true";

export default defineNuxtConfig({
  runtimeConfig: {
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "",
    public: {
      gtmId: process.env.NUXT_PUBLIC_GTM_ID || "",
      emailJsSecureToken: process.env.NUXT_PUBLIC_EMAIL_JS_SECURE_TOKEN || "",
      linkedInUrl: "",
      githubUrl: "",
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL || "https://www.ezdev.solutions",
      siteName: "EZdev Solutions - Anthony Gordon Kruger's Portfolio",
      siteDescription:
        "Web Developer portfolio: projects, skills, work experience, and contact.",
      siteImage: "/media/logos/ezdev-logo-white.png",
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || "",
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: !cleanDevUi },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "motion-v/nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
    // @nuxtjs/seo bundles sitemap, robots, og-image, schema-org and
    // site-config — no separate registrations needed.
    "@nuxtjs/seo",
    "@nuxtjs/google-fonts",
    "nuxt-studio",
  ],
  studio: {
    // Self-hosted Nuxt Studio editor, served at /_studio.
    // Auth (production only) needs STUDIO_GITHUB_CLIENT_ID /
    // STUDIO_GITHUB_CLIENT_SECRET — see .env.example.
    repository: {
      provider: "github",
      owner: "AnthonyGKruger",
      repo: "ez-dev",
      branch: "main",
    },
    // sync: false stops the dev editor auto-mounting on every page load;
    // controlled by DEV_CLEAN_UI (see top of file).
    development: { sync: !cleanDevUi },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // Pre-bundle everything the lazy client components import (contact
      // form, Studio dev editor). Without this Vite discovers these deps
      // mid-session, re-optimizes and reloads — and any in-flight dynamic
      // import fails with "504 Outdated Optimize Dep" / 500 while scrolling.
      include: [
        "@emailjs/browser",
        "@primevue/forms",
        "@primevue/forms/resolvers/zod",
        "@primevue/icons/times",
        "@vercel/speed-insights/vue",
        "primevue/button",
        "primevue/inputtext",
        "primevue/message",
        "primevue/textarea",
        "primevue/toast",
        "primevue/usetoast",
        "tailwind-merge",
        "unstorage",
        "unstorage/drivers/http",
        "zod",
        "nuxt-studio/app",
      ],
    },
  },
  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700, 900],
      "JetBrains+Mono": [400, 500, 700],
    },
    display: "swap",
  },
  app: {
    // Dark-only site: keep the `dark` class present so Tailwind `dark:`
    // variants and the volt components always render in dark.
    head: {
      htmlAttrs: { class: "dark" },
      // Overrides the nuxt-seo-utils default of "%s | <site.name>".
      titleTemplate: "%s • EZdev",
    },
  },
  icon: {
    mode: "svg",
    size: "2rem",
  },
  // nuxt-site-config (via @nuxtjs/seo): canonical source for the site URL —
  // sitemap, robots, schema.org and canonical links all read from here.
  // Non-production environments are automatically marked non-indexable.
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || "https://www.ezdev.solutions",
    name: "EZdev Solutions - Anthony Gordon Kruger's Portfolio",
    description:
      "Web Developer portfolio: projects, skills, work experience, and contact.",
  },
  seo: {
    meta: {
      // Site-wide og/twitter fallbacks; pages override via useSeo().
      ogImage: "/media/logos/ezdev-logo-white.png",
      twitterCard: "summary_large_image",
    },
  },
  // nuxt-schema-org reads identity from module options, not app.config.
  schemaOrg: {
    identity: {
      type: "Person",
      name: "Anthony Gordon Kruger",
      url: "https://www.ezdev.solutions",
      sameAs: [
        "https://github.com/AnthonyGKruger",
        "https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/",
      ],
      jobTitle: "Full-Stack Web Developer",
    },
  },
  sitemap: {
    defaults: {
      changefreq: "weekly",
      priority: 0.7,
    },
    // Post-submit page; noindex (see pages/thank-you/index.vue).
    exclude: ["/thank-you"],
  },
});
