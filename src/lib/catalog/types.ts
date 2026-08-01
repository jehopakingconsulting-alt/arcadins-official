/**
 * ARCADINS — Modèle commercial GÉNÉRIQUE & composable (plateforme). AUCUN produit
 * ni forfait codé en dur : tout est donnée (Back Office). PUR / node-testable.
 * Imports RELATIFS uniquement.
 *
 * Hiérarchie : Product → Program → (program_versions) → Curriculum.
 * Package = COMPOSITION de droits (grants). Offer = prix vendable. Réductions,
 * coupons, bourses, licences = configuration.
 */

export type ProductStatus = "draft" | "active" | "archived";
export type Billing = "one_time" | "subscription" | "lifetime";
export type BillingInterval = "month" | "year";
export type AccessModel = "limited" | "lifetime";
export type SupportLevel = "standard" | "priority" | "vip";
export type PackageKind = "single" | "bundle" | "addon" | "license_plan";

/** Rang des niveaux de support (pour composition « le plus élevé gagne »). */
export const SUPPORT_RANK: Record<SupportLevel, number> = { standard: 0, priority: 1, vip: 2 };

// ── Droits atomiques composables (extensibles : un add-on futur = un type de plus) ──
export type EntitlementGrant =
  | { type: "product_access"; productSlug?: string; accessModel: AccessModel; weeks?: number }
  | { type: "bundle_products"; productSlugs: string[] }
  | { type: "mock_exam_pack"; attempts: number }
  | { type: "coaching_hours"; hours: number }
  | { type: "tutoring_sessions"; sessions: number }
  | { type: "ai_assistant"; quota: "unlimited" | number } // number = quota mensuel
  | { type: "downloadable_resources"; scope: string }
  | { type: "support_level"; level: SupportLevel };

/** Droits COMPOSÉS (résultat de la composition d'une liste de grants). */
export interface ComposedEntitlement {
  productSlugs: string[];
  accessModel: AccessModel;
  accessWeeks: number | null; // null si lifetime
  mockAttempts: number;
  coachingHours: number;
  tutoringSessions: number;
  aiAssistant: "none" | "unlimited" | { perMonth: number };
  downloadableResources: string[];
  supportLevel: SupportLevel;
}

export interface Program { id: string; slug: string; title: string; kind: string; activeVersionId: string | null }

export interface Product {
  id: string; slug: string; programId: string | null; title: string; subtitle?: string | null;
  kind: string; status: ProductStatus; certificateWording: string; sort: number;
}

export interface Package {
  id: string; slug: string; productId: string | null; kind: PackageKind;
  name: string; description?: string | null; grants: EntitlementGrant[]; sort: number; active: boolean;
}

export interface Offer {
  id: string; sku: string; packageId: string; currency: string;
  countryScope: string[]; // vide = mondial
  amountCents: number; billing: Billing; interval?: BillingInterval | null;
  accessModel: AccessModel; accessWeeks?: number | null;
  stripePriceId?: string | null; activeFrom?: string | null; activeTo?: string | null; active: boolean;
}

export interface Discount {
  id: string; name: string; kind: "percent" | "fixed";
  value: number; // percent: bps (2500=25%) ; fixed: cents
  appliesScope: { productSlugs?: string[]; packageSlugs?: string[]; currencies?: string[] };
  startsAt?: string | null; endsAt?: string | null; maxRedemptions?: number | null; redemptions: number; active: boolean;
}

export interface Coupon { code: string; discountId: string; maxRedemptions?: number | null; perUserLimit: number; active: boolean }

export interface Scholarship {
  id: string; code?: string | null; kind: "full" | "partial"; percentBps?: number | null;
  orgId?: string | null; status: "active" | "revoked" | "expired"; startsAt?: string | null; endsAt?: string | null;
}

export interface Organization { id: string; kind: "institution" | "corporate" | "school" | "immigration_agency" | "partner"; name: string; country?: string | null; status: string }
export interface License { id: string; orgId: string; packageId: string; seats: number; seatsUsed: number; validFrom: string; validTo?: string | null; status: string }
export interface Country { code: string; name: string; defaultCurrency: string; taxBps: number; active: boolean }

// ── Devis (quote) ────────────────────────────────────────────────────────────
export interface QuoteContext {
  currency: string;
  country?: string | null;
  now: Date;
  taxBps?: number;
  campaignDiscount?: Discount | null;
  coupon?: { coupon: Coupon; discount: Discount; userRedemptions: number } | null;
  scholarship?: Scholarship | null;
}
export interface DiscountLine { source: "campaign" | "coupon" | "scholarship"; label: string; amountCents: number }
export interface PriceQuote {
  ok: boolean;
  errors: string[];
  currency: string;
  billing: Billing;
  baseCents: number;
  discountLines: DiscountLine[];
  discountedCents: number;
  taxCents: number;
  totalCents: number;
  entitlement: ComposedEntitlement;
}
