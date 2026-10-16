export type ProjectKind = "product" | "client";

export interface IProjectMetric {
  value: string;
  label: string;
}

export interface IPortfolioItem {
  id: string;
  /** "product" = built and run by EZdev; "client" = client work */
  kind: ProjectKind;
  title: string;
  /** e.g. "SaaS", "E-commerce", "Marketing agency" */
  category?: string;
  description: string;
  link: string;
  image: string;
  /** Products only; rendered only when `value` is non-empty */
  metric?: IProjectMetric;
  stack?: string[];
  referralLetter?: string;
}
