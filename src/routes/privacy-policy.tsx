import { createFileRoute } from "@tanstack/react-router";
import { SectionRule } from "../components/ui";
import { privacy as content, ui } from "../content";
import { seo } from "../lib/seo";

const PrivacyPolicy = () => (
  <section className="mx-auto max-w-3xl px-7 pt-20 pb-24">
    {/* Strip the legacy "// " prefix at render time; privacy.json is left as is. */}
    <SectionRule label={content.eyebrow.replace(/^\/\/\s*/, "")} className="mb-5" />
    <h1 className="text-5xl font-black tracking-tight text-heading">{content.heading}</h1>
    <p className="mt-6 mb-2 text-base leading-relaxed text-lead">{content.intro}</p>
    <p className="mono mb-10 text-xs tracking-wider text-faint">
      {content.lastUpdated}
    </p>

    <div className="flex flex-col gap-8">
      {content.topics.map((topic) => (
        <div key={topic.num} className="border-l-2 border-primary-gold/50 pl-5">
          <div className="flex items-baseline gap-3">
            <span className="mono text-sm text-primary-gold">{topic.num}</span>
            <h2 className="text-xl font-bold text-heading">{topic.title}</h2>
          </div>
          <p className="mt-3 text-base leading-relaxed text-body">{topic.body}</p>
        </div>
      ))}
    </div>

    <div className="mt-10 rounded-2xl border border-primary-gold/30 bg-surface-bg p-6">
      <p className="mono mb-2 text-xs tracking-widest text-primary-gold">{content.contact.label}</p>
      <p className="text-base leading-relaxed text-lead">
        {content.contact.text}{" "}
        <a href={`mailto:${content.contact.email}`} className="text-light-gold">
          {content.contact.email}
        </a>
        .
      </p>
    </div>
  </section>
);

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo({ title: ui.pageTitles.privacy, path: "/privacy-policy" }),
  component: PrivacyPolicy,
});
