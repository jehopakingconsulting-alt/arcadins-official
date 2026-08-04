/**
 * ARCADINS — CŒUR COMMERCIAL des Formations professionnelles (Département B).
 * PUR / déterministe / node-testable. Rend le catalogue AUTONOME : paiement =
 * inscription (le webhook crée l'`enrollments` active → la route /formations/[slug]/learn
 * EXISTANTE débloque le contenu + progression + certificat).
 *
 * Règles (confirmées 2026-08-04) :
 *  - Prix 1500 CAD (source = programs.ts) + frais d'inscription 100 $ CAD UNIQUE &
 *    GLOBAL (une seule fois par étudiant, mutualisé TEF/TCF via registration_fee_payments).
 *  - 4 modalités : 1 versement · 3 versements égaux · 6 versements égaux ·
 *    financement externe BNPL (Klarna / Affirm / Afterpay — payé d'avance à ARCADINS).
 *  - Frais d'inscription toujours payé D'AVANCE (avec le 1er versement), jamais échelonné.
 *
 * Distinct de program-commerce.ts (TEF/TCF, USD, paiement unique). Imports RELATIFS.
 */
import { PROGRAMS } from "../data/programs.ts";

export const FORMATION_CURRENCY = "cad";
export const FORMATION_REGISTRATION_FEE_CENTS = 10_000; // 100,00 $ CAD, unique & global

/** Prestataires de financement externe (BNPL) recommandés — activables dans Stripe. */
export const FORMATION_BNPL_PROVIDERS = ["klarna", "affirm", "afterpay_clearpay"] as const;

export type FormationPlanId = "full" | "installments_3" | "installments_6";

export interface FormationOffer {
  slug: string;
  name: string;
  amountCents: number; // prix de la formation en cents CAD (hors frais)
}

export function getFormationOffer(slug: string): FormationOffer | null {
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p || p.comingSoon || !p.price || p.price <= 0) return null;
  return { slug: p.slug, name: p.name, amountCents: Math.round(p.price * 100) };
}

export function isSellableFormation(slug: string): boolean {
  return getFormationOffer(slug) !== null;
}

/** Répartit un montant en N versements ÉGAUX au cent près (le 1er absorbe le reste). */
export function splitEqual(amountCents: number, n: number): number[] {
  const base = Math.floor(amountCents / n);
  const first = amountCents - base * (n - 1);
  return [first, ...Array(n - 1).fill(base)];
}

export interface FormationPaymentOption {
  id: FormationPlanId;
  label: string;
  /** Mode Stripe : paiement complet (+ BNPL possible) ou abonnement échelonné. */
  mode: "payment" | "subscription";
  installments: number; // 1 | 3 | 6
  /** Montant par versement pour le PRIX de la formation (hors frais). */
  perInstallmentCents: number;
  description: string;
  /** true = éligible au financement externe BNPL (option « 1 fois »). */
  bnplEligible: boolean;
}

/** Options d'affichage (UI) pour une formation, dépend du frais déjà payé ou non. */
export function getFormationPaymentOptions(slug: string): FormationPaymentOption[] | null {
  const offer = getFormationOffer(slug);
  if (!offer) return null;
  const price = offer.amountCents;
  return [
    { id: "full", label: "1 versement", mode: "payment", installments: 1, perInstallmentCents: price, description: "Payez en une fois — par carte ou financement (Klarna, Affirm, Afterpay).", bnplEligible: true },
    { id: "installments_3", label: "3 versements", mode: "subscription", installments: 3, perInstallmentCents: splitEqual(price, 3)[1], description: "3 mensualités égales. Accès immédiat, suspendu en cas de défaut.", bnplEligible: false },
    { id: "installments_6", label: "6 versements", mode: "subscription", installments: 6, perInstallmentCents: splitEqual(price, 6)[1], description: "6 mensualités égales. Accès immédiat, suspendu en cas de défaut.", bnplEligible: false },
  ];
}

export interface FormationLineItem {
  kind: "registration_fee" | "formation" | "installment";
  label: string;
  amountCents: number;
  recurring?: boolean; // true = mensualité (mode subscription)
}

