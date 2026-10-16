import type { IPortfolioItem } from "~/types/portfolio";

export interface WorkItem extends IPortfolioItem {
  /** Position within its group, e.g. "01" */
  index: string;
  /** Bare domain for the browser chrome / Visit label, e.g. "votera.co.za" */
  domain: string;
}

/**
 * Portfolio projects split into EZdev's own products and client work,
 * plus the shared Work labels (site.json home.work). Used by the home Work
 * section and /portfolio.
 */
export default function useWork() {
  const portfolio = useContent("portfolio");
  const site = useContent("site");

  const group = (kind: IPortfolioItem["kind"]) =>
    computed<WorkItem[]>(() =>
      portfolio.value.projects
        .filter((p) => p.kind === kind)
        .map((p, i) => ({
          ...p,
          index: String(i + 1).padStart(2, "0"),
          domain: p.link.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, ""),
        })),
    );

  return {
    portfolio,
    labels: computed(() => site.value.home.work),
    products: group("product"),
    clients: group("client"),
  };
}
