import { useSyncExternalStore } from "react";
import { site, ui } from "../content";
import { AppLink } from "./ui";

const { nav, footer } = site;

const siteLinks = [
  { label: nav.work, to: "/portfolio" },
  { label: nav.services, to: "/#services" },
  { label: nav.about, to: "/about" },
  { label: ui.footerLinks.experience, to: "/work-experience" },
  { label: ui.footerLinks.qualifications, to: "/qualifications" },
];

const products = [
  { label: "Votera", href: "https://votera.co.za" },
  { label: "Chilli Collective", href: "https://chilli-collective.com" },
];

const linkClass =
  "flex min-h-11 items-center text-base transition-colors hover:text-heading lg:block lg:min-h-0 lg:leading-8";
const headingClass = "eyebrow mb-3";

const BUILD_YEAR = new Date().getFullYear();
const currentYear = () => new Date().getFullYear();
const noSubscribe = () => () => {};

export const Footer = () => {
  // Pages are prerendered, so the build year is replaced in the browser.
  const year = useSyncExternalStore(noSubscribe, currentYear, () => BUILD_YEAR);

  return (
    <footer className="border-t border-primary-gold/15">
      <div className="site-container pt-[clamp(44px,4.4vw,64px)] pb-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <AppLink
              to="/"
              className="inline-flex min-h-11 items-center gap-2.5"
              aria-label="EZdev Solutions, home"
            >
              <img src="/media/logos/code.svg" alt="" className="h-5 w-auto" />
              <span className="mono text-sm font-bold tracking-caps text-ink">
                EZ&bull;DEV
              </span>
            </AppLink>
            <p className="mt-3 max-w-xs text-base leading-relaxed">{footer.blurb}</p>
          </div>

          <nav aria-label={footer.siteHeading}>
            <h2 className={headingClass}>{footer.siteHeading}</h2>
            <ul>
              {siteLinks.map((l) => (
                <li key={l.to}>
                  <AppLink to={l.to} className={linkClass}>
                    {l.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>{footer.productsHeading}</h2>
            <ul>
              {products.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target="_blank" rel="noopener" className={linkClass}>
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono mt-2 text-2xs tracking-caps uppercase">
              {footer.productsNote}
            </p>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h2 className={headingClass}>{footer.contactHeading}</h2>
            <ul>
              <li>
                <a href="mailto:anthony@ezdev.solutions" className={linkClass}>
                  anthony@ezdev.solutions
                </a>
              </li>
              <li>
                <AppLink to="/contact-me" className={linkClass}>
                  {footer.contactForm}
                </AppLink>
              </li>
              <li className="flex min-h-11 items-center text-base lg:block lg:min-h-0 lg:leading-8">
                {footer.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-primary-gold/10 pt-5 text-sm">
          <p>{footer.copyright.replace("{year}", String(year))}</p>
          <AppLink
            to="/privacy-policy"
            className="inline-flex min-h-11 items-center hover:text-heading"
          >
            {footer.privacy}
          </AppLink>
        </div>
      </div>
    </footer>
  );
};
