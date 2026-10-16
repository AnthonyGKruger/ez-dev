/**
 * Reveal-on-scroll for `.reveal` elements (see main.css).
 *
 * - Adds `reveal-ready` to <html> on mount only, so content is fully
 *   visible without JS or if this never runs.
 * - Children of a `[data-reveal-stagger]` container become `.reveal` items
 *   with a 60ms stagger, capped at 4 steps.
 * - Reveals once (threshold 0.15, bottom margin -10%), then unobserves.
 * - With prefers-reduced-motion, everything is shown immediately.
 */
const STAGGER_MS = 60;
const MAX_STEPS = 4;

export default function useScrollReveal() {
  if (import.meta.server) return;

  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    document
      .querySelectorAll<HTMLElement>("[data-reveal-stagger]")
      .forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          const el = child as HTMLElement;
          el.classList.add("reveal");
          el.style.transitionDelay = `${Math.min(i, MAX_STEPS - 1) * STAGGER_MS}ms`;
        });
      });

    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      document.documentElement.classList.add("reveal-ready");
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((el) => observer?.observe(el));
    document.documentElement.classList.add("reveal-ready");
  });

  onUnmounted(() => {
    observer?.disconnect();
    // Other pages don't use reveal; don't leave the gate on <html>.
    document.documentElement.classList.remove("reveal-ready");
  });
}
