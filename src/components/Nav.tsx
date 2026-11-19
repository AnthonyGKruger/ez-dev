import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { site } from "../content";
import { AppLink, Button } from "./ui";

const { nav, banner } = site;

const navItems = [
  { label: nav.work, to: "/portfolio" },
  { label: nav.services, to: "/#services" },
  { label: nav.about, to: "/#about" },
  { label: nav.contact, to: "/contact-me" },
];

export const Nav = () => {
  const { pathname, hash } = useLocation();
  const [isOpen, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  // Only real routes get the active state; hash links point into the home page.
  const isActive = (to: string) => !to.includes("#") && pathname.startsWith(to);

  useEffect(() => setOpen(false), [pathname, hash]);

  // The toggle is ignored so its own click can close the menu.
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuPanel.current?.contains(target) || menuButton.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      <div className="border-b border-primary-gold/15 bg-surface-bg">
        <p className="mono mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 gutter-x py-2 text-2xs tracking-caps text-light-gold uppercase md:h-9 md:py-0">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-light-gold md:size-2" />
            {banner.available}
          </span>
        </p>
      </div>

      <header
        className="sticky top-0 z-50 w-full border-b border-primary-gold/20"
        style={{ background: "oklch(19% 0.03 253 / 0.82)", backdropFilter: "blur(10px)" }}
      >
        <nav
          className="mx-auto flex h-16 max-w-site items-center justify-between gap-3 gutter-x md:h-19"
          aria-label="Main"
        >
          <AppLink
            to="/"
            className="flex min-h-11 flex-none items-center gap-2.5"
            aria-label="EZdev Solutions, home"
          >
            <img src="/media/logos/code.svg" alt="" className="h-5.5 w-auto" />
            <span className="mono text-sm font-bold tracking-caps text-ink max-[359px]:hidden">
              EZ&bull;DEV
            </span>
          </AppLink>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <AppLink
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={`block px-3 py-3 text-base font-medium transition-colors hover:text-heading ${
                    isActive(item.to)
                      ? "text-heading shadow-[inset_0_-2px_0] shadow-primary-gold"
                      : ""
                  }`}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5 lg:gap-4">
            <Button variant="primary" size="sm" to="/contact-me">
              {nav.cta}
            </Button>

            <button
              ref={menuButton}
              type="button"
              className="relative size-11 flex-none lg:hidden"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? nav.menuClose : nav.menuOpen}
              onClick={() => setOpen((open) => !open)}
            >
              <span
                className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2"
                aria-hidden="true"
              >
                {/* Separate class sets per state: conflicting utilities don't resolve by order in Tailwind v4. */}
                <span
                  className={`absolute block h-0.5 rounded-full bg-ink transition-all duration-300 ${
                    isOpen ? "w-6 translate-y-0 rotate-45" : "w-4.5 -translate-y-2"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 rounded-full bg-ink transition duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute block h-0.5 rounded-full bg-ink transition-all duration-300 ${
                    isOpen ? "w-6 translate-y-0 -rotate-45" : "w-3 translate-y-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <div
          id="mobile-menu"
          ref={menuPanel}
          hidden={!isOpen}
          className="absolute inset-x-0 top-full animate-menu-in border-y border-primary-gold/20 bg-body-bg shadow-[0_24px_48px_rgb(0_0_0/0.45)] lg:hidden"
        >
          <ul className="mx-auto flex max-w-site flex-col gutter-x py-3">
            {navItems.map((item) => (
              <li key={item.to}>
                <AppLink
                  to={item.to}
                  aria-current={isActive(item.to) ? "page" : undefined}
                  className={`flex min-h-11 items-center text-lg font-medium hover:text-heading ${
                    isActive(item.to) ? "text-heading" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Catches the outside tap so it doesn't also hit a link underneath. */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 animate-fade-in bg-body-bg/50 lg:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
