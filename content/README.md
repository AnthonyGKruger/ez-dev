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

## Status

- **Migrated:** `skills` (grid + home preview consume `useContent`)
- **Scaffolded (JSON ready, not yet wired):** `portfolio`, `site.hero`
- **Next:** `work-experience`, `qualifications`, full `site` copy (about, contact,
  companies, footer), then retire `assets/config/data.ts` and the structured
  entries in `assets/config/translations.ts`.

## Upgrade path → Nuxt Content

`useContent()` is the only seam. It currently reads the per-locale JSON via
`import.meta.glob`. To move to Nuxt Content v3:

1. `npm i @nuxt/content`, add `@nuxt/content` to `modules`.
2. Add `content.config.ts` defining a collection per locale (source
   `en/**`, `af/**`) with a Zod schema mirroring `types/content.ts`.
3. Replace the body of `useContent()` with `queryCollection(...)`.

No component changes required — the returned shape stays the same.
