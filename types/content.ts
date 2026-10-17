import type { IPortfolioItem } from "./portfolio";

/**
 * Content models for the JSON content layer (content/en/*.json).
 *
 * Content is read through the `useContent()` composable. Components consume
 * these typed shapes and never import raw JSON, so the backing store can
 * change without touching component code.
 */

export interface SkillItem {
  /** Lowercase id, e.g. "nuxt" */
  name: string;
  /** Display label, e.g. "Next.js" */
  label?: string;
  /** Iconify id, e.g. "skill-icons:nuxtjs-dark" */
  icon: string;
  /** One-line description of how we use it, shown on the /skills card */
  description: string;
}

export interface SkillsContent {
  eyebrow: string;
  heading: string;
  items: SkillItem[];
  alsoComfortableLabel: string;
  alsoComfortable: string[];
}

export type PortfolioProject = IPortfolioItem;

export interface PortfolioContent {
  eyebrow: string;
  heading: string;
  intro: string;
  projects: PortfolioProject[];
}

export interface WorkLabels {
  eyebrow: string;
  title: string;
  products: string;
  clients: string;
  productBadge: string;
  clientLabel: string;
  all: string;
  visit: string;
  referral: string;
}

export interface HeroStat {
  /** May contain the {years} token, interpolated at render time */
  value: string;
  label: string;
}

export interface ShowcaseItem {
  domain: string;
  caption: string;
  image: string;
  alt: string;
}

export interface HomeHeroContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  /** Lead paragraph; supports the {years} token */
  lead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: HeroStat[];
  showcase: ShowcaseItem[];
}

export interface HomeContent {
  hero: HomeHeroContent;
  trusted: { label: string };
  work: WorkLabels;
  stack: { eyebrow: string; title: string; alsoLabel: string };
  cta: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    reply: string;
    email: string;
    button: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string[];
    caption: string;
    role: string;
    photoAlt: string;
    cta: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: { slug: string; title: string; body: string; proof: string }[];
  };
}

export interface Company {
  name: string;
  logo: string;
  /** Intrinsic image dimensions, used to reserve layout before load */
  width?: number;
  height?: number;
}

export interface CompaniesContent {
  items: Company[];
}

export interface FactCard {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutContent {
  eyebrow: string;
  photoName: string;
  photoLocation: string;
  headline: string;
  headlineAccent: string;
  paragraphs: string[];
  ctaChat: string;
  ctaWork: string;
  factCards: FactCard[];
}

export interface ContactField {
  label: string;
  placeholder: string;
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  subtitle: string;
  reachMeAt: string;
  form: {
    name: ContactField;
    email: ContactField;
    company: ContactField;
    details: ContactField;
    submit: string;
  };
}

export interface ThankYouContent {
  eyebrow: string;
  heading: string;
  message: string;
  ctaHome: string;
  ctaWork: string;
}

export interface SiteContent {
  banner: { available: string };
  nav: {
    work: string;
    services: string;
    about: string;
    contact: string;
    cta: string;
    menuOpen: string;
    menuClose: string;
  };
  footer: {
    blurb: string;
    siteHeading: string;
    productsHeading: string;
    productsNote: string;
    contactHeading: string;
    contactForm: string;
    location: string;
    /** Supports the {year} token */
    copyright: string;
    privacy: string;
  };
  home: HomeContent;
  companies: CompaniesContent;
  about: AboutContent;
  contact: ContactContent;
  thankYou: ThankYouContent;
}

export interface PrivacyTopic {
  num: string;
  title: string;
  body: string;
}

export interface PrivacyContent {
  eyebrow: string;
  heading: string;
  intro: string;
  /** e.g. "LAST UPDATED 02/09/2025" */
  lastUpdated: string;
  topics: PrivacyTopic[];
  contact: {
    label: string;
    text: string;
    email: string;
  };
}

export interface WorkExperienceEntry {
  id: string;
  company: string;
  /** Localized role title */
  role: string;
  /** Localized summary; null when the entry has no description */
  summary: string | null;
  dateFrom: string;
  dateTo: string;
  /** Localized highlight badges */
  comments: string[];
}

export interface WorkExperienceContent {
  eyebrow: string;
  heading: string;
  tagline: string;
  entries: WorkExperienceEntry[];
}

export interface Certification {
  id: string;
  title: string;
  institution: string;
  link: string;
}

export interface QualificationsContent {
  eyebrow: string;
  heading: string;
  tagline: string;
  featured: {
    period: string;
    title: string;
    saqa: string;
    tags: string[];
  };
  certsLabel: string;
  certs: Certification[];
  nsc: {
    title: string;
    meta: string;
  };
}

/** Maps a content collection name to its shape (used by useContent). */
export interface ContentCollections {
  skills: SkillsContent;
  portfolio: PortfolioContent;
  site: SiteContent;
  workExperience: WorkExperienceContent;
  qualifications: QualificationsContent;
  privacy: PrivacyContent;
}
