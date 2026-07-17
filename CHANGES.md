# Session changes — 2026-07-16 → 2026-07-17

Everything done across the Nuxt Studio setup, SEO fixes, UI/UX audit and
dev-experience fixes. All changes were verified in a real browser (headless
Chrome via Playwright) at desktop (1440×900) and mobile (390×844) viewports.

---

## 1. Nuxt Studio — migrated to the self-hosted module

The earlier commits wired the **old hosted platform** (`content.preview.api:
"https://api.nuxt.studio"` + "import your repo at nuxt.studio"). That platform
was replaced by the open-source, self-hosted `nuxt-studio` module, which the
current docs (https://nuxt.studio/setup) describe.

- Installed `nuxt-studio@^1.7.0` and registered it in `nuxt.config.ts`.
- Added `studio.repository` config pointing at `AnthonyGKruger/ez-dev`,
  branch `main`.
- Removed the obsolete `content.preview` block.
- Rewrote the Studio section of `content/README.md` (editor lives at
  `/_studio` on the site itself; local dev edits sync straight to
  `content/**`; production commits via GitHub).
- **Auth env vars** (verified against the module source, not just docs): the
  `/_studio` login gate reads `STUDIO_GITHUB_CLIENT_ID` /
  `STUDIO_GITHUB_CLIENT_SECRET` directly — the `NUXT_STUDIO_AUTH_*` names some
  docs mention do **not** satisfy it. GitHub OAuth app callback URL:
  `https://<domain>/__nuxt_studio/auth/github`.
- The per-collection Zod schemas in `content.config.ts` (from earlier
  commits) drive the module's form editor unchanged — nothing there needed
  rework.

**Still yours to do for production Studio:** set the two `STUDIO_*` vars on
Vercel (values are in your local `.env`), with the OAuth app callback URL
registered for the production domain.

## 2. Environment files

- Created **`.env.example`** (committed-able; `.gitignore` already whitelists
  it) documenting every variable the app reads, and **`.env`** (gitignored)
  for local values.
- Variables: `NUXT_PUBLIC_SITE_URL`, `NUXT_PUBLIC_GTM_ID`,
  `NUXT_PUBLIC_EMAIL_JS_SECURE_TOKEN`, `NUXT_PUBLIC_TURNSTILE_SITE_KEY`,
  `TURNSTILE_SECRET_KEY`, `STUDIO_GITHUB_CLIENT_ID`,
  `STUDIO_GITHUB_CLIENT_SECRET`, optional `STUDIO_GITHUB_REDIRECT_URL`, and
  `DEV_CLEAN_UI` (see §8).

## 3. SEO config fixed (`nuxt.config.ts`)

The three TypeScript errors were real invalid options for @nuxtjs/seo v3:

- `seo.og` / `seo.twitter` — not valid options (and pointed at a nonexistent
  `/logos/` path). Removed; site-wide `ogImage` + `twitterCard` fallbacks now
  live in `seo.meta` (pages still override via the `useSeo()` composable).
- `sitemap.siteUrl` — removed; the new `site: { url, name, description }`
  block is the canonical source all SEO modules read from.
- `robots.rules` — removed entirely; nuxt-robots auto-blocks indexing outside
  production and auto-links the sitemap.
- Removed redundant `@nuxtjs/sitemap` / `@nuxtjs/robots` module
  registrations (bundled with `@nuxtjs/seo`).
- `titleTemplate: "%s • EZdev"` moved to `app.head` — `site.name` was
  triggering the module's default `%s | <siteName>` template which overrode
  the `seo.meta` placement.

Verified: correct `<title>`, absolute `og:image`, `twitter:card`, `og:url`,
working `sitemap.xml`, and `robots.txt` that blocks dev / allows production.

## 4. Desktop scrolling issue — broken sticky nav (root cause found)

The header is `position: sticky`, but `main.css` set `overflow-x: hidden` on
`html, body, main`. `overflow-x: hidden` on `body` creates a scroll
container, which silently disables sticky positioning — at scroll 800 the
header measured at −767px (fully scrolled away).

**Fix:** `overflow-x: clip` instead — clips stray horizontal overflow
(marquee, pre-reveal transforms) without creating a scroll container.
Verified: header pins at `top: 0` on desktop and mobile; zero horizontal
overflow on any page.

## 5. Site-wide dead CSS — link color utilities never applied

`a { color: inherit }` in `main.css` was **unlayered**. Tailwind v4 emits all
utilities inside `@layer utilities`, and unlayered CSS beats layered CSS
regardless of specificity — so every `text-*`, `hover:text-*`, and
`underline` utility on every `<a>` in the site was silently ignored. Symptoms
included washed-out grey text on all ten gold `text-body-bg` buttons, dead
gold hover states on nav/footer links, and a non-underlined privacy link.

**Fix:** moved the `body` and `a` resets into `@layer base`. Verified: nav
CTA renders dark navy on gold (`oklch(0.19 0.03 253)`), underline and hover
utilities work.

## 6. Cookie notice — restyled to match the revamp

Was an off-theme black/white dual-theme card with a `mx-w-[768px]` typo, a
truncating title, edge-flush positioning and `z-10` (under other floating
UI). Now: `bg-surface-bg/95` with gold border and backdrop blur, mono gold
heading (no truncation), proper corner margins (`bottom-4 right-4`, full-width
minus margins on mobile), `z-40`, `role="dialog"`.

## 7. Mobile / UX fixes

- **Nav CTA** "START A PROJECT →" wrapped onto two lines on mobile — added
  `whitespace-nowrap` + tighter mobile padding (38px tall on both viewports;
  Afrikaans strings checked too).
- **Top status bar** wrapped to four lines at 390px — now single line (32px)
  via smaller mobile type and `whitespace-nowrap`.
- **Footer links** were 20px-tall tap targets — `py-1.5 -my-1.5` gives a 32px
  hit area with identical visuals.
- **Scroll-to-top button** was hidden until cookie consent — decoupled (its
  GTM tracking remains consent-gated internally).
- Verified fine as-is: hamburger menu (links clickable, nothing overlaps),
  about/languages/privacy/thank-you pages, `/thank-you` redirect for direct
  visits, fixed 56px headings (all short words, fit at 390px).

## 8. Dev tooling out of the way (`DEV_CLEAN_UI`)

- The custom "Open Dev Tools" pill became a compact 32×40 wrench tab docked
  to the left edge at mid-height (40% opacity until hover) — clear of Nuxt
  Studio (bottom-left), Nuxt DevTools (bottom-center) and the site's own
  floating UI (right side).
- **`DEV_CLEAN_UI=true`** in `.env` (local-only) disables the Nuxt DevTools
  panel and the Studio dev editor. Both re-mount/re-open on every refresh by
  design (Studio's dev activation is unconditional; DevTools persists open
  state in localStorage), which got in the way of mobile inspection. Blank
  the flag and restart the dev server to get them back.

## 9. 500 errors while scrolling — Vite dep optimizer (root cause found)

The contact form and Studio editor are lazy client components; Vite only
*discovered* their dependencies (`primevue/*`, `zod`, `@emailjs/browser`,
`nuxt-studio/app`, …) when they loaded — often mid-scroll. Vite then
re-optimized and reloaded, and in-flight dynamic imports failed with
`504 Outdated Optimize Dep` / `Failed to fetch dynamically imported module`.
Recurred after every dev-server restart.

**Fix:** pre-bundle all 16 lazily-discovered deps via
`vite.optimizeDeps.include` in `nuxt.config.ts`. Verified: zero optimizer
reloads and zero failed requests across a full scroll-through of all 8 pages
at both viewports.

## 10. Turnstile endless error loop on localhost

The real Turnstile site key doesn't allow `localhost`, so the widget errored
and Cloudflare's script retried every ~11s forever (on `/contact-me` **and**
`/portfolio`, which embeds the form). Local `.env` now uses Cloudflare's
official always-pass **test keys** (real keys kept commented alongside;
`.env.example` documents both). Verified: widget renders "Success!" and
issues a token, so the full verify flow works locally.

