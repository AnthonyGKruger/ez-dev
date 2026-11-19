import { z } from "zod";

// One schema per content/en/*.json file. Types are inferred from these, and
// `npm run check:content` validates the files before every build.

export const skillsSchema = z.object({
  groups: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
});

export const projectSchema = z.object({
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
});

export const portfolioSchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string(),
  projects: z.array(projectSchema),
});

export const privacySchema = z.object({
  eyebrow: z.string(),
  heading: z.string(),
  intro: z.string(),
  lastUpdated: z.string(),
  topics: z.array(z.object({ num: z.string(), title: z.string(), body: z.string() })),
  contact: z.object({ label: z.string(), text: z.string(), email: z.string() }),
});

export const workExperienceSchema = z.object({
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

export const qualificationsSchema = z.object({
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
    z.object({ id: z.string(), title: z.string(), institution: z.string(), link: z.string() }),
  ),
  nsc: z.object({ title: z.string(), meta: z.string() }),
});

const field = z.object({ label: z.string(), placeholder: z.string() });

export const siteSchema = z.object({
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
      // Supports the {years} token, filled in at render time.
      lead: z.string(),
      ctaPrimary: z.string(),
      ctaSecondary: z.string(),
      stats: z.array(z.object({ value: z.string(), label: z.string() })),
      showcase: z.array(
        z.object({ domain: z.string(), caption: z.string(), image: z.string(), alt: z.string() }),
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
      points: z.array(z.object({ title: z.string(), body: z.string() })),
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
    stack: z.object({ eyebrow: z.string(), title: z.string(), lead: z.string() }),
    services: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(
        z.object({ slug: z.string(), title: z.string(), body: z.string(), proof: z.string() }),
      ),
    }),
  }),
  companies: z.object({
    items: z.array(
      z.object({
        name: z.string(),
        logo: z.string(),
        width: z.number().optional(),
        height: z.number().optional(),
      }),
    ),
  }),
  about: z.object({
    eyebrow: z.string(),
    headline: z.string(),
    headlineAccent: z.string(),
    paragraphs: z.array(z.string()),
    ctaChat: z.string(),
    ctaWork: z.string(),
    // icon: an Iconify name from src/lib/icons.json, e.g. "mdi:school".
    factCards: z.array(z.object({ icon: z.string(), title: z.string(), desc: z.string() })),
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

export const uiSchema = z.object({
  pageTitles: z.object({
    home: z.string(),
    about: z.string(),
    portfolio: z.string(),
    contact: z.string(),
    workExperience: z.string(),
    qualifications: z.string(),
    privacy: z.string(),
    thankYou: z.string(),
  }),
  pageDescriptions: z.object({
    portfolio: z.string(),
    contact: z.string(),
    thankYou: z.string(),
  }),
  footerLinks: z.object({ experience: z.string(), qualifications: z.string() }),
  cookie: z.object({
    title: z.string(),
    text: z.string(),
    privacyLink: z.string(),
    accept: z.string(),
  }),
  scrollToTop: z.string(),
  contactMessages: z.object({
    sent: z.string(),
    failed: z.string(),
    verificationRequired: z.string(),
    verificationFailed: z.string(),
  }),
  contactErrors: z.object({
    nameInvalid: z.string(),
    nameTooShort: z.string(),
    nameTooLong: z.string(),
    companyRequired: z.string(),
    companyTooShort: z.string(),
    companyTooLong: z.string(),
    companyInvalid: z.string(),
    commentsRequired: z.string(),
    commentsTooShort: z.string(),
    commentsTooLong: z.string(),
    commentsInvalid: z.string(),
    emailInvalid: z.string(),
  }),
  errorPage: z.object({
    notFoundTitle: z.string(),
    notFoundSubtitle: z.string(),
    title: z.string(),
    subtitle: z.string(),
    goHome: z.string(),
  }),
});

export const contentSchemas = {
  site: siteSchema,
  skills: skillsSchema,
  portfolio: portfolioSchema,
  workExperience: workExperienceSchema,
  qualifications: qualificationsSchema,
  privacy: privacySchema,
  ui: uiSchema,
};
