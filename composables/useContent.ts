import type { ComputedRef } from "vue";
import type { ContentCollections } from "~/types/content";

/**
 * Content reader: the single seam between components and the content source.
 *
 * Content is authored as JSON in `content/en/*.json`, managed by Nuxt Content
 * (see content.config.ts). The `plugins/content.ts` plugin preloads every
 * collection into a `useState` store at startup; this composable reads that
 * store synchronously.
 *
 *   const skills = useContent("skills");
 *   skills.value.groups // typed StackGroup[]
 */
export default function useContent<K extends keyof ContentCollections>(
  collection: K,
): ComputedRef<ContentCollections[K]> {
  const store = useState<{ en: Record<string, unknown> }>("content");
  return computed(() => {
    const doc = store.value?.en?.[collection];
    if (!doc) {
      throw new Error(`[useContent] Missing content collection: ${collection}`);
    }
    return doc as ContentCollections[K];
  });
}
