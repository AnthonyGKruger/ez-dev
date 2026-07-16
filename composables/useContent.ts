import type { ComputedRef } from "vue";
import type { ContentCollections } from "~/types/content";

/**
 * Locale-aware content loader — the single seam between components and the
 * content source.
 *
 * Today it reads the per-locale JSON in `content/<locale>/*.json`, eagerly
 * bundled by Vite. The public shape (a computed, typed collection with an
 * `en` fallback) is deliberately what a Nuxt Content `queryCollection()`
 * wrapper would return, so swapping the body for Nuxt Content later touches
 * only this file — no component changes.
 *
 *   const skills = useContent("skills");
 *   skills.value.items // typed SkillItem[]
 */
const modules = import.meta.glob("../content/*/*.json", {
  eager: true,
}) as Record<string, { default: unknown }>;

const load = <K extends keyof ContentCollections>(
  locale: string,
  collection: K,
): ContentCollections[K] | undefined => {
  const mod = modules[`../content/${locale}/${collection}.json`];
  return mod?.default as ContentCollections[K] | undefined;
};

export default function useContent<K extends keyof ContentCollections>(
  collection: K,
): ComputedRef<ContentCollections[K]> {
  const { getLang } = useTranslate();
  return computed(() => {
    const lang = getLang();
    const resolved = load(lang, collection) ?? load("en", collection);
    if (!resolved) {
      throw new Error(`[useContent] Missing content collection: ${collection}`);
    }
    return resolved;
  });
}
