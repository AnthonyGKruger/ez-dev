export default function useSeo() {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { t, getLang } = useTranslate();

  const origin = (config.public.siteUrl as string)?.replace(/\/$/, "") || "";
  // Canonical must not carry query strings or hashes — route.path only.
  const canonical = origin + (route.path || "/");

  /** og:image / twitter:image must be absolute URLs. */
  const absolute = (url: string) =>
    /^https?:\/\//.test(url) ? url : origin + url;

  const setSeo = (
    keyBase: string,
    overrides?: Partial<{ title: string; description: string; image: string }>,
  ) => {
    const title = overrides?.title ?? t(`${keyBase}-title`, undefined, "EZdev");
    const description =
      overrides?.description ??
      t(
        `${keyBase}-description`,
        undefined,
        config.public.siteDescription as unknown as string,
      );
    const image = absolute(
      overrides?.image ?? (config.public.siteImage as string),
    );

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogUrl: canonical,
      ogType: "website",
      ogSiteName: config.public.siteName as string,
      twitterCard: "summary_large_image",
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
    });

    useHead({
      htmlAttrs: {
        lang: getLang(),
      },
      // No hreflang alternates: the EN/AF switch is cookie-based on the same
      // URL, and hreflang requires distinct URLs per locale. The crawlable
      // content is English.
      link: [{ rel: "canonical", href: canonical }],
    });
  };

  return { setSeo };
}
