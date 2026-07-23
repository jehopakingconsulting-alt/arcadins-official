export interface Program {
  id: string;
  slug: string;
  icon: string;
  category: string;
  categoryLabel: string;
  name: string;
  description: string;
  longDescription: string;
  duration: string;
  certification: string;
  price: number;
  modules: string[];
  comingSoon?: boolean;
}

export interface Testimonial {
  stars: number;
  text: string;
  initials: string;
  name: string;
  from: string;
}

export interface VideoItem {
  id: string;
  chip: string;
  title: string;
  desc: string;
  thumb: string;
}

export interface PricingPlan {
  badge: string;
  name: string;
  description: string;
  priceMonthly: number | null;
  priceAnnual: number | null;
  currency: string;
  features: { text: string; included: boolean }[];
  featured: boolean;
  cta: string;
}

/**
 * Une accréditation / reconnaissance officielle VÉRIFIABLE.
 * Règle de conformité : n'afficher un badge que si `verified === true` ET
 * qu'une preuve publique (`proofUrl`) est fournie. Aucune accréditation ne doit
 * être inventée — la liste reste vide tant qu'aucune preuve n'existe.
 */
export interface Accreditation {
  /** Nom de l'accréditation ou de l'organisme reconnaissant. */
  name: string;
  /** Organisme émetteur (autorité qui délivre la reconnaissance). */
  issuer: string;
  /** Vérifiée avec preuve à l'appui. Un badge ne s'affiche que si true. */
  verified: boolean;
  /** Lien public permettant de vérifier la reconnaissance (obligatoire si affichée). */
  proofUrl?: string;
  /** Numéro / identifiant de l'accréditation, s'il existe. */
  reference?: string;
  /** Courte description de ce que couvre l'accréditation. */
  description?: string;
}

export interface NavItem {
  id: string;
  href: string;
  label: Record<string, string>;
  icon: React.ReactNode;
}

export interface SlideData {
  image: string;
  fallbackColor: string;
  labelIcon: string;
  labelText: string;
}
