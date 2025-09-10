export default function useSeo() {
  const config = useRuntimeConfig();
  const route = useRoute();
  const { t, getLang } = useTranslate();

  const origin = (config.public.siteUrl as string)?.replace(/\/$/, "") || "";
  const canonical = origin + (route.fullPath || "/");

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
    const image = overrides?.image ?? (config.public.siteImage as string);

    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      twitterCard: "summary_large_image",
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
    });

    useHead({
      htmlAttrs: {
        lang: getLang(),
      },
      link: [
        { rel: "canonical", href: canonical },
        { rel: "alternate", hreflang: "en", href: origin + route.fullPath },
        { rel: "alternate", hreflang: "af", href: origin + route.fullPath },
      ],
    });
  };

  return { setSeo };
}
