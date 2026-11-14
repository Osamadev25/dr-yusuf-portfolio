import { useCallback, useEffect, useState } from "react";
import {
  defaultLanguage,
  getTranslation,
  languages,
  localize,
} from "../i18n/translations";

const STORAGE_KEY = "dr-yusuf-language";

export function useLanguage() {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ar") return saved;
    } catch {
      /* ignore */
    }
    return defaultLanguage;
  });

  useEffect(() => {
    const meta = languages[lang] ?? languages.en;
    document.documentElement.lang = meta.code;
    document.documentElement.dir = meta.direction;
    document.title = getTranslation(lang, "seo.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", getTranslation(lang, "seo.description"));
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", getTranslation(lang, "seo.title"));
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", getTranslation(lang, "seo.description"));
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute("content", lang === "ar" ? "ar_YE" : "en_US");
    document
      .querySelector('meta[property="og:locale:alternate"]')
      ?.setAttribute("content", lang === "ar" ? "en_US" : "ar_YE");
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", getTranslation(lang, "seo.title"));
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", getTranslation(lang, "seo.description"));
    try {
      localStorage.setItem(STORAGE_KEY, meta.code);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (path, fallback = "") => getTranslation(lang, path, fallback),
    [lang],
  );

  const l = useCallback((value) => localize(value, lang), [lang]);

  return {
    lang,
    setLang,
    t,
    l,
    dir: (languages[lang] ?? languages.en).direction,
  };
}
