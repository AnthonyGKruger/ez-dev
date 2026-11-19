import { createFileRoute } from "@tanstack/react-router";
import { SectionRule } from "../components/ui";
import { qualifications as content, ui } from "../content";
import { Icon } from "../lib/icon";
import { seo } from "../lib/seo";

const Qualifications = () => (
  <section className="mx-auto max-w-5xl px-7 pt-20 pb-24">
    <SectionRule label={content.eyebrow} className="mb-5" />
    <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-heading">{content.heading}</h1>
      <p className="mono text-sm text-subtle">{content.tagline}</p>
    </div>

    <div className="mb-8 flex flex-wrap items-center gap-7 rounded-2xl border border-primary-gold/50 bg-surface-bg p-8">
      <Icon name="mdi:school" size={56} className="flex-shrink-0 text-light-gold" />
      <div className="min-w-60 flex-1">
        <p className="mono mb-1.5 text-xs tracking-widest text-primary-gold">
          {content.featured.period}
        </p>
        <h2 className="text-2xl font-bold text-heading">
          {content.featured.title}{" "}
          <span className="text-base font-normal text-subtle">
            {content.featured.saqa}
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {content.featured.tags.map((tag) => (
          <span
            key={tag}
            className="mono rounded-lg border border-primary-gold/30 bg-primary-gold/10 px-3 py-2 text-xs text-light-gold"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <p className="mono mb-4 text-xs tracking-caps text-primary-gold">{content.certsLabel}</p>
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {content.certs.map((c) => (
        <a
          key={c.id}
          href={c.link}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-center gap-3.5 rounded-xl border border-primary-gold/20 bg-surface-bg px-5 py-4 transition-all duration-300 hover:border-primary-gold/60 hover:bg-surface-raised"
        >
          <Icon name="mdi:certificate" size={24} className="flex-shrink-0 text-light-gold" />
          <div className="flex-1">
            <div className="text-sm leading-snug font-medium text-ink">{c.title}</div>
            <div className="mono mt-1 text-2xs tracking-wider text-faint">
              {c.institution}
            </div>
          </div>
          <span className="mono text-2xs text-primary-gold">&#8599;</span>
        </a>
      ))}
    </div>

    <div className="mt-3 flex items-center gap-3.5 rounded-xl border border-primary-gold/20 bg-surface-bg px-5 py-4">
      <Icon name="mdi:school-outline" size={24} className="flex-shrink-0 text-light-gold" />
      <div className="flex-1">
        <div className="text-sm font-medium text-ink">{content.nsc.title}</div>
        <div className="mono mt-1 text-2xs tracking-wider text-faint">
          {content.nsc.meta}
        </div>
      </div>
    </div>
  </section>
);

export const Route = createFileRoute("/qualifications")({
  head: () => seo({ title: ui.pageTitles.qualifications, path: "/qualifications" }),
  component: Qualifications,
});
