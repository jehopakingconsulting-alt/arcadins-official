/**
 * ARCADINS — Catalogue générique (plateforme). AUCUN produit spécifique ici.
 * Product → Program → (program_versions) → Curriculum. TEF/TCF/langues/certifs = données.
 * PUR / node-testable. Imports RELATIFS uniquement.
 */

export type ProductStatus = "draft" | "active" | "archived";
export type Billing = "one_time" | "subscription";
export type BillingInterval = "month" | "year";
export type SupportLevel = "standard" | "priority" | "vip";

/** Identité pédagogique (parcours). */
export interface Program {
  id: string;
  slug: string;
  title: string;
  kind: string;
  activeVersionId: string | null;
}

/** Identité commerciale distincte (un produit livre un programme). */
export interface Product {
  id: string;
  slug: string;
  programId: string;
  title: string;
  subtitle?: string | null;
  kind: string;
  status: ProductStatus;
  /** Formulation légalement sûre (ex. « Attestation de complétion »). */
  certificateWording: string;
  sort: number;
}

/** Niveau de service/accès d'un produit (Starter/Essential/… en donnée). */
export interface ProductPackage {
  id: string;
  productId: string;
  tier: string;
  name: string;
  accessWeeks: number;
  mockAttempts: number;
  coachingHours: number;
  supportLevel: SupportLevel;
  perks: string[];
  sort: number;
  active: boolean;
}

/** Tarif configurable (multi-devise, one-time/abonnement, promo datée). */
export interface ProductPrice {
  id: string;
  packageId: string;
  currency: string;
  amountCents: number;
  billing: Billing;
  interval?: BillingInterval | null;
  /** Config externe Stripe — jamais de logique métier ici. */
  stripePriceId?: string | null;
  promoLabel?: string | null;
  promoStarts?: string | null;
  promoEnds?: string | null;
  active: boolean;
}

/** Snapshot de droits figé à l'inscription. */
export interface Entitlement {
  accessWeeks: number;
  mockAttempts: number;
  coachingHours: number;
  supportLevel: SupportLevel;
  accessStartsAt: string;
  accessExpiresAt: string;
}
