import { useEffect } from "react";

/** Fades `.reveal` (and `[data-reveal-stagger]` children) in once, as they scroll into view. */
const STAGGER_MS = 60;
const MAX_STEPS = 4;

export const useScrollReveal = () => {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        el.classList.add("reveal");
        el.style.transitionDelay = `${Math.min(i, MAX_STEPS - 1) * STAGGER_MS}ms`;
      });
    });

    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      root.classList.add("reveal-ready");
      return () => root.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      // Other pages don't use reveal; don't leave the gate on <html>.
      root.classList.remove("reveal-ready");
    };
  }, []);
};
