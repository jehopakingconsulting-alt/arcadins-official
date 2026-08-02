/**
 * ARCADINS — CŒUR COMMERCIAL des Programmes officiels (TEF & TCF Canada).
 * PUR / déterministe / node-testable. Imports RELATIFS uniquement, AUCUNE I/O.
 *
 * Encode les règles commerciales CONFIRMÉES par le propriétaire (2026-08-02) :
 *   1. Devise : USD.
 *   2. Tiers (one-time) : Starter $97 · Essential $147 · Premium $247 · VIP $347.
 *   3. Frais d'inscription : $100, UNIQUES et GLOBAUX (une seule fois par étudiant,
 *      jamais deux fois, tous programmes confondus).
 *   4. Paiement : intégral (pas d'échelonnement pour TEF/TCF).
 *
 * Ce module est la SOURCE DE VÉRITÉ des prix côté serveur : le prix ne doit JAMAIS
 * provenir du navigateur. La route de checkout et le webhook composent leurs
 * montants à partir d'ici. Séparé des Formations professionnelles (CAD, échelonné).
 */

import type { EntitlementGrant } from "../catalog/types.ts";

export type ProgramCode = "tef-canada" | "tcf-canada";
export type PackageKey = "starter" | "essential" | "premium" | "vip";

export const PROGRAM_CURRENCY = "usd";
/** Frais d'inscription UNIQUES et GLOBAUX (une fois par étudiant, tous programmes). */
export const REGISTRATION_FEE_CENTS = 10_000; // $100.00

export interface ProgramOffer {
  packageKey: PackageKey;
  name: string;
  /** Montant en cents USD — autorité serveur. */
  amountCents: number;
  /** Fenêtre d'accès en semaines (cohérent avec le seed catalogue + program-plans). */
  accessWeeks: number;
}

/** Libellés publics des programmes (Département A). */
export const PROGRAM_NAMES: Record<ProgramCode, string> = {
  "tef-canada": "TEF Canada",
  "tcf-canada": "TCF Canada",
};

/**
 * Tiers officiels (USD, one-time). Identiques pour TEF et TCF (forfaits des
 * Programmes officiels de langue). Valeurs = baseline V1 confirmée.
 */
const TIERS: ProgramOffer[] = [
  { packageKey: "starter", name: "Starter", amountCents: 9_700, accessWeeks: 6 },
  { packageKey: "essential", name: "Essential", amountCents: 14_700, accessWeeks: 6 },
  { packageKey: "premium", name: "Premium", amountCents: 24_700, accessWeeks: 6 },
  { packageKey: "vip", name: "VIP", amountCents: 34_700, accessWeeks: 12 },
];

export const PROGRAM_OFFERS: Record<ProgramCode, ProgramOffer[]> = {
  "tef-canada": TIERS,
  "tcf-canada": TIERS,
};

export function isProgramCode(v: string): v is ProgramCode {
  return v === "tef-canada" || v === "tcf-canada";
}

/**
 * Droits (grants) composables par forfait — SOURCE DE VÉRITÉ serveur, alignée sur
 * le seed catalogue (tef-commerce.reference.sql). Le webhook les compose en un
 * entitlement figé (composeEntitlements) au moment de l'inscription. `product_access`
 * cible le programme acheté → un achat TEF ne débloque QUE TEF (séparation stricte).
 */
export function getProgramGrants(program: string, packageKey: string): EntitlementGrant[] | null {
  const offer = getProgramOffer(program, packageKey);
  if (!offer || !isProgramCode(program)) return null;
  const weeks = offer.accessWeeks;
  const access: EntitlementGrant = { type: "product_access", productSlug: program, accessModel: "limited", weeks };

  switch (offer.packageKey) {
    case "starter":
      return [access, { type: "mock_exam_pack", attempts: 1 }, { type: "support_level", level: "standard" }];
    case "essential":
      return [access, { type: "mock_exam_pack", attempts: 2 }, { type: "downloadable_resources", scope: "all" }, { type: "support_level", level: "standard" }];
    case "premium":
      return [access, { type: "mock_exam_pack", attempts: 3 }, { type: "coaching_hours", hours: 2 }, { type: "downloadable_resources", scope: "all" }, { type: "support_level", level: "priority" }];
    case "vip":
      return [access, { type: "mock_exam_pack", attempts: 6 }, { type: "coaching_hours", hours: 4 }, { type: "tutoring_sessions", sessions: 2 }, { type: "ai_assistant", quota: "unlimited" }, { type: "downloadable_resources", scope: "all" }, { type: "support_level", level: "vip" }];
  }
}

