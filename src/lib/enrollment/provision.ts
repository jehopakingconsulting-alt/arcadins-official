/**
 * ARCADINS — Moteur de PROVISIONING d'inscription (générique, PUR, déterministe).
 * Relie le moteur commercial (S1 : offer/package/entitlement) au Learning Runtime.
 * À l'achat/attribution d'un produit → crée UNE inscription + fige l'entitlement +
 * calcule l'expiration. IDEMPOTENT : ne duplique jamais (une inscription par
 * user×product). Aucune I/O : la persistance est faite par un adaptateur en aval.
 *
 * Réutilise composeEntitlements/accessExpiry (S1). Aucun code spécifique produit.
 * Imports RELATIFS uniquement (node-testable).
 */
import type { ComposedEntitlement, Offer, Package } from "../catalog/types.ts";
import { composeEntitlements, accessExpiry } from "../catalog/entitlement.ts";

export type EnrollmentSource =
  | "one_time"
  | "subscription"
  | "lifetime"
  | "scholarship"
  | "corporate_license"
  | "institution_license";

export interface EnrollmentRecord {
  userId: string;
  learnerId: string;
  productId: string;
  packageId: string;
  offerId: string | null;
  programId: string | null;
  programVersionId: string | null;
  licenseId: string | null;
  status: "active" | "inactive" | "suspended" | "expired";
  entitlement: ComposedEntitlement;
  accessStartsAt: string;
  accessExpiresAt: string | null; // null = accès à vie
  source: EnrollmentSource;
  entityVersion: number;
}

export interface ProvisionContext {
  userId: string;
  learnerId: string;
  product: { id: string; programId: string | null };
  package: Package;
  offer: Offer | null; // null pour bourse/licence sans offre payante
  programVersionId?: string | null;
  licenseId?: string | null;
  source: EnrollmentSource;
  now: Date;
  /** Fin de période d'abonnement (si source=subscription) : sinon dérivé de l'accès. */
  subscriptionPeriodEnd?: Date | null;
}

/**
 * Provisionne une inscription de façon idempotente.
 * - `existing` = inscription déjà présente pour (userId, productId) → renvoyée telle quelle
 *   (created:false) : AUCUNE duplication, AUCUN reset de progression.
 * - Sinon, compose l'entitlement du package, surcharge le modèle d'accès par l'offre,
 *   calcule l'expiration selon la source (lifetime → null ; subscription → fin de période).
 */
export function provisionEnrollment(
  ctx: ProvisionContext,
  existing?: EnrollmentRecord | null,
): { record: EnrollmentRecord; created: boolean } {
  if (existing) return { record: existing, created: false };

  const entitlement = composeEntitlements(ctx.package.grants);
  // L'offre (si présente) fait autorité sur le modèle d'accès.
  if (ctx.offer) {
    entitlement.accessModel = ctx.offer.accessModel;
    entitlement.accessWeeks = ctx.offer.accessModel === "lifetime" ? null : (ctx.offer.accessWeeks ?? entitlement.accessWeeks);
  }

  const accessExpiresAt = computeExpiry(ctx, entitlement);

  const record: EnrollmentRecord = {
    userId: ctx.userId,
    learnerId: ctx.learnerId,
    productId: ctx.product.id,
    packageId: ctx.package.id,
    offerId: ctx.offer?.id ?? null,
    programId: ctx.product.programId,
    programVersionId: ctx.programVersionId ?? null,
    licenseId: ctx.licenseId ?? null,
    status: "active",
    entitlement,
    accessStartsAt: ctx.now.toISOString(),
    accessExpiresAt,
    source: ctx.source,
    entityVersion: 1,
  };
  return { record, created: true };
}

function computeExpiry(ctx: ProvisionContext, entitlement: ComposedEntitlement): string | null {
  switch (ctx.source) {
    case "lifetime":
      return null;
    case "subscription":
      // Accès rythmé par la période d'abonnement (renouvellement géré en aval par Stripe).
      return (ctx.subscriptionPeriodEnd ?? ctx.now).toISOString();
    default:
      // one_time / scholarship / licences : fenêtre d'accès de l'entitlement (ou lifetime).
      return accessExpiry(entitlement, ctx.now);
  }
}

/** L'accès d'une inscription est-il actif à `now` ? (décision serveur ; lifetime = toujours). */
export function isEnrollmentActive(record: EnrollmentRecord, now: Date): boolean {
  if (record.status !== "active") return false;
  if (record.accessExpiresAt == null) return true;
  return now <= new Date(record.accessExpiresAt);
}
