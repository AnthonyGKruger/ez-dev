# Content layer

Site content lives here as JSON. The site is English-only:

```
content/
  en/  portfolio.json  skills.json  site.json  workExperience.json  qualifications.json  languages.json  privacy.json
```

The strings are the copy (no translation keys). Types live in
`types/content.ts`.

## How components read it

Components never import JSON directly. They use the `useContent()` composable:

```ts
const skills = useContent("skills"); // ComputedRef<SkillsContent>
skills.value.items;                  // typed SkillItem[]
```

The `{years}` token in `site.json` (hero lead + first stat) is interpolated at
render time by the consuming component.

Filenames match their collection key exactly (`workExperience.json`,
`qualifications.json`, …) so `useContent(key)` resolves `content/en/<key>.json`.

## Status

- **Migrated (component reads from `useContent`):** `skills`, `portfolio`
  (incl. card action labels + home "all work" strip), `workExperience`,
  `qualifications`, `languages`, `privacy`, and `site` (`hero`, `companies`,
  `about`, `contact`, `thankYou`). The About page + home preview, the contact
  form, the home contact CTA and the thank-you page all read from `site.*`.
  `assets/config/data.ts` has been removed and the corresponding structured
  strings pruned from `assets/config/translations.ts`.
- **Still key-based UI microcopy** (stays in `translations.ts`, English only): nav/footer
  labels, contact-form validation errors + verification toasts, cookie notice,
  SEO titles, the hero typing strings, error pages.

## How it's wired (Nuxt Content v3)

- `content.config.ts` declares one **data** collection per content type
  (`skills`, `portfolio`, `workExperience`, `qualifications`, `site`,
  `languages`, `privacy`), each sourced from `content/en/<type>.json`. The
  typed shapes live in `types/content.ts`.
- `plugins/content.ts` preloads every collection into a `useState("content")`
  store at startup (awaited on the server, serialized to the client). This is
  what keeps `useContent()` **synchronous**: Nuxt Content's
  `queryCollection()` is itself async, so reading it eagerly once avoids
  turning every consumer into `useAsyncData`.
- `useContent(collection)` reads that store.

Requires a SQLite adapter (`better-sqlite3`, installed) — Nuxt Content builds a
local content DB under `.data/` (gitignored). Editing a JSON file triggers a
rebuild in dev.

The per-collection Zod schemas in `content.config.ts` mirror `types/content.ts`.
Keep the two in sync — the schema drives both validation and the **Nuxt Studio**
form editor.

## Nuxt Studio (visual editor)

Studio is the **self-hosted `nuxt-studio` module** (the old hosted
nuxt.studio platform was replaced by it) — the editor is served by this site
itself at **`/_studio`**. Setup docs: https://nuxt.studio/setup

- `nuxt.config.ts` registers the module and points `studio.repository` at
  `AnthonyGKruger/ez-dev` (branch `main`) so production edits can be committed
  back via GitHub.
- The per-collection Zod schemas in `content.config.ts` drive Studio's form
  editor for each collection (`skills`, `portfolio`, `workExperience`,
  `qualifications`, `site`, `languages`, `privacy`).

**Local dev:** run `npm run dev`, open `/_studio` (or the floating button) —
no auth needed; edits sync straight to the files in `content/**`, you commit
them yourself.

**Production:** requires an SSR deployment (`nuxt build`, e.g. Vercel) and a
GitHub OAuth app for editor login — set `STUDIO_GITHUB_CLIENT_ID` /
`STUDIO_GITHUB_CLIENT_SECRET` on the deployment (see `.env.example`; the OAuth
app's callback URL is `https://<domain>/__nuxt_studio/auth/github`). In
production Studio commits/publishes changes to the repo directly from the UI.
