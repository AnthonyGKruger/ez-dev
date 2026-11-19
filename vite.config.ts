import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

const SITE_URL = process.env.SITE_URL || "https://www.ezdev.solutions";

export default defineConfig({
  // NUXT_PUBLIC_* keeps the env vars already set on Vercel working
  // (GTM ID, EmailJS key, Turnstile site key). New ones can use VITE_*.
  envPrefix: ["VITE_", "NUXT_PUBLIC_"],
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Every page is static: render them all to HTML at build time.
      // Only /api/turnstile-verify runs on the server per request.
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      sitemap: { enabled: true, host: SITE_URL },
      pages: [
        // Post-submit page; noindex and kept out of the sitemap.
        { path: "/thank-you", sitemap: { exclude: true } },
      ],
    }),
    nitro({
      routeRules: {
        // Old links: the brief linked /contact, the Languages page was
        // removed when the site went English-only, and /skills was folded
        // into the home page's stack section.
        "/contact": { redirect: { to: "/contact-me", status: 302 } },
        "/languages": { redirect: { to: "/about", status: 301 } },
        "/skills": { redirect: { to: "/#stack", status: 301 } },
      },
    }),
    viteReact(),
  ],
});
