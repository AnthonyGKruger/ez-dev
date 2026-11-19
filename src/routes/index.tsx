import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/home/Hero";
import {
  AboutPreview,
  CompaniesStrip,
  ContactCta,
  Services,
  Stack,
  WorkPreview,
} from "../components/home/Sections";
import { ui } from "../content";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { seo } from "../lib/seo";

const Home = () => {
  useScrollReveal();
  return (
    <>
      <Hero />
      <CompaniesStrip />
      <WorkPreview />
      <Services />
      <AboutPreview />
      <Stack />
      <ContactCta />
    </>
  );
};

export const Route = createFileRoute("/")({
  head: () => seo({ title: ui.pageTitles.home, path: "/", rawTitle: true }),
  component: Home,
});
