import { translations, type SupportedLang } from "assets/config/translations";

export type InterpolateParams = Record<string, string | number | boolean>;

const interpolate = (template: string, params?: InterpolateParams): string => {
  if (!params) return template;
  return template.replace(/\{(.*?)\}/g, (_, key) => {
    const k = String(key).trim();
    return params[k] !== undefined ? String(params[k]) : `{${k}}`;
  });
};

/**
 * UI string lookup. The site is English-only: `t()` reads the EN map and
 * `getLang()` always returns "en" (kept for callers such as useSeo and
 * useContent).
 */
export default () => {
  const { isTranslationDebug } = useDevTools();
  const en = translations.get("en");

  const getLang = (): SupportedLang => "en";

  const t = (
    key: string,
    params?: InterpolateParams,
    fallback?: string,
  ): string => {
    // If translation debug is enabled, return key with status
    if (isTranslationDebug.value) {
      const value = en?.get(key) ?? fallback;

      // Log to console when in debug mode
      console.log(
        `[Translation Debug] Key: ${key}, Translation: ${value ?? "unset"}`,
      );

      return `${key}|${value ? "1" : "0"}`;
    }
    return interpolate(String(en?.get(key) ?? fallback ?? key), params);
  };

  return { t, getLang };
};
