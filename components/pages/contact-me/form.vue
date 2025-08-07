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
      .nonempty({ message: "Please enter a valid name." })
      .min(2, { message: "Your name cant be less than two characters." })
      .max(20, { message: "Names can't be longer than 20 characters." })
      .refine((value) => new RegExp("^[a-zA-Z]+$").test(value), {
        message: "Please enter a valid name.",
      }),
    company: z
      .string()
      .nonempty({ message: "Your company is required." })
      .min(2, {
        message: "Your company name cant be less than two characters.",
      })
      .max(30, {
        message: "Company names can't be longer than 30 characters.",
      })
      .refine((value) => new RegExp("^[a-zA-Z0-9]+$").test(value), {
        message: "Please enter a valid company name.",
      }),
    comments: z
      .string()
      .nonempty({ message: "Your comments are required." })
      .min(2, { message: "Your comments cant be less than two characters." })
      .max(200, { message: "Comments can't be longer than 200 characters." })
      .refine((value) => new RegExp("^[a-zA-Z0-9]+$").test(value), {
        message: "Please enter a valid comments.",
      }),
    reply_to: z.email({ message: "Please enter a valid email." }).nonempty(),
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
        addToast(
          "success",
          "Your email could not be sent. Please try again later.",
        );
        navigateTo("/thank-you");
      } else {
        addToast(
          "error",
          "Your email could not be sent. Please try again later.",
        );
      }
      console.log(data);
    } catch (e) {
      console.error(e);
      addToast(
        "error",
        "Your email could not be sent. Please try again later.",
      );
    }
  }
};
</script>

<template>
  <UiSectionDivider
    lottie-src="/lotties/contact-me-heading.json"
    subtitle="Let's Build Something Together!"
    content="Fill In The Form Below To Contact Me"
  />
  <section
    class="flex flex-col md:flex-row items-center justify-center min-h-screen"
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
        v-slot="$form"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full lg:w-3/4 text-base-priority"
      >
        <div class="flex flex-col gap-2">
          <label for="from_name">First name</label>

          <InputText
            name="from_name"
            type="text"
            placeholder="Your name."
            fluid
          />
          <Message
            v-if="$form.from_name?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.from_name.error?.message }}</Message
          >
          <label for="reply_to">Email</label>

          <InputText
            name="reply_to"
            type="text"
            placeholder="Your Email."
            fluid
          />
          <Message
            v-if="$form.reply_to?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.reply_to.error?.message }}</Message
          >
          <label for="company">Company</label>
          <InputText
            name="company"
            type="text"
            placeholder="Your Company."
            fluid
          />
          <Message
            v-if="$form.company?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.company.error?.message }}</Message
          >
          <label for="comments">Comments</label>

          <Textarea
            name="comments"
            type="text"
            placeholder="Your Comments."
            fluid
          />
          <Message
            v-if="$form.comments?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.comments.error?.message }}</Message
          >
        </div>
        <Button type="submit" label="Submit" class="w-fit" />
        <p class="text-center text-sm">
          You can also reach me through these platforms:
        </p>
        <UxSocialLinks :links="socialLinks" />
        <UxDownloadResume />
      </Form>
    </div>
  </section>
</template>
