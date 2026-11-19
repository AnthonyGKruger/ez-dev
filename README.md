# EZdev Solutions

The website for [EZdev Solutions](https://www.ezdev.solutions), built with
[TanStack Start](https://tanstack.com/start) (React), Tailwind CSS v4 and
TypeScript, deployed on Vercel.

## Getting started

```bash
bun install
cp .env.example .env   # optional: analytics and contact form keys
bun dev                # http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Dev server with hot reload |
| `bun run build` | Validates the content, then builds and prerenders every page |
| `bun start` | Serves the production build locally |
| `bun run check:content` | Validates `content/en/*.json` against the schemas |
| `bun run typecheck` | TypeScript check |
| `bun run lint` | ESLint (type-aware, React hooks, accessibility, TanStack Router) |
| `bun run images` | Regenerates the WebP screenshot sizes in `public/media` |

## How it fits together

- **Pages** are file routes in `src/routes`. All of them are prerendered to
  static HTML at build time; the only server code is the Turnstile check in
  `src/routes/api/turnstile-verify.ts`.
- **Copy** lives in `content/en/*.json` (see `content/README.md`) and is read
  through `src/content`.
- **Styles** are Tailwind utilities plus the design tokens and shared patterns
  in `src/styles/main.css`.
- **Redirects** for old URLs (`/skills`, `/languages`, `/contact`) and the
  sitemap are configured in `vite.config.ts`.
- **Share image:** see `docs/og-image/README.md`.

## Contact

anthony@ezdev.solutions
