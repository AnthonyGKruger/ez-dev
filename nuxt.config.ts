import tailwindcss from "@tailwindcss/vite";

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
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/scripts",
    "motion-v/nuxt",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/google-fonts",
  ],
  vite: {
    plugins: [tailwindcss()],
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
    },
  },
  icon: {
    mode: "svg",
    size: "2rem",
  },
  seo: {
    meta: {
      titleTemplate: "%s • EZdev",
    },
    og: {
      host: process.env.NUXT_PUBLIC_SITE_URL,
      image: { url: "/logos/ezdev-logo-black.png" },
    },
    twitter: { card: "/logos/ezdev-logo-black.png" },
  },
  sitemap: {
    siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaults: {
      changefreq: "weekly",
      priority: 0.7,
    },
  },
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: process.env.NODE_ENV === "production" ? "" : "/",
    },
    sitemap: ["/sitemap.xml"],
  },
});
