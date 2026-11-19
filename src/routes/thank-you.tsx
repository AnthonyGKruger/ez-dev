import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { SENT_FLAG } from "../components/ContactForm";
import { Button, Lottie } from "../components/ui";
import { site, ui } from "../content";
import { seo } from "../lib/seo";

const { thankYou } = site;

const ThankYou = () => {
  const navigate = useNavigate();

  // Only reachable straight after sending the form; otherwise go home.
  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SENT_FLAG)) {
        navigate({ to: "/", replace: true });
        return;
      }
      sessionStorage.removeItem(SENT_FLAG);
    } catch {
      navigate({ to: "/", replace: true });
    }
  }, [navigate]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-7 py-20">
      <div className="max-w-2xl text-center">
        <Lottie src="/lotties/ContactMe.json" size="200px" className="mx-auto mb-2" />
        <p className="eyebrow mb-4">{thankYou.eyebrow}</p>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-heading">
          {thankYou.heading}
        </h1>
        <p className="mt-5 mb-9 text-lg leading-relaxed text-lead">
          {thankYou.message}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button to="/">{thankYou.ctaHome}</Button>
          <Button to="/portfolio">{thankYou.ctaWork}</Button>
        </div>
      </div>
    </section>
  );
};

export const Route = createFileRoute("/thank-you")({
  head: () =>
    seo({
      title: ui.pageTitles.thankYou,
      description: ui.pageDescriptions.thankYou,
      path: "/thank-you",
      noindex: true,
    }),
  component: ThankYou,
});
