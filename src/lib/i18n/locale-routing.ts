/**
 * ARCADINS Training Center — Routage par locale (canonique /fr /en /es), PUR.
 * Réutilise l'i18n existant (Lang). Rétro-compatible : les URLs SANS préfixe restent
 * valides (deep-link préservé). Déterministe, sans I/O. Imports RELATIFS (node-testable).
 */
import type { Lang } from "../i18n.ts";

/** Locales avec URL canonique dédiée. Les autres langues (it/pt/de/ht) restent commutables côté client. */
export const ROUTED_LOCALES = ["fr", "en", "es"] as const;
export type RoutedLocale = (typeof ROUTED_LOCALES)[number];
export const DEFAULT_LOCALE: RoutedLocale = "fr";

export function isRoutedLocale(v: string | null | undefined): v is RoutedLocale {
  return v === "fr" || v === "en" || v === "es";
}

/** Sépare un préfixe de locale d'un chemin. `/fr/faq` → { locale:"fr", path:"/faq" }. Sans préfixe → { locale:null, path } (rétro-compatible). */
export function stripLocale(pathname: string): { locale: RoutedLocale | null; path: string } {
  const seg = pathname.split("/")[1];
  if (isRoutedLocale(seg)) {
    const rest = pathname.slice(seg.length + 1);
    return { locale: seg, path: rest === "" ? "/" : rest };
  }
  return { locale: null, path: pathname || "/" };
}

/** Ajoute un préfixe de locale à un chemin (idempotent : retire d'abord tout préfixe existant). */
export function withLocale(locale: RoutedLocale, pathname: string): string {
  const { path } = stripLocale(pathname);
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Détecte la locale : cookie > Accept-Language > défaut. PUR (entrées fournies par l'appelant). */
export function detectLocale(acceptLanguage?: string | null, cookie?: string | null): RoutedLocale {
  if (isRoutedLocale(cookie)) return cookie;
  if (acceptLanguage) {
    for (const part of acceptLanguage.split(",")) {
      const code = part.trim().slice(0, 2).toLowerCase();
      if (isRoutedLocale(code)) return code;
    }
  }
  return DEFAULT_LOCALE;
}

export interface LocaleAlternates {
  canonical: string;
  languages: Record<string, string>; // { fr, en, es, "x-default" }
}

/** Construit canonical + hreflang pour un chemin (sans préfixe). SEO multilingue. */
export function localeAlternates(baseUrl: string, path: string, current: RoutedLocale = DEFAULT_LOCALE): LocaleAlternates {
  const base = baseUrl.replace(/\/$/, "");
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of ROUTED_LOCALES) languages[l] = `${base}/${l}${clean}`;
  languages["x-default"] = `${base}/${DEFAULT_LOCALE}${clean}`;
  return { canonical: `${base}/${current}${clean}`, languages };
}

/** Convertit une Lang (7 langues) vers la locale routable la plus proche (repli défaut). */
export function toRoutedLocale(lang: Lang): RoutedLocale {
  return isRoutedLocale(lang) ? lang : DEFAULT_LOCALE;
}
