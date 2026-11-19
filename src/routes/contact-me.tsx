import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../components/ContactForm";
import { ui } from "../content";
import { seo } from "../lib/seo";

export const Route = createFileRoute("/contact-me")({
  head: () =>
    seo({
      title: ui.pageTitles.contact,
      description: ui.pageDescriptions.contact,
      path: "/contact-me",
    }),
  component: ContactForm,
});
