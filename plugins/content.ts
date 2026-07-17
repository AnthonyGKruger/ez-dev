/**
 * Preloads every content collection (both locales) from Nuxt Content into a
 * reactive `useState` store at app startup.
 *
 * Why preload: Nuxt Content's `queryCollection()` is async, but the site does
 * live EN/AF switching and components consume content synchronously via
 * `useContent()`. Loading the (small, static) content set once — awaited on
 * the server, serialized to the client via `useState` — keeps `useContent()`
 * synchronous and lets locale switches resolve instantly with no refetch.
 */
const COLLECTIONS = [
  "skills",
  "portfolio",
  "workExperience",
  "qualifications",
  "site",
  "languages",
  "privacy",
] as const;

type Store = Record<string, Record<string, unknown>>;

export default defineNuxtPlugin(async () => {
  const store = useState<Store>("content", () => ({ en: {}, af: {} }));

  // Already hydrated from the SSR payload on the client — don't re-query.
  if (Object.keys(store.value.en).length) return;

  const next: Store = { en: {}, af: {} };
  for (const collection of COLLECTIONS) {
    const docs = await queryCollection(collection).all();
    for (const doc of docs) {
      // With per-collection schemas the JSON fields are top-level on the doc
      // (alongside Nuxt Content metadata like id/stem). `stem`
      // (e.g. "en/skills" | "af/skills") carries the locale.
      const d = doc as { stem?: string; id?: string };
      const stem = String(d.stem ?? d.id ?? "");
      const locale = /(^|\/)af(\/|$)/.test(stem) ? "af" : "en";
      next[locale][collection] = doc;
    }
  }
  store.value = next;
});
