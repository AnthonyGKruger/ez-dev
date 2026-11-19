export const SITE_NAME = "EZdev Solutions";
export const SITE_URL = (
  import.meta.env.NUXT_PUBLIC_SITE_URL ||
  import.meta.env.VITE_SITE_URL ||
  "https://www.ezdev.solutions"
).replace(/\/$/, "");
export const SITE_DESCRIPTION =
  "We design, build and run our own SaaS and e-commerce products, and take on a small number of client projects.";
const OG_IMAGE = `${SITE_URL}/media/og-image.png`;

export const seo = ({
  title,
  description = SITE_DESCRIPTION,
  path,
  rawTitle = false,
  noindex = false,
}: {
  title: string;
  description?: string;
  path: string;
  rawTitle?: boolean;
  noindex?: boolean;
}) => {
  const fullTitle = rawTitle ? title : `${title} · ${SITE_NAME}`;
  const url = SITE_URL + path;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: url }],
  };
};
