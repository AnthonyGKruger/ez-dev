/**
 * Content models for the JSON content layer (content/<locale>/*.json).
 *
 * Content is stored per-locale (content/en/*.json, content/af/*.json) and
 * read through the `useContent()` composable, which resolves the active
 * locale. Components consume these typed shapes and never import raw JSON,
 * so the backing store can later move to Nuxt Content / a CMS without
 * touching component code.
 */

export interface SkillItem {
  /** Display name, e.g. "nuxt" */
  name: string;
  /** Iconify id, e.g. "skill-icons:nuxtjs-dark" */
  icon: string;
  /** Localized one-line description shown on the flipped card */
  description: string;
}

export interface SkillsContent {
  eyebrow: string;
  heading: string;
  flipHint: string;
  items: SkillItem[];
  alsoComfortableLabel: string;
  alsoComfortable: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  /** Localized description */
  description: string;
  link: string;
  /** Public path to a logo/screenshot; empty string renders the placeholder card */
  image: string;
  sourceCode?: string;
  referralLetter?: string;
}

export interface PortfolioContent {
  eyebrow: string;
  heading: string;
  intro: string;
  /** Localized labels for the project-card action buttons and placeholder */
  labels: {
    visit: string;
    code: string;
    referralLetter: string;
    screenshot: string;
  };
  /** "See all work" strip shown under the home-page preview */
  viewAll: {
    label: string;
    text: string;
  };
  projects: PortfolioProject[];
}

export interface HeroStat {
  /** May contain the {years} token, interpolated at render time */
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  /** Lead paragraph; supports the {years} token */
  lead: string;
  ctaWork: string;
  ctaTouch: string;
  stats: HeroStat[];
  specTop: [string, string];
  specBottom: [string, string];
}

export interface Company {
  name: string;
  logo: string;
}

export interface CompaniesContent {
  heading: string;
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
  cta: {
    heading: string;
    subtitle: string;
    button: string;
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
  hero: HeroContent;
  companies: CompaniesContent;
  about: AboutContent;
  contact: ContactContent;
  thankYou: ThankYouContent;
}

export interface LanguageItem {
  /** Short code shown in the badge, e.g. "EN" */
  code: string;
  name: string;
  /** e.g. "FLUENT · NATIVE" */
  level: string;
  /** Proficiency shown next to the bar, e.g. "100%" */
  pct: string;
  /** Localized note under the proficiency bar */
  note: string;
}

export interface LanguagesContent {
  eyebrow: string;
  heading: string;
  tagline: string;
  items: LanguageItem[];
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
  languages: LanguagesContent;
  privacy: PrivacyContent;
}
