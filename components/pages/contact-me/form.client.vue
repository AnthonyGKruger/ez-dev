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

const siteKey = computed(() => config.public.turnstileSiteKey as string);
const turnstileToken = ref<string | null>(null);

const turnstileWidgetId = ref<string | null>(null);

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

  // Render the widget explicitly when the API is ready
  try {
    turnstileWidgetId.value = (window as any).turnstile.render(
      "#turnstile-container",
      {
        sitekey: siteKey.value,
        callback: (t: string) => {
          turnstileToken.value = t;
        },
        "expired-callback": () => {
          turnstileToken.value = null;
        },
        "error-callback": () => {
          turnstileToken.value = null;
        },
      },
    );

    // After render, try to read current token and check expiry
    if (turnstileWidgetId.value) {
      const token = (window as any).turnstile.getResponse(
        turnstileWidgetId.value,
      );
      const isExpired = (window as any).turnstile.isExpired(
        turnstileWidgetId.value,
      );
      if (isExpired) {
        turnstileToken.value = null;
        // Reset/execute only if invisible style requires it
        try {
          (window as any).turnstile.reset(turnstileWidgetId.value);
          (window as any).turnstile.execute?.(turnstileWidgetId.value);
        } catch {}
      } else if (token) {
        turnstileToken.value = token;
      }
    }
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

const loading = ref<boolean>(false);

const socialLinks = [
  {
    to: "https://www.linkedin.com/in/anthony-gordon-kruger-ezdev/",
    name: "skill-icons:linkedin",
    isIcon: true,
    isExternal: true,
  },
  {
    to: "https://github.com/AnthonyGKruger",
    name: "skill-icons:github-dark",
    isIcon: true,
    isExternal: true,
  },
  {
    to: "mailto:anthony@ezdev.solutions",
    name: "mdi:email",
    isIcon: true,
    isExternal: true,
  },
  {
    to: "tel:+27610340820",
    name: "mdi:cellphone-iphone",
    isIcon: true,
    isExternal: true,
  },
];

const initialValues = reactive({
  from_name: "",
  company: "",
  comments: "",
  reply_to: "",
});

const resolver = zodResolver(
  z.object({
    from_name: z
      .string()
      .nonempty({ message: "contact-error-name-invalid" })
      .min(2, { message: "contact-error-name-too-short" })
      .max(20, { message: "contact-error-name-too-long" })
      .refine(
        (value) =>
          /^(?:[\p{L}\p{M}]+(?:[-'’][\p{L}\p{M}]+)*)(?:\s+[\p{L}\p{M}]+(?:[-'’][\p{L}\p{M}]+)*){0,2}$/u.test(
            value,
          ),
        {
          message: "contact-error-name-invalid",
        },
      ),
    company: z
      .string()
      .nonempty({ message: "contact-error-company-required" })
      .min(2, {
        message: "contact-error-company-too-short",
      })
      .max(30, {
        message: "contact-error-company-too-long",
      })
      .refine(
        (value) =>
          new RegExp("^(?=.*[A-Za-z0-9])[A-Za-z0-9 &'’.,\\-\\/+()]+$").test(
            value,
          ),
        {
          message: "contact-error-company-invalid",
        },
      ),
    comments: z
      .string()
      .nonempty({ message: "contact-error-comments-required" })
      .min(2, { message: "contact-error-comments-too-short" })
      .max(200, { message: "contact-error-comments-too-long" })
      .refine(
        (value) =>
          /^[\p{L}\p{M}\p{N} \t\r\n.,:;!?"'()\-_/&@#%+*]{2,200}$/u.test(value),
        {
          message: "contact-error-comments-invalid",
        },
      ),
    reply_to: z.email({ message: "contact-error-email-invalid" }).nonempty(),
  }),
);

const onFormSubmit = async (submitEvent?: FormSubmitEvent) => {
  const { valid, values } = submitEvent as FormSubmitEvent;
  if (!valid) return;

  let token: string | null = turnstileToken.value;
  if (import.meta.client && !token) {
    const hidden = document.querySelector(
      'input[name="cf-turnstile-response"]',
    ) as HTMLInputElement | null;
    token = hidden?.value || null;
  }
  if (!token) {
    toast.add({
      severity: "warn",
      summary: "Please complete the verification.",
      life: 5000,
    });
    return;
  }

  loading.value = true;
  try {
    const verification: any = await $fetch("/api/turnstile-verify", {
      method: "POST",
      body: {
        token,
        expectedAction: "contact",
        expectedHostname: import.meta.client ? location.hostname : undefined,
      },
    });

    if (!verification?.success) {
      trackFormVerification(false);
      toast.add({
        severity: "error",
        summary: "Invisible verification failed.",
        life: 5000,
      });
      return;
    }

    const data: EmailJSResponseStatus = await emailjs.send(
      "ezdev_smtp_service",
      "ezdev_contact_me",
      values,
      config.public.emailJsSecureToken as string,
    );

    if (data.status === 200) {
      toast.add({
        severity: "success",
        summary: t("contact-email-sent-success"),
        detail: t("contact-email-sent-success-detail"),
        life: 5000,
      });
      trackFormSubmit("contact-form-submit-success", true);
      if (import.meta.client) {
        sessionStorage.setItem("ezdev-contact-sent", "1");
        try {
          if (turnstileWidgetId.value) {
            (window as any).turnstile?.reset?.(turnstileWidgetId.value);
          } else {
            (window as any).turnstile?.reset?.();
          }
        } catch {}
        turnstileToken.value = null;
      }
      navigateTo("/thank-you");
    } else {
      trackFormSubmit("contact-form-submit-failure", false);
      toast.add({
        severity: "error",
        summary: t("contact-email-send-failed"),
        life: 5000,
      });
    }
  } catch (e) {
    console.error(e);
    toast.add({
      severity: "error",
      summary: t("contact-email-send-failed"),
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/contact-me-heading.json"
    :subtitle="t('contact-subtitle')"
    :content="t('contact-content')"
  />
  <section
    class="flex flex-col md:flex-row items-center justify-center min-h-screen text-base-priority"
  >
    <div class="w-full h-full flex items-center justify-center">
      <LottiePlayer
        src="/lotties/ContactMe.json"
        height="20rem"
        width="20rem"
      />
    </div>
    <div class="w-full h-full p-2">
      <Toast />
      <Form
        id="contact-form"
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full lg:w-3/4 text-base-priority"
      >
        <div class="flex flex-col gap-2">
          <label for="from_name">{{ t("contact-first-name-label") }}</label>
          <InputText
            name="from_name"
            type="text"
            :placeholder="t('contact-first-name-placeholder')"
            fluid
          />
          <Message
            v-if="$form.from_name?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ t($form.from_name.error?.message || "") }}</Message
          >
          <label for="reply_to">{{ t("contact-email-label") }}</label>

          <InputText
            name="reply_to"
            type="text"
            :placeholder="t('contact-email-placeholder')"
            fluid
          />
          <Message
            v-if="$form.reply_to?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ t($form.reply_to.error?.message || "") }}</Message
          >
          <label for="company">{{ t("contact-company-label") }}</label>
          <InputText
            name="company"
            type="text"
            :placeholder="t('contact-company-placeholder')"
            fluid
          />
          <Message
            v-if="$form.company?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ t($form.company.error?.message || "") }}</Message
          >
          <label for="comments">{{ t("contact-comments-label") }}</label>
          <Textarea
            name="comments"
            type="text"
            :placeholder="t('contact-comments-placeholder')"
            fluid
          />
          <Message
            v-if="$form.comments?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ t($form.comments.error?.message || "") }}</Message
          >
        </div>
        <div
          id="turnstile-container"
          :data-sitekey="siteKey"
          :data-theme="$colorMode.preference"
          data-size="normal"
          data-action="contact"
        />
        <Button
          v-if="!loading"
          type="submit"
          class="w-fit"
          :disabled="!turnstileToken"
          :label="t('contact-submit')"
        />
        <svg
          v-if="loading"
          class="mr-3 -ml-1 size-9 animate-spin text-primary-gold"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p class="text-center text-lg text-base-priority">
          {{ t("contact-socials-text") }}
        </p>
        <UxSocialLinks :links="socialLinks" />
        <UxDownloadResume />
      </Form>
    </div>
  </section>
</template>
