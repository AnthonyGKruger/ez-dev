import { defineContentConfig, defineCollection, z } from "@nuxt/content";

/**
 * One data collection per content type. Each `source` glob matches both
 * locale directories (content/en/<type>.json and content/af/<type>.json);
 * the locale is derived from the document stem at read time in useContent().
 *
 * Schemas are permissive (passthrough) — the typed shapes live in
 * types/content.ts and are applied when useContent() casts the result.
 */
const loose = z.object({}).passthrough();

export default defineContentConfig({
  collections: {
    skills: defineCollection({ type: "data", source: "**/skills.json", schema: loose }),
    portfolio: defineCollection({ type: "data", source: "**/portfolio.json", schema: loose }),
    workExperience: defineCollection({ type: "data", source: "**/workExperience.json", schema: loose }),
    qualifications: defineCollection({ type: "data", source: "**/qualifications.json", schema: loose }),
    site: defineCollection({ type: "data", source: "**/site.json", schema: loose }),
  },
});
