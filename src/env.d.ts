/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NUXT_PUBLIC_SITE_URL?: string;
  readonly NUXT_PUBLIC_GTM_ID?: string;
  readonly NUXT_PUBLIC_EMAIL_JS_SECURE_TOKEN?: string;
  readonly NUXT_PUBLIC_TURNSTILE_SITE_KEY?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_TURNSTILE_SITE_KEY?: string;
}
