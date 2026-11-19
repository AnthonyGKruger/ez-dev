import type { z } from "zod";
import type {
  portfolioSchema,
  privacySchema,
  projectSchema,
  qualificationsSchema,
  siteSchema,
  skillsSchema,
  uiSchema,
  workExperienceSchema,
} from "./schema";
import portfolioJson from "../../content/en/portfolio.json";
import privacyJson from "../../content/en/privacy.json";
import qualificationsJson from "../../content/en/qualifications.json";
import siteJson from "../../content/en/site.json";
import skillsJson from "../../content/en/skills.json";
import uiJson from "../../content/en/ui.json";
import workExperienceJson from "../../content/en/workExperience.json";

// TypeScript checks the JSON's shape against the schema types here;
// `bun run check:content` validates the values before each build.
export type SiteContent = z.infer<typeof siteSchema>;
export type Project = z.infer<typeof projectSchema>;
export type WorkLabels = SiteContent["home"]["work"];

export const site: SiteContent = siteJson;
export const ui: z.infer<typeof uiSchema> = uiJson;
export const skills: z.infer<typeof skillsSchema> = skillsJson;
export const portfolio = portfolioJson as z.infer<typeof portfolioSchema>;
export const workExperience: z.infer<typeof workExperienceSchema> = workExperienceJson;
export const qualifications: z.infer<typeof qualificationsSchema> = qualificationsJson;
export const privacy: z.infer<typeof privacySchema> = privacyJson;

export interface WorkItem extends Project {
  index: string;
  /** Bare domain for the browser chrome and Visit label, e.g. "votera.co.za" */
  domain: string;
}

const group = (kind: Project["kind"]): WorkItem[] =>
  portfolio.projects
    .filter((p) => p.kind === kind)
    .map((p, i) => ({
      ...p,
      index: String(i + 1).padStart(2, "0"),
      domain: p.link.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, ""),
    }));

export const products = group("product");
export const clients = group("client");

/** Years since Anthony started building (2020); fills the {years} token. */
export const withYears = (s: string) =>
  s.replace("{years}", String(new Date().getFullYear() - 2020));
