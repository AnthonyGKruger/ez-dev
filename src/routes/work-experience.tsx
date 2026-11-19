import { createFileRoute } from "@tanstack/react-router";
import { SectionRule } from "../components/ui";
import { ui, workExperience as content } from "../content";
import { Icon } from "../lib/icon";
import { seo } from "../lib/seo";

const WorkExperience = () => (
  <section className="mx-auto max-w-5xl px-7 pt-20 pb-24">
    <SectionRule label={content.eyebrow} className="mb-5" />
    <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-heading">{content.heading}</h1>
      <p className="mono text-sm text-subtle">{content.tagline}</p>
    </div>

    <div className="relative pl-8">
      <div
        className="absolute top-1.5 bottom-1.5 left-1.5 w-0.5"
        style={{
          background: "linear-gradient(oklch(62.28% 0.083 75.89), oklch(62.28% 0.083 75.89 / .15))",
        }}
      />
      <div className="flex flex-col gap-3.5">
        {content.entries.map((w) => (
          <div
            key={w.id}
            className="relative rounded-2xl border border-primary-gold/25 bg-surface-bg p-6 transition-colors duration-400 hover:border-primary-gold/60"
          >
            <span
              className="absolute top-7 -left-8 h-3.5 w-3.5 rounded-full bg-primary-gold"
              style={{
                boxShadow:
                  "0 0 0 4px oklch(19% 0.03 253), 0 0 0 6px oklch(62.28% 0.083 75.89 / .3)",
              }}
            />
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h3 className="text-xl font-bold text-heading">{w.company}</h3>
              <span className="mono text-xs tracking-wider whitespace-nowrap text-primary-gold">
                {w.dateFrom} - {w.dateTo}
              </span>
            </div>
            <p className="mono mt-2 text-sm tracking-wider text-light-gold">{w.role}</p>
            {w.summary && (
              <p className="mt-3.5 text-base leading-relaxed text-body">
                {w.summary}
              </p>
            )}
            {w.comments.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2.5">
                {w.comments.map((c) => (
                  <span
                    key={c}
                    title={c}
                    className="mono flex min-h-9 w-full items-center gap-2 rounded-md border border-primary-gold/25 bg-primary-gold/10 px-3 py-2 text-xs leading-tight text-light-gold sm:w-auto sm:max-w-full"
                  >
                    <Icon name="mdi:medal" size={14} className="shrink-0 text-light-gold" />
                    <span className="min-w-0 break-words">{c}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Route = createFileRoute("/work-experience")({
  head: () =>
    seo({
      title: ui.pageTitles.workExperience,
      description: content.tagline,
      path: "/work-experience",
    }),
  component: WorkExperience,
});
