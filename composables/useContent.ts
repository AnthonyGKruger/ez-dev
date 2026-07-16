import type { ComputedRef } from "vue";
import type { ContentCollections } from "~/types/content";

/**
 * Locale-aware content reader — the single seam between components and the
 * content source.
 *
 * Content is authored as per-locale JSON in `content/<locale>/*.json`, managed
 * by Nuxt Content (see content.config.ts). The `plugins/content.ts` plugin
 * preloads every collection for both locales into a `useState` store at
 * startup; this composable reads that store synchronously and resolves the
 * active locale (via useTranslate), falling back to `en`.
 *
 *   const skills = useContent("skills");
 *   skills.value.items // typed SkillItem[]
 */
export default function useContent<K extends keyof ContentCollections>(
  collection: K,
): ComputedRef<ContentCollections[K]> {
  const { getLang } = useTranslate();
  const store = useState<Record<string, Record<string, unknown>>>("content");
  return computed(() => {
    const lang = getLang();
    const doc =
      store.value?.[lang]?.[collection] ?? store.value?.en?.[collection];
    if (!doc) {
      throw new Error(`[useContent] Missing content collection: ${collection}`);
    }
    return doc as ContentCollections[K];
  });
}
