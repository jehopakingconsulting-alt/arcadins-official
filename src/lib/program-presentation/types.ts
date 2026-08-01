/**
 * ARCADINS — Contrat GÉNÉRIQUE de présentation d'un programme (marketing/vitrine).
 * Chaque futur programme (TEF, TCF, IELTS, CELPIP, anglais, espagnol, business, IA…)
 * fournit une instance de ce contrat ; les composants la rendent sans code spécifique.
 * i18n-ready : textes localisés FR/EN/ES via `Localized<T>`.
 */

export type Locale = "fr" | "en" | "es";
export type Localized<T = string> = Record<Locale, T>;

export interface PresentationCTA { label: Localized; href: string; variant?: "primary" | "outline" | "secondary" }

export interface HeroContent {
  eyebrow: Localized;
  title: Localized;
  highlight?: Localized; // portion mise en avant (italique doré)
  subtitle: Localized;
  primaryCta: PresentationCTA;
  secondaryCta?: PresentationCTA;
  stats?: { value: string; label: Localized }[];
}

export interface FeaturePoint { icon: string; title: Localized; body: Localized }

export interface EpreuveItem { icon: string; name: Localized; meta: Localized }

export interface PricingFeature { label: Localized; tiers: Record<string, boolean | string> } // clé = slug package

export interface PricingPackageView {
  slug: string;
  name: string;
  badge?: Localized;
  featured?: boolean;
  price: { amountCents: number; currency: string; billing: "one_time" | "subscription" | "lifetime"; interval?: "month" | "year" };
  tagline: Localized;
  highlights: Localized[];
  cta: PresentationCTA;
}

export interface TestimonialItem { quote: Localized; name: string; role: Localized; score?: string }

export interface FaqItem { q: Localized; a: Localized }

export interface ProgramPresentation {
  slug: string;
  productTitle: string;
  hero: HeroContent;
  about: { eyebrow: Localized; title: Localized; body: Localized; points: FeaturePoint[] };
  epreuves?: { eyebrow: Localized; title: Localized; items: EpreuveItem[] };
  pricing: { eyebrow: Localized; title: Localized; subtitle: Localized; packages: PricingPackageView[]; comparison: { featureLabel: Localized; features: PricingFeature[] } };
  testimonials?: { eyebrow: Localized; title: Localized; items: TestimonialItem[] };
  faq: { eyebrow: Localized; title: Localized; items: FaqItem[] };
  finalCta: { title: Localized; subtitle: Localized; primaryCta: PresentationCTA; secondaryCta?: PresentationCTA };
  seo: { title: Localized; description: Localized };
}

/** Résout un texte localisé (repli FR). PUR. */
export function tr<T>(loc: Localized<T>, locale: Locale): T {
  return loc[locale] ?? loc.fr;
}

/** Formate un prix (présentation). */
export function formatPrice(amountCents: number, currency: string): string {
  const amount = amountCents / 100;
  const symbol = currency === "CAD" ? "$" : currency === "EUR" ? "€" : "$";
  const suffix = currency === "USD" ? " USD" : currency === "CAD" ? " CAD" : "";
  return `${symbol}${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}${suffix}`;
}
