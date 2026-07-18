<script setup lang="ts">
import { Form } from "@primevue/forms";
import InputText from "~/src/volt/InputText.vue";
import Message from "~/src/volt/Message.vue";
import Textarea from "~/src/volt/Textarea.vue";
import Toast from "~/src/volt/Toast.vue";
import Button from "~/src/volt/Button.vue";
import * as z from "zod";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms/form";
import { useTranslate } from "#imports";
import { useToast } from "primevue/usetoast";

const config = useRuntimeConfig();
const { trackFormSubmit, trackFormVerification } = useGtm();
const { t } = useTranslate();
const toast = useToast();

const site = useContent("site");
const contact = computed(() => site.value.contact);

const siteKey = computed(() => config.public.turnstileSiteKey as string);
const turnstileToken = ref<string | null>(null);
const turnstileWidgetId = ref<string | null>(null);
const loading = ref<boolean>(false);

const waitForTurnstile = () =>
  new Promise<void>((resolve, reject) => {
    if (import.meta.server) return resolve();
    const start = Date.now();
    const timeoutMs = 8000;
    const tick = () => {
      if (typeof (window as any).turnstile !== "undefined") return resolve();
      if (Date.now() - start > timeoutMs)
        return reject(new Error("Turnstile script failed to load in time."));
      setTimeout(tick, 500);
    };
    tick();
  });

onMounted(async () => {
  if (!siteKey.value) return;
  useHead({
    script: [
      {
        key: "cf-turnstile-api",
        src: "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
        async: true,
        defer: true,
      },
    ],
  });
  try {
    await waitForTurnstile();
  } catch (e) {
    console.warn(e);
    return;
  }
  try {
    // Explicit rendering ignores data-* attributes on the container, so
    // action/theme/size must be passed here. The server verify checks the
    // token's action against "contact" — without it every submit fails
    // with action_mismatch.
    turnstileWidgetId.value = (window as any).turnstile.render(
      "#turnstile-container",
      {
        sitekey: siteKey.value,
        action: "contact",
        theme: "dark",
        size: "normal",
        callback: (t: string) => { turnstileToken.value = t; },
        "expired-callback": () => { turnstileToken.value = null; },
        "error-callback": () => { turnstileToken.value = null; },
      },
    );
  } catch (e) {
    console.error("Failed to render Turnstile:", e);
  }
});

onUnmounted(() => {
  try {
    if (turnstileWidgetId.value && (window as any).turnstile?.remove) {
      (window as any).turnstile.remove(turnstileWidgetId.value);
    }
  } catch {}
});

const initialValues = reactive({
  from_name: "",
  company: "",
  comments: "",
  reply_to: "",
});

