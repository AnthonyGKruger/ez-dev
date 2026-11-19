import { Fragment } from "react";
import { site, withYears } from "../../content";
import { Button, Frame, ResponsiveImage } from "../ui";

const hero = site.home.hero;

const [frameA, frameB] = hero.showcase;

// Same sizes for the phone-only frame and frame A, so a phone resolves both
// to the same srcset candidate and downloads the Votera screenshot once.
const sizesA = "(min-width: 1024px) 500px, (min-width: 640px) 80vw, 100vw";
const sizesB = "(min-width: 1024px) 380px, (min-width: 640px) 60vw, 100vw";

const Caption = ({ domain, caption }: { domain: string; caption: string }) => (
  <>
    {domain} <span className="text-primary-gold">· {caption}</span>
  </>
);

export const Hero = () => (
  <section className="relative overflow-hidden border-b border-primary-gold/10">
    <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="relative mx-auto grid max-w-site items-center gap-16 gutter-x pt-[clamp(56px,7vw,112px)] pb-[clamp(64px,7.5vw,120px)] lg:grid-cols-2">
      <div className="flex min-w-0 flex-col gap-5.5 md:gap-7">
        {/* Keep each "·" part on one line, so narrow screens wrap after the dot. */}
        <p className="eyebrow">
          {hero.eyebrow.split(" · ").map((part, i) => (
            <Fragment key={i}>
              {i > 0 && " · "}
              <span className="whitespace-nowrap">{part}</span>
            </Fragment>
          ))}
        </p>

        <h1 className="text-[length:clamp(38px,2.6vw_+_27px,64px)] leading-display font-black tracking-display text-heading">
          {hero.title} <span className="text-light-gold">{hero.titleAccent}</span>
        </h1>

        <p className="max-w-lg text-intro leading-relaxed text-lead">
          {withYears(hero.lead)}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap md:gap-3.5">
          <Button variant="primary" to="/contact-me">
            {hero.ctaPrimary}
          </Button>
          <Button to="#work">{hero.ctaSecondary}</Button>
        </div>

        {frameA && (
          <figure className="sm:hidden">
            <Frame label={frameA.domain} index="01">
              <ResponsiveImage
                src={frameA.image}
                alt={frameA.alt}
                sizes={sizesA}
                eager
                className="block aspect-video w-full object-cover object-top"
              />
            </Frame>
            <figcaption className="mono mt-2.5 text-2xs tracking-caps uppercase">
              <Caption {...frameA} />
            </figcaption>
          </figure>
        )}

        <dl
          className="mt-2 grid border-t border-primary-gold/20 md:mt-3"
          style={{
            gridTemplateColumns: `repeat(${hero.stats.length}, minmax(0, 1fr))`,
            maxWidth: `${hero.stats.length * 180}px`,
          }}
        >
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col-reverse gap-1 pt-4 md:pt-5 ${
                i > 0 ? "border-l border-primary-gold/20 pl-3 md:pl-5" : ""
              }`}
            >
              <dt className="mono text-2xs tracking-caps text-body uppercase">
                {stat.label}
              </dt>
              <dd
                className={`mono text-[length:clamp(26px,0.5vw_+_24px,32px)] leading-none font-bold ${
                  i === 1 ? "text-light-gold" : "text-heading"
                }`}
              >
                {withYears(stat.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {frameA && frameB && (
        <div className="hidden min-w-0 grid-cols-10 grid-rows-[auto_clamp(56px,8vw,120px)_auto] sm:grid">
          <figure className="col-[1/9] row-[1/3]">
            <figcaption className="mono mb-2.5 text-2xs tracking-caps uppercase">
              <Caption {...frameA} />
            </figcaption>
            <Frame
              label={frameA.domain}
              index="01"
              brackets
              className="shadow-[0_30px_60px_rgb(0_0_0/0.35)]"
            >
              <ResponsiveImage
                src={frameA.image}
                alt={frameA.alt}
                sizes={sizesA}
                eager
                className="block aspect-video w-full object-cover object-top"
              />
            </Frame>
          </figure>

          <figure className="z-10 col-[5/11] row-[2/4] self-end">
            <Frame
              label={frameB.domain}
              index="02"
              brackets
              className="shadow-[0_40px_80px_rgb(0_0_0/0.5)]"
            >
              <ResponsiveImage
                src={frameB.image}
                alt={frameB.alt}
                sizes={sizesB}
                className="block aspect-video w-full object-cover object-top"
              />
            </Frame>
            <figcaption className="mono mt-2.5 text-right text-2xs tracking-caps uppercase">
              <Caption {...frameB} />
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  </section>
);
