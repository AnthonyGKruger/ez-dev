import { translations, type SupportedLang } from "assets/config/translations";

const LS_LANG_KEY = "ezdev-lang";

export type InterpolateParams = Record<string, string | number | boolean>;

const interpolate = (template: string, params?: InterpolateParams): string => {
  if (!params) return template;
  return template.replace(/\{(.*?)\}/g, (_, key) => {
    const k = String(key).trim();
    return params[k] !== undefined ? String(params[k]) : `{${k}}`;
  });
};

export default () => {
  const savedLang = useCookie<SupportedLang>(LS_LANG_KEY, {
    default: () => "en",
    watch: true,
  });
  const lang = useState<SupportedLang>("i18n-lang", () => savedLang.value);

  const { isTranslationDebug } = useDevTools();

  const setLang = (next: SupportedLang) => {
    lang.value = next;
    savedLang.value = next;
  };

  const getLang = (): SupportedLang => {
    return lang.value;
  };

  const t = (
    key: string,
    params?: InterpolateParams,
    fallback?: string,
  ): string => {
    // If translation debug is enabled, return key with status
    if (isTranslationDebug.value) {
      const current = translations.get(lang.value);
      const en = translations.get("en");
      const hasTranslation = !!(current?.get(key) ?? en?.get(key) ?? fallback);

      // Log to console when in debug mode
      console.log(
        `[Translation Debug] Key: ${key}, Translation: ${hasTranslation ? (current?.get(key) ?? en?.get(key) ?? fallback) : "unset"}`,
      );

      return `${key}|${hasTranslation ? "1" : "0"}`;
    }
    const current = translations.get(lang.value);
    const en = translations.get("en");
    let result = current?.get(key) ?? en?.get(key) ?? fallback ?? key;
    result = interpolate(String(result), params);
    return result;
  };

  const available = Object.freeze<SupportedLang[]>(["en", "af"]);

  return { t, lang, setLang, getLang, available };
};
