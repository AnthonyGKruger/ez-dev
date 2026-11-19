import { clients, products, site, skills } from "../../content";
import { ClientCard, ProductCard } from "../portfolio/Cards";
import { AppLink, Brackets, Button, Frame } from "../ui";

const { home } = site;
const sectionX = "site-container";
const h2Class =
  "text-[length:clamp(30px,1.4vw_+_24px,44px)] leading-display font-black tracking-display text-heading";

export const CompaniesStrip = () => (
  <section aria-label={home.trusted.label} className="reveal border-b border-primary-gold/10">
    <div className={`${sectionX} py-9 md:flex md:items-center md:gap-14 md:py-11`}>
      <p className="eyebrow flex-none text-center md:text-left">{home.trusted.label}</p>
      <ul className="mt-5.5 grid grid-cols-2 justify-items-center gap-x-4 gap-y-6 md:mt-0 md:flex md:flex-1 md:items-center md:justify-between md:gap-10">
        {site.companies.items.map((c) => (
          <li key={c.name} className="flex w-full justify-center md:w-auto">
            <img
              src={c.logo}
              alt={c.name}
              width={c.width}
              height={c.height}
              loading="lazy"
              className="h-6 w-auto max-w-full object-contain opacity-80 brightness-0 invert transition-opacity hover:opacity-100 md:h-7"
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const GroupHeading = ({ title, className }: { title: string; className: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <h3 className="mono text-xs font-bold tracking-caps text-heading uppercase md:text-sm">
      {title}
    </h3>
    <span className="h-px flex-1 bg-primary-gold/20" aria-hidden="true" />
  </div>
);

export const WorkPreview = () => {
  const labels = home.work;
  return (
    <section id="work" className={`${sectionX} pt-section`}>
      <div className="reveal flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-2.5 md:mb-3.5">{labels.eyebrow}</p>
          <h2 className={h2Class}>{labels.title}</h2>
        </div>
        <Button size="sm" to="/portfolio" className="hidden sm:inline-flex">
          {labels.all}
        </Button>
      </div>

      <GroupHeading title={labels.products} className="mt-8 mb-4 md:mt-12 md:mb-5" />
      <ul className="grid gap-5 md:grid-cols-2 md:gap-6" data-reveal-stagger>
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard project={p} labels={labels} />
          </li>
        ))}
      </ul>

      <GroupHeading title={labels.clients} className="mt-10 mb-4 md:mt-14 md:mb-5" />
      <ul className="grid gap-4 xl:grid-cols-2 xl:gap-6" data-reveal-stagger>
        {clients.map((p) => (
          <li key={p.id}>
            <ClientCard project={p} labels={labels} />
          </li>
        ))}
      </ul>

      <Button size="sm" to="/portfolio" className="mt-8 flex w-full sm:hidden">
        {labels.all}
      </Button>
    </section>
  );
};

export const Services = () => {
  const { services } = home;
  return (
    <section id="services" className={`${sectionX} pt-section`}>
      <div className="reveal">
        <p className="eyebrow mb-2.5 md:mb-3.5">{services.eyebrow}</p>
        <h2 className={`mb-7 md:mb-12 ${h2Class}`}>{services.title}</h2>
      </div>

      <ul className="grid gap-4 md:grid-cols-3 md:gap-5" data-reveal-stagger>
        {services.items.map((item, i) => (
          <li key={item.slug} className="flex">
            <Frame
              label={item.slug}
              index={String(i + 1).padStart(2, "0")}
              className="flex w-full flex-col"
            >
              <div className="flex flex-1 flex-col gap-2 p-5 md:min-h-56 md:gap-3.5 md:px-7 md:pt-8 md:pb-7.5">
                <h3 className="text-xl font-black tracking-tight text-heading md:text-2xl">
                  {item.title}
                </h3>
                <p className="leading-relaxed">{item.body}</p>
                <AppLink
                  to="#work"
                  className="mono mt-auto inline-flex min-h-11 items-center self-start pt-3 text-2xs tracking-widest text-light-gold uppercase hover:text-heading"
                >
                  <span>
                    {item.proof}
                    <span aria-hidden="true">&nbsp;→</span>
                  </span>
                </AppLink>
              </div>
            </Frame>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const AboutPreview = () => {
  const { about } = home;
  return (
    <section id="about" className={`${sectionX} pt-section`}>
      <div className="reveal grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-[clamp(40px,5vw,72px)]">
        <div>
          <p className="eyebrow mb-2.5 md:mb-3.5">{about.eyebrow}</p>
          <h2 className={h2Class}>{about.title}</h2>
        </div>

        <div className="flex flex-col items-start gap-5 lg:pt-7">
          {about.body.map((para, i) => (
            <p
              key={i}
              className="text-intro leading-relaxed text-lead"
            >
              {para}
            </p>
          ))}
          <Button to="/contact-me">{about.cta}</Button>
        </div>
      </div>

      <ul
        className="reveal mt-10 grid border-t border-primary-gold/20 md:mt-14 md:grid-cols-3"
        data-reveal-stagger
      >
        {about.points.map((point, i) => (
          <li
            key={point.title}
            className={`flex flex-col gap-2 py-6 max-md:not-first:border-t max-md:not-first:border-primary-gold/10 md:pt-7 md:pb-0 ${
              i > 0
                ? "md:border-l md:border-primary-gold/20 md:pl-[clamp(20px,2.4vw,36px)]"
                : ""
            }`}
          >
            <span className="mono text-2xs tracking-caps text-primary-gold md:text-xs">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-lg font-bold tracking-tight text-heading md:text-xl">
              {point.title}
            </h3>
            <p className="max-w-xs leading-relaxed md:pr-[clamp(12px,2vw,28px)]">
              {point.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const Stack = () => {
  const { stack } = home;
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className={`${sectionX} pt-section`}
    >
      <div className="reveal frame grid gap-6 px-[clamp(20px,2.6vw,36px)] py-[clamp(24px,2.4vw,32px)] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="eyebrow mb-2">{stack.eyebrow}</p>
          <h2
            id="stack-title"
            className="text-xl leading-tight font-black tracking-tight text-heading md:text-2xl"
          >
            {stack.title}
          </h2>
          <p className="mt-2 leading-relaxed">{stack.lead}</p>
        </div>

        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.groups.map((group) => (
            <div key={group.title}>
              <dt className="mono mb-2.5 text-2xs tracking-caps text-primary-gold uppercase">
                {group.title}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="chip text-heading">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export const ContactCta = () => {
  const { cta } = home;
  return (
    <section id="contact" className={`${sectionX} pt-section pb-20 md:pb-30`}>
      <div className="reveal frame flex flex-col gap-7 px-[clamp(24px,4.4vw,64px)] py-[clamp(40px,5vw,72px)] lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div
          className="grid-backdrop cta-backdrop pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        <div className="relative">
          <p className="eyebrow mb-2.5 md:mb-3.5">{cta.eyebrow}</p>
          <h2 className="text-[length:clamp(32px,2.1vw_+_22px,52px)] leading-display font-black tracking-display text-heading">
            {cta.title} <span className="text-light-gold">{cta.titleAccent}</span>
          </h2>
          <p className="mt-4 text-intro">{cta.reply}</p>
        </div>

        <div className="relative flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-6 lg:flex-none lg:flex-col lg:items-end lg:gap-4">
          <Button variant="primary" to="/contact-me" className="md:min-h-14 md:px-8">
            {cta.button}
          </Button>
          <a
            href={`mailto:${cta.email}`}
            className="mono inline-flex min-h-11 items-center justify-center py-2.5 text-sm text-light-gold hover:text-heading md:text-base"
          >
            {cta.email}
          </a>
        </div>

        <Brackets />
      </div>
    </section>
  );
};
