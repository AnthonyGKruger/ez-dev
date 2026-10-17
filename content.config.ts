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
      // Display label, e.g. "Next.js" (name is the lowercase id).
      label: z.string().optional(),
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
  projects: z.array(
    z.object({
      id: z.string(),
      // "product" = built and run by EZdev; "client" = client work.
      kind: z.enum(["product", "client"]),
      title: z.string(),
      category: z.string().optional(),
      description: z.string(),
      link: z.string(),
      image: z.string(),
      // Products only; rendered only when value is non-empty.
      metric: z.object({ value: z.string(), label: z.string() }).optional(),
      stack: z.array(z.string()).optional(),
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
  banner: z.object({ available: z.string() }),
  nav: z.object({
    work: z.string(),
    services: z.string(),
    about: z.string(),
    contact: z.string(),
    cta: z.string(),
    menuOpen: z.string(),
    menuClose: z.string(),
  }),
  footer: z.object({
    blurb: z.string(),
    siteHeading: z.string(),
    productsHeading: z.string(),
    productsNote: z.string(),
    contactHeading: z.string(),
    contactForm: z.string(),
    location: z.string(),
    // Supports the {year} token.
    copyright: z.string(),
    privacy: z.string(),
  }),
  home: z.object({
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      titleAccent: z.string(),
      // Supports the {years} token, interpolated at render time.
      lead: z.string(),
      ctaPrimary: z.string(),
      ctaSecondary: z.string(),
      stats: z.array(z.object({ value: z.string(), label: z.string() })),
      showcase: z.array(
        z.object({
          domain: z.string(),
          caption: z.string(),
          image: z.string(),
          alt: z.string(),
        }),
      ),
    }),
    trusted: z.object({ label: z.string() }),
    work: z.object({
      eyebrow: z.string(),
      title: z.string(),
      products: z.string(),
      clients: z.string(),
      productBadge: z.string(),
      clientLabel: z.string(),
      all: z.string(),
      visit: z.string(),
      referral: z.string(),
    }),
    about: z.object({
      eyebrow: z.string(),
      title: z.string(),
      body: z.array(z.string()),
      caption: z.string(),
      role: z.string(),
      photoAlt: z.string(),
      cta: z.string(),
    }),
    cta: z.object({
      eyebrow: z.string(),
      title: z.string(),
      titleAccent: z.string(),
      reply: z.string(),
      email: z.string(),
      button: z.string(),
    }),
    stack: z.object({
      eyebrow: z.string(),
      title: z.string(),
      alsoLabel: z.string(),
    }),
    services: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(
        z.object({
          slug: z.string(),
          title: z.string(),
          body: z.string(),
          proof: z.string(),
        }),
      ),
    }),
  }),
  companies: z.object({
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
      verify: z.object({ label: z.string() }),
      submit: z.string(),
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
