import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "../components/ContactForm";
import { ClientCard, ProductCard } from "../components/portfolio/Cards";
import { clients, portfolio, products, site, ui } from "../content";
import { seo } from "../lib/seo";

const labels = site.home.work;
const groups = [
  { key: "products", title: labels.products, items: products },
  { key: "clients", title: labels.clients, items: clients },
];

const Portfolio = () => (
  <>
    <section className="site-container pt-[clamp(56px,7vw,112px)] pb-section">
      <p className="eyebrow mb-2.5 md:mb-3.5">{portfolio.eyebrow}</p>
      <h1 className="text-[length:clamp(40px,1.6vw_+_33px,56px)] leading-display font-black tracking-display text-heading">
        {portfolio.heading}
      </h1>
      <p className="mt-4 max-w-2xl text-intro leading-relaxed md:mt-5">
        {portfolio.intro}
      </p>

      {groups.map((group, gi) => (
        <div key={group.key}>
          <div
            className={`mb-4 flex items-center gap-4 md:mb-5 ${gi === 0 ? "mt-10 md:mt-14" : "mt-12 md:mt-16"}`}
          >
            <h2 className="mono text-xs font-bold tracking-caps text-heading uppercase md:text-sm">
              {group.title}
            </h2>
            <span className="h-px flex-1 bg-primary-gold/20" aria-hidden="true" />
            <span className="mono text-xs text-primary-gold md:text-sm">
              {String(group.items.length).padStart(2, "0")}
            </span>
          </div>
          <ul className="grid gap-5 md:grid-cols-2 md:gap-6">
            {group.items.map((p) => (
              <li key={p.id}>
                {p.kind === "product" ? (
                  <ProductCard project={p} labels={labels} detailed headingTag="h3" />
                ) : (
                  <ClientCard project={p} labels={labels} detailed headingTag="h3" />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
    <ContactForm />
  </>
);

export const Route = createFileRoute("/portfolio")({
  head: () =>
    seo({
      title: ui.pageTitles.portfolio,
      description: ui.pageDescriptions.portfolio,
      path: "/portfolio",
    }),
  component: Portfolio,
});
