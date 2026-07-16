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

export interface SiteContent {
  hero: HeroContent;
}

/** Maps a content collection name to its shape (used by useContent). */
export interface ContentCollections {
  skills: SkillsContent;
  portfolio: PortfolioContent;
  site: SiteContent;
}