const resolver = zodResolver(
  z.object({
    from_name: z.string().nonempty({ message: "contact-error-name-invalid" }).min(2, { message: "contact-error-name-too-short" }).max(20, { message: "contact-error-name-too-long" }).refine((value) => /^(?:[\p{L}\p{M}]+(?:[-''][\p{L}\p{M}]+)*)(?:\s+[\p{L}\p{M}]+(?:[-''][\p{L}\p{M}]+)*){0,2}$/u.test(value), { message: "contact-error-name-invalid" }),
    company: z.string().nonempty({ message: "contact-error-company-required" }).min(2, { message: "contact-error-company-too-short" }).max(30, { message: "contact-error-company-too-long" }).refine((value) => new RegExp("^(?=.*[A-Za-z0-9])[A-Za-z0-9 &''.,\\-\\/+()]+$").test(value), { message: "contact-error-company-invalid" }),
    comments: z.string().nonempty({ message: "contact-error-comments-required" }).min(2, { message: "contact-error-comments-too-short" }).max(200, { message: "contact-error-comments-too-long" }).refine((value) => /^[\p{L}\p{M}\p{N} \t\r\n.,:;!?"'()\-_/&@#%+*]{2,200}$/u.test(value), { message: "contact-error-comments-invalid" }),
    reply_to: z.email({ message: "contact-error-email-invalid" }).nonempty(),
  }),
);

const onFormSubmit = async (submitEvent?: FormSubmitEvent) => {
  const { valid, values } = submitEvent as FormSubmitEvent;
  if (!valid) return;

  let token: string | null = turnstileToken.value;
  if (import.meta.client && !token) {
    const hidden = document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null;
    token = hidden?.value || null;
  }
  if (!token) {
    toast.add({ severity: "warn", summary: t("contact-verification-required"), life: 5000 });
    return;
  }

  loading.value = true;
  try {
    const verification: any = await $fetch("/api/turnstile-verify", {
      method: "POST",
      body: { token, expectedAction: "contact", expectedHostname: import.meta.client ? location.hostname : undefined },
    });

    if (!verification?.success) {
      trackFormVerification(false);
      toast.add({ severity: "error", summary: t("contact-verification-failed"), life: 5000 });
      return;
    }

    const data: EmailJSResponseStatus = await emailjs.send(
      "ezdev_smtp_service", "ezdev_contact_me", values, config.public.emailJsSecureToken as string,
    );

    if (data.status === 200) {
      toast.add({ severity: "success", summary: t("contact-email-sent-success"), life: 5000 });
      trackFormSubmit("contact-form-submit-success", true);
      if (import.meta.client) {
        sessionStorage.setItem("ezdev-contact-sent", "1");
        try { if (turnstileWidgetId.value) { (window as any).turnstile?.reset?.(turnstileWidgetId.value); } else { (window as any).turnstile?.reset?.(); } } catch {}
        turnstileToken.value = null;
      }
      navigateTo("/thank-you");
    } else {
      trackFormSubmit("contact-form-submit-failure", false);
      toast.add({ severity: "error", summary: t("contact-email-send-failed"), life: 5000 });
    }
  } catch (e) {
    console.error(e);
    toast.add({ severity: "error", summary: t("contact-email-send-failed"), life: 5000 });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="max-w-[1240px] mx-auto px-7 pt-20 pb-24">
    <!-- Section header -->
    <div class="flex items-center gap-5 mb-11">
      <div class="mono text-[13px] tracking-[.16em] text-primary-gold">
        {{ contact.eyebrow }}
      </div>
      <div class="flex-1 h-px bg-primary-gold/20"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      <!-- Left: Text + Lottie + social -->
      <div>
        <h1 class="text-[52px] font-black tracking-[-0.02em] leading-[1.05] text-[#f4f7fa]">
          {{ contact.heading }}
        </h1>
        <p class="text-lg leading-relaxed text-[oklch(78%_0.02_250)] mt-6 mb-8 max-w-[30em]">
          {{ contact.subtitle }}
        </p>
        <div class="w-[220px] h-[220px] mx-auto lg:mx-0">
          <LottiePlayer src="/lotties/ContactMe.json" height="220px" width="220px" />
        </div>
        <p class="mono text-xs tracking-[.1em] text-primary-gold mt-2 mb-3.5">
          {{ contact.reachMeAt }}
        </p>
        <div class="flex gap-3.5">
          <a
            href="https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/"
            target="_blank"
            rel="noreferrer noopener"
            class="flex items-center justify-center w-11 h-11 rounded-[10px] border border-primary-gold/30 hover:border-light-gold transition-colors duration-300"
          >
            <Icon name="skill-icons:linkedin" size="24" />
          </a>
          <a
            href="https://github.com/AnthonyGKruger"
            target="_blank"
            rel="noreferrer noopener"
            class="flex items-center justify-center w-11 h-11 rounded-[10px] border border-primary-gold/30 hover:border-light-gold transition-colors duration-300"
          >
            <Icon name="mdi:github" size="24" class="text-[#eef2f6]" />
          </a>
          <a
            href="mailto:anthony@ezdev.solutions"
            class="flex items-center justify-center w-11 h-11 rounded-[10px] border border-primary-gold/30 hover:border-light-gold transition-colors duration-300"
          >
            <Icon name="mdi:email" size="24" class="text-[#eef2f6]" />
          </a>
          <a
            href="tel:+27610340820"
            class="flex items-center justify-center w-11 h-11 rounded-[10px] border border-primary-gold/30 hover:border-light-gold transition-colors duration-300"
          >
            <Icon name="mdi:cellphone-iphone" size="24" class="text-[#eef2f6]" />
          </a>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="border border-primary-gold/30 rounded-[18px] bg-surface-bg p-8">
        <Toast />
        <Form
          id="contact-form"
          v-slot="$form"
          :initialValues
          :resolver
          @submit="onFormSubmit"
          class="flex flex-col gap-4"
        >
          <div class="flex flex-col gap-[7px]">
            <label class="mono text-xs tracking-[.06em] text-[oklch(72%_0.02_250)]">{{ contact.form.name.label }}</label>
            <InputText name="from_name" type="text" :placeholder="contact.form.name.placeholder" fluid />
            <Message v-if="$form.from_name?.invalid" severity="error" size="small" variant="simple">
              {{ t($form.from_name.error?.message || "") }}
            </Message>
          </div>
          <div class="flex flex-col gap-[7px]">
            <label class="mono text-xs tracking-[.06em] text-[oklch(72%_0.02_250)]">{{ contact.form.email.label }}</label>
            <InputText name="reply_to" type="text" :placeholder="contact.form.email.placeholder" fluid />
            <Message v-if="$form.reply_to?.invalid" severity="error" size="small" variant="simple">
              {{ t($form.reply_to.error?.message || "") }}
            </Message>
          </div>
          <div class="flex flex-col gap-[7px]">
            <label class="mono text-xs tracking-[.06em] text-[oklch(72%_0.02_250)]">{{ contact.form.company.label }}</label>
            <InputText name="company" type="text" :placeholder="contact.form.company.placeholder" fluid />
            <Message v-if="$form.company?.invalid" severity="error" size="small" variant="simple">
              {{ t($form.company.error?.message || "") }}
            </Message>
          </div>
          <div class="flex flex-col gap-[7px]">
            <label class="mono text-xs tracking-[.06em] text-[oklch(72%_0.02_250)]">{{ contact.form.details.label }}</label>
            <Textarea name="comments" type="text" :placeholder="contact.form.details.placeholder" :rows="4" fluid />
            <Message v-if="$form.comments?.invalid" severity="error" size="small" variant="simple">
              {{ t($form.comments.error?.message || "") }}
            </Message>
          </div>

          <div id="turnstile-container" class="mt-1" />

          <button
            v-if="!loading"
            type="submit"
            class="mono mt-1.5 px-3.5 py-3.5 rounded-[10px] border-none bg-primary-gold text-body-bg text-sm font-bold tracking-[.04em] cursor-pointer transition-all duration-300 hover:bg-light-gold w-full"
            :disabled="!turnstileToken"
          >
            {{ contact.form.submit }}
          </button>
          <svg
            v-if="loading"
            class="mr-3 -ml-1 size-9 animate-spin text-primary-gold self-center"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </Form>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Match the design's dark form fields regardless of color-mode */
#contact-form :deep(input),
#contact-form :deep(textarea) {
  background: var(--color-body-bg) !important;
  color: #eef2f6 !important;
  border-color: oklch(62.28% 0.083 75.89 / 0.3) !important;
  border-radius: 9px !important;
}
#contact-form :deep(input:hover),
#contact-form :deep(textarea:hover),
#contact-form :deep(input:focus),
#contact-form :deep(textarea:focus) {
  border-color: var(--color-primary-gold) !important;
}
#contact-form :deep(input::placeholder),
#contact-form :deep(textarea::placeholder) {
  color: oklch(60% 0.02 250) !important;
}
</style>