export function getProgramOffer(program: string, packageKey: string): ProgramOffer | null {
  if (!isProgramCode(program)) return null;
  return PROGRAM_OFFERS[program].find((o) => o.packageKey === packageKey) ?? null;
}

export type CheckoutLineItemKind = "registration_fee" | "package";

export interface CheckoutLineItem {
  kind: CheckoutLineItemKind;
  label: string;
  amountCents: number;
}

export interface ProgramCheckoutMetadata {
  type: "program-purchase";
  program: ProgramCode;
  packageKey: PackageKey;
  offerName: string;
  userId: string;
  /** true ⇒ le frais d'inscription global est facturé dans CETTE session. */
  registrationFeeIncluded: boolean;
  accessWeeks: string;
}

export interface ProgramCheckoutPlan {
  ok: boolean;
  error?: string;
  program?: ProgramCode;
  packageKey?: PackageKey;
  currency: string;
  /** Mode de paiement Stripe : TEF/TCF = intégral, jamais d'abonnement. */
  mode: "payment";
  lineItems: CheckoutLineItem[];
  totalCents: number;
  registrationFeeIncluded: boolean;
  metadata?: ProgramCheckoutMetadata;
}

export interface BuildCheckoutInput {
  program: string;
  packageKey: string;
  userId: string;
  /** Décision serveur : l'étudiant a-t-il DÉJÀ payé le frais d'inscription global ? */
  registrationFeeAlreadyPaid: boolean;
}

/**
 * Construit le plan de checkout (prix ENTIÈREMENT côté serveur) pour un programme
 * officiel. Le frais d'inscription global n'est ajouté que si l'étudiant ne l'a pas
 * déjà payé (règle « une seule fois, tous programmes confondus »).
 */
export function buildProgramCheckoutPlan(input: BuildCheckoutInput): ProgramCheckoutPlan {
  const empty: ProgramCheckoutPlan = {
    ok: false,
    currency: PROGRAM_CURRENCY,
    mode: "payment",
    lineItems: [],
    totalCents: 0,
    registrationFeeIncluded: false,
  };

  if (!input.userId) return { ...empty, error: "unauthenticated" };
  if (!isProgramCode(input.program)) return { ...empty, error: "unknown_program" };

  const offer = getProgramOffer(input.program, input.packageKey);
  if (!offer) return { ...empty, error: "unknown_package" };

  const feeIncluded = !input.registrationFeeAlreadyPaid;
  const lineItems: CheckoutLineItem[] = [];

  if (feeIncluded) {
    lineItems.push({
      kind: "registration_fee",
      label: "Frais d'inscription ARCADINS (unique)",
      amountCents: REGISTRATION_FEE_CENTS,
    });
  }
  lineItems.push({
    kind: "package",
    label: `${PROGRAM_NAMES[input.program]} — ${offer.name}`,
    amountCents: offer.amountCents,
  });

  const totalCents = lineItems.reduce((sum, li) => sum + li.amountCents, 0);

  return {
    ok: true,
    program: input.program,
    packageKey: offer.packageKey,
    currency: PROGRAM_CURRENCY,
    mode: "payment",
    lineItems,
    totalCents,
    registrationFeeIncluded: feeIncluded,
    metadata: {
      type: "program-purchase",
      program: input.program,
      packageKey: offer.packageKey,
      offerName: offer.name,
      userId: input.userId,
      registrationFeeIncluded: feeIncluded,
      accessWeeks: String(offer.accessWeeks),
    },
  };
}
