import { defineContentConfig, defineCollection, z } from "@nuxt/content";

/**
 * One data collection per content type. Each `source` glob matches both locale
 * directories (content/en/<type>.json and content/af/<type>.json); the locale
 * is derived from the document stem at read time in plugins/content.ts.
 *
 * Schemas mirror types/content.ts. They drive validation AND the Nuxt Studio
 * form editor, so keep the two in sync.
 */

const skills = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  flipHint: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      icon: z.string(),
      description: z.string(),
    }),
  ),
  alsoComfortableLabel: z.string(),
  alsoComfortable: z.array(z.string()),
});

const portfolio = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string(),
  labels: z.object({
    visit: z.string(),
    code: z.string(),
    referralLetter: z.string(),
    screenshot: z.string(),
  }),
  viewAll: z.object({
    label: z.string(),
    text: z.string(),
  }),
  projects: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      link: z.string(),
      image: z.string(),
      sourceCode: z.string().optional(),
      referralLetter: z.string().optional(),
    }),
  ),
});

const languages = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  tagline: z.string(),
  items: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      level: z.string(),
      pct: z.string(),
      note: z.string(),
    }),
  ),
});

const privacy = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string(),
  lastUpdated: z.string(),
  topics: z.array(
    z.object({
      num: z.string(),
      title: z.string(),
      body: z.string(),
    }),
  ),
  contact: z.object({
    label: z.string(),
    text: z.string(),
    email: z.string(),
  }),
});

const workExperience = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  tagline: z.string(),
  entries: z.array(
    z.object({
      id: z.string(),
      company: z.string(),
      role: z.string(),
      summary: z.string().nullable(),
      dateFrom: z.string(),
      dateTo: z.string(),
      comments: z.array(z.string()),
    }),
  ),
});

const qualifications = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  tagline: z.string(),
  featured: z.object({
    period: z.string(),
    title: z.string(),
    saqa: z.string(),
    tags: z.array(z.string()),
  }),
  certsLabel: z.string(),
  certs: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      institution: z.string(),
      link: z.string(),
    }),
  ),
  nsc: z.object({
    title: z.string(),
    meta: z.string(),
  }),
});

const field = z.object({ label: z.string(), placeholder: z.string() });

const site = z.object({
  hero: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    headlineAccent: z.string(),
    lead: z.string(),
    ctaWork: z.string(),
    ctaTouch: z.string(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })),
    specTop: z.array(z.string()),
    specBottom: z.array(z.string()),
  }),
  companies: z.object({
    heading: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        logo: z.string(),
        // Intrinsic image dimensions; reserve layout before the logo loads
        // so the marquee track width doesn't shift mid-animation.
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    ),
  }),
  about: z.object({
    eyebrow: z.string(),
    photoName: z.string(),
    photoLocation: z.string(),
    headline: z.string(),
    headlineAccent: z.string(),
    paragraphs: z.array(z.string()),
    ctaChat: z.string(),
    ctaWork: z.string(),
    factCards: z.array(
      z.object({ icon: z.string(), title: z.string(), desc: z.string() }),
    ),
  }),
  contact: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    subtitle: z.string(),
    reachMeAt: z.string(),
    form: z.object({
      name: field,
      email: field,
      company: field,
      details: field,
      submit: z.string(),
    }),
    cta: z.object({
      heading: z.string(),
      subtitle: z.string(),
      button: z.string(),
    }),
  }),
  thankYou: z.object({
    eyebrow: z.string(),
    heading: z.string(),
    message: z.string(),
    ctaHome: z.string(),
    ctaWork: z.string(),
  }),
});

export default defineContentConfig({
  collections: {
    skills: defineCollection({ type: "data", source: "**/skills.json", schema: skills }),
    portfolio: defineCollection({ type: "data", source: "**/portfolio.json", schema: portfolio }),
    workExperience: defineCollection({ type: "data", source: "**/workExperience.json", schema: workExperience }),
    qualifications: defineCollection({ type: "data", source: "**/qualifications.json", schema: qualifications }),
    site: defineCollection({ type: "data", source: "**/site.json", schema: site }),
    languages: defineCollection({ type: "data", source: "**/languages.json", schema: languages }),
    privacy: defineCollection({ type: "data", source: "**/privacy.json", schema: privacy }),
  },
});
