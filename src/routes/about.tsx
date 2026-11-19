import { createFileRoute } from "@tanstack/react-router";
import { Button, SectionRule } from "../components/ui";
import { site, ui } from "../content";
import { Icon } from "../lib/icon";
import { seo } from "../lib/seo";

const { about } = site;

const About = () => (
  <div className="relative overflow-x-hidden bg-body-bg text-ink">
    <section className="site-container pt-20 pb-10">
      <SectionRule label={about.eyebrow} className="mb-11" />
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-6xl leading-display font-black tracking-tight text-heading">
          {about.headline}
          <br />
          <span className="text-light-gold">{about.headlineAccent}</span>
        </h1>
        {about.paragraphs.map((para, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "mt-7 text-lg leading-relaxed text-lead"
                : "mt-4 text-base leading-relaxed text-body"
            }
          >
            {para}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap gap-3.5">
          <Button to="/contact-me">{about.ctaChat}</Button>
          <Button to="/portfolio">{about.ctaWork}</Button>
        </div>
      </div>
    </section>

    <section className="site-container pb-22">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {about.factCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-primary-gold/25 bg-surface-bg p-7"
          >
            <Icon name={card.icon} size={30} className="mb-4 text-light-gold" />
            <h3 className="text-lg font-bold text-heading">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-body">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export const Route = createFileRoute("/about")({
  head: () => seo({ title: ui.pageTitles.about, path: "/about" }),
  component: About,
});
