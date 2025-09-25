<script setup lang="ts">
import { Form } from "@primevue/forms";
import InputText from "~/src/volt/InputText.vue";
import Message from "~/src/volt/Message.vue";
import Textarea from "~/src/volt/Textarea.vue";
import Toast from "~/src/volt/Toast.vue";
import Button from "~/src/volt/Button.vue";
import * as z from "zod";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { addToast } from "~/lib/toast";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { FormSubmitEvent } from "@primevue/forms/form";
import { useTranslate } from "#imports";

const { $gtm } = useNuxtApp();
const { t } = useTranslate();
const config = useRuntimeConfig();

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
      .refine((value) => new RegExp("^[a-zA-Z]+$").test(value), {
        message: "contact-error-name-invalid",
      }),
    company: z
      .string()
      .nonempty({ message: "contact-error-company-required" })
      .min(2, {
        message: "contact-error-company-too-short",
      })
      .max(30, {
        message: "contact-error-company-too-long",
      })
      .refine((value) => new RegExp("^[a-zA-Z0-9]+$").test(value), {
        message: "contact-error-company-invalid",
      }),
    comments: z
      .string()
      .nonempty({ message: "contact-error-comments-required" })
      .min(2, { message: "contact-error-comments-too-short" })
      .max(200, { message: "contact-error-comments-too-long" })
      .refine((value) => new RegExp("^[a-zA-Z0-9]+$").test(value), {
        message: "contact-error-comments-invalid",
      }),
    reply_to: z.email({ message: "contact-error-email-invalid" }).nonempty(),
  }),
);

const onFormSubmit = async (submitEvent: FormSubmitEvent) => {
  const { valid, values } = submitEvent;
  if (valid) {
    try {
      const data: EmailJSResponseStatus = await emailjs.send(
        "ezdev_smtp_service",
        "ezdev_contact_me",
        values,
        config.public.emailJsSecureToken as string,
      );
      if (data.status === 200) {
        addToast("success", t("contact-email-sent-success"));
        $gtm.pushEvent({
          event: "contact-form-submit",
          category: "forms",
          action: "submit",
          label: "contact-form-submit-success",
          value: 1,
        });
        navigateTo("/thank-you");
      } else {
        $gtm.pushEvent({
          event: "contact-form-submit",
          category: "forms",
          action: "submit",
          label: "contact-form-submit-failure" + "",
          value: 1,
        });
        addToast("error", t("contact-email-send-failed"));
      }
      console.log(data);
    } catch (e) {
      console.error(e);
      addToast("error", t("contact-email-send-failed"));
    }
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
        <Button type="submit" :label="t('contact-submit')" class="w-fit" />
        <p class="text-center text-lg text-base-priority">
          {{ t("contact-socials-text") }}
        </p>
        <UxSocialLinks :links="socialLinks" />
        <UxDownloadResume />
      </Form>
    </div>
  </section>
</template>
