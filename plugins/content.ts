/**
 * Preloads every content collection from Nuxt Content into a reactive
 * `useState` store at app startup.
 *
 * Why preload: Nuxt Content's `queryCollection()` is async, but components
 * consume content synchronously via `useContent()`. Loading the (small,
 * static) content set once (awaited on the server, serialized to the client
 * via `useState`) keeps `useContent()` synchronous with no refetch.
 *
 * The site is English-only; the store keeps an `en` key so useContent() reads
 * `store.en[collection]`.
 */
const COLLECTIONS = [
  "skills",
  "portfolio",
  "workExperience",
  "qualifications",
  "site",
  "privacy",
] as const;

type Store = { en: Record<string, unknown> };

export default defineNuxtPlugin(async () => {
  const store = useState<Store>("content", () => ({ en: {} }));

  // Already hydrated from the SSR payload on the client; don't re-query.
  if (Object.keys(store.value.en).length) return;

  const next: Store = { en: {} };
  for (const collection of COLLECTIONS) {
    // One document per collection (content/en/<collection>.json). With
    // per-collection schemas its JSON fields are top-level on the doc.
    const doc = await queryCollection(collection).first();
    if (doc) next.en[collection] = doc;
  }
  store.value = next;
});