⚠️ With the test keys the form is fully submittable in dev — EmailJS uses the
real public key, so an actual submit sends a real email.

---

## Files touched

| File | Change |
|---|---|
| `nuxt.config.ts` | Studio module + repository config, `DEV_CLEAN_UI` wiring, `site`/`seo`/`sitemap` fixes, `titleTemplate` in `app.head`, `optimizeDeps.include` |
| `assets/css/main.css` | `overflow-x: clip`, global resets moved into `@layer base` |
| `components/ui/nav.vue` | CTA `whitespace-nowrap` + mobile padding, single-line status bar |
| `components/ui/footer.client.vue` | 32px link tap targets |
| `components/ux/cookie-notice.client.vue` | Full restyle to revamp theme |
| `components/ux/scroll-to-top.client.vue` | Decoupled from cookie consent |
| `components/tools/dev-tools.vue` | Compact edge-tab launcher |
| `content/README.md` | Self-hosted Studio docs |
| `.env.example` / `.env` | Created; all vars documented, test keys, `DEV_CLEAN_UI` |
| `package.json` / lockfile | `nuxt-studio` added |

## Known items left open

- Set `STUDIO_GITHUB_CLIENT_ID`/`SECRET` on Vercel; register the production
  OAuth callback URL.
- Portfolio cards still show placeholder "SCREENSHOT" tiles for some
  projects — replaceable via Studio now.
- Pre-existing lint warnings (self-closing tags, attribute order) — style
  only, `--fix`-able.
- `caniuse-lite` is 10 months stale (`npx update-browserslist-db@latest`).
