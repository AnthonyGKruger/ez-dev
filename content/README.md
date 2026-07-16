# Content layer

Site content lives here as JSON, split **per locale**:

```
content/
  en/  portfolio.json  skills.json  site.json  (work-experience.json, qualifications.json — next)
  af/  portfolio.json  skills.json  site.json
```

Each locale directory holds fully-translated content — no translation keys, the
strings are the copy. Types live in `types/content.ts`.

## How components read it

Components never import JSON directly. They use the `useContent()` composable,
which resolves the active locale (via `useTranslate`) and falls back to `en`:

```ts
const skills = useContent("skills"); // ComputedRef<SkillsContent>
skills.value.items;                  // typed SkillItem[]
```

The `{years}` token in `site.json` (hero lead + first stat) is interpolated at
render time by the consuming component.

Filenames match their collection key exactly (`workExperience.json`,
`qualifications.json`, …) so `useContent(key)` resolves `content/<locale>/<key>.json`.

## Status

- **Migrated (component reads from `useContent`):** `skills`, `portfolio`,
  `workExperience`, `qualifications`, and `site` (`hero`, `companies`, `about`,
  `contact`). The About page + home preview, the contact form and the home
  contact CTA all read from `site.about` / `site.contact`.
  `assets/config/data.ts` has been removed and the corresponding structured
  strings pruned from `assets/config/translations.ts`.
- **Still key-based i18n microcopy** (stays in `translations.ts`): nav/footer
  labels, contact-form validation errors, cookie notice, thank-you, privacy,
  languages page, SEO titles, the hero typing strings.

## Runtime choice → why the glob loader, not @nuxt/content (yet)

`useContent()` reads the per-locale JSON synchronously via `import.meta.glob`
(bundled by Vite). This was chosen over installing `@nuxt/content` because:

- Nuxt Content's `queryCollection()` is **async** (file → build-time DB →
  runtime query). Adopting it would turn every content read into
  `useAsyncData`, and live EN/AF switching would need explicit refetch/watch —
  today it "just works" reactively through the `computed`.
- For a small, static, SSG portfolio the DB layer buys little.

`useContent()` is the single seam, so adopting Nuxt Content later is localized:
1. `npm i @nuxt/content`, add it to `modules`.
2. Add `content.config.ts` with a collection per locale (`en/**`, `af/**`) and
   a Zod schema mirroring `types/content.ts`.
3. Swap the body of `useContent()` for `queryCollection(...)` (returning the
   same shape). Worth doing if/when you want the **Nuxt Studio** visual editor.
