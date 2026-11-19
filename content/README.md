# Content

All site copy lives here as JSON, one file per area:

```
content/en/
  site.json            nav, footer, home page sections, about, contact, thank-you
  portfolio.json       products and client projects
  skills.json          the "How we build" stack groups
  workExperience.json  /work-experience
  qualifications.json  /qualifications
  privacy.json         /privacy-policy
  ui.json              page titles, form messages, cookie notice, error pages
```

Edit the JSON and commit; the change goes live with the next deploy.

Each file has a schema in `src/content/schema.ts`. `bun run build` runs
`bun run check:content` first, so a missing or misspelt field fails the build
with the file and field named, instead of breaking a page. Run it on its own
after an edit to check quickly.

Tokens filled in at render time: `{years}` in the hero lead and stats (years
since 2020) and `{year}` in the footer copyright.

Project screenshots are referenced by their PNG path (e.g.
`/media/votera.png`). After adding or replacing one, run `bun run images` to
make the WebP sizes the site actually serves, and add its name to
`scripts/optimize-images.ts`.