export interface FormationCheckoutMetadata {
  type: "formation-purchase";
  slug: string;
  formationName: string;
  userId: string;
  planId: FormationPlanId;
  installments: string;
  registrationFeeIncluded: boolean;
}

export interface FormationCheckoutPlan {
  ok: boolean;
  error?: string;
  slug?: string;
  currency: string;
  mode: "payment" | "subscription";
  planId: FormationPlanId;
  /** Nombre total de cycles (1 pour full). */
  cycles: number;
  /** Mensualité récurrente (mode subscription) en cents. */
  recurringCents: number;
  /** Ligne(s) ponctuelle(s) : frais d'inscription + (pour installments) rien d'autre. */
  oneTimeLineItems: FormationLineItem[];
  /** Total dû AUJOURD'HUI (1er versement + frais éventuels). */
  dueTodayCents: number;
  /** Total du contrat (frais + prix complet). */
  totalContractCents: number;
  registrationFeeIncluded: boolean;
  bnplEligible: boolean;
  metadata?: FormationCheckoutMetadata;
}

export interface BuildFormationCheckoutInput {
  slug: string;
  userId: string;
  planId?: FormationPlanId;
  registrationFeeAlreadyPaid: boolean;
}

/** Construit le plan de checkout d'une formation selon la modalité (prix 100 % serveur). */
export function buildFormationCheckoutPlan(input: BuildFormationCheckoutInput): FormationCheckoutPlan {
  const planId: FormationPlanId = input.planId ?? "full";
  const empty: FormationCheckoutPlan = {
    ok: false, currency: FORMATION_CURRENCY, mode: "payment", planId, cycles: 1,
    recurringCents: 0, oneTimeLineItems: [], dueTodayCents: 0, totalContractCents: 0,
    registrationFeeIncluded: false, bnplEligible: false,
  };
  if (!input.userId) return { ...empty, error: "unauthenticated" };
  const offer = getFormationOffer(input.slug);
  if (!offer) return { ...empty, error: "unknown_formation" };
  if (!["full", "installments_3", "installments_6"].includes(planId)) return { ...empty, error: "unknown_plan" };

  const feeIncluded = !input.registrationFeeAlreadyPaid;
  const feeCents = feeIncluded ? FORMATION_REGISTRATION_FEE_CENTS : 0;
  const price = offer.amountCents;
  const oneTime: FormationLineItem[] = [];
  if (feeIncluded) oneTime.push({ kind: "registration_fee", label: "Frais d'inscription ARCADINS (unique)", amountCents: FORMATION_REGISTRATION_FEE_CENTS });

  const meta = (installments: number): FormationCheckoutMetadata => ({
    type: "formation-purchase", slug: offer.slug, formationName: offer.name,
    userId: input.userId, planId, installments: String(installments), registrationFeeIncluded: feeIncluded,
  });

  if (planId === "full") {
    oneTime.push({ kind: "formation", label: offer.name, amountCents: price });
    return {
      ok: true, slug: offer.slug, currency: FORMATION_CURRENCY, mode: "payment", planId, cycles: 1,
      recurringCents: 0, oneTimeLineItems: oneTime, dueTodayCents: feeCents + price,
      totalContractCents: feeCents + price, registrationFeeIncluded: feeIncluded, bnplEligible: true,
      metadata: meta(1),
    };
  }

  // Échelonné (3 ou 6) : abonnement mensuel égal + frais d'inscription en ponctuel au 1er.
  const n = planId === "installments_6" ? 6 : 3;
  const parts = splitEqual(price, n);
  const recurring = parts[1]; // mensualité « standard »
  const firstExtra = parts[0] - parts[1]; // reliquat éventuel absorbé au 1er versement (ponctuel)
  if (firstExtra > 0) oneTime.push({ kind: "installment", label: "Ajustement 1er versement", amountCents: firstExtra });

  return {
    ok: true, slug: offer.slug, currency: FORMATION_CURRENCY, mode: "subscription", planId, cycles: n,
    recurringCents: recurring, oneTimeLineItems: oneTime,
    dueTodayCents: feeCents + parts[0], totalContractCents: feeCents + price,
    registrationFeeIncluded: feeIncluded, bnplEligible: false, metadata: meta(n),
  };
}
