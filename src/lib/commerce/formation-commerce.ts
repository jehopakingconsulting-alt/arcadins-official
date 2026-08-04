/**
 * ARCADINS — CŒUR COMMERCIAL des Formations professionnelles (Département B).
 * PUR / déterministe / node-testable. Rend le catalogue AUTONOME : paiement =
 * inscription (le webhook crée l'`enrollments` active → la route /formations/[slug]/learn
 * EXISTANTE débloque le contenu + progression + certificat).
 *
 * Règles : prix 1500 CAD (source = programs.ts), frais d'inscription $100 UNIQUE &
 * GLOBAL (une seule fois par étudiant, tous programmes confondus — mutualisé avec
 * le commerce TEF/TCF via registration_fee_payments). Paiement intégral au lancement.
 *
 * Distinct de program-commerce.ts (TEF/TCF, USD). Imports RELATIFS uniquement.
 */
import { PROGRAMS } from "../data/programs.ts";

export const FORMATION_CURRENCY = "cad";
/** Frais d'inscription UNIQUES et GLOBAUX (même règle que TEF/TCF), en CAD ici. */
export const FORMATION_REGISTRATION_FEE_CENTS = 10_000; // 100,00 $ CAD

export interface FormationOffer {
  slug: string;
  name: string;
  /** Montant en cents CAD — autorité serveur (jamais le navigateur). */
  amountCents: number;
}

/** Formation active vendable (exclut les « à venir » et les prix nuls). */
export function getFormationOffer(slug: string): FormationOffer | null {
  const p = PROGRAMS.find((x) => x.slug === slug);
  if (!p || p.comingSoon || !p.price || p.price <= 0) return null;
  return { slug: p.slug, name: p.name, amountCents: Math.round(p.price * 100) };
}

export function isSellableFormation(slug: string): boolean {
  return getFormationOffer(slug) !== null;
}

export type CheckoutLineItemKind = "registration_fee" | "formation";

export interface FormationLineItem {
  kind: CheckoutLineItemKind;
  label: string;
  amountCents: number;
}

export interface FormationCheckoutMetadata {
  type: "formation-purchase";
  slug: string;
  formationName: string;
  userId: string;
  registrationFeeIncluded: boolean;
}

export interface FormationCheckoutPlan {
  ok: boolean;
  error?: string;
  slug?: string;
  currency: string;
  mode: "payment";
  lineItems: FormationLineItem[];
  totalCents: number;
  registrationFeeIncluded: boolean;
  metadata?: FormationCheckoutMetadata;
}

export interface BuildFormationCheckoutInput {
  slug: string;
  userId: string;
  /** Décision serveur : l'étudiant a-t-il déjà payé le frais d'inscription global ? */
  registrationFeeAlreadyPaid: boolean;
}

/** Construit le plan de checkout d'une formation (prix 100 % serveur). */
export function buildFormationCheckoutPlan(input: BuildFormationCheckoutInput): FormationCheckoutPlan {
  const empty: FormationCheckoutPlan = {
    ok: false,
    currency: FORMATION_CURRENCY,
    mode: "payment",
    lineItems: [],
    totalCents: 0,
    registrationFeeIncluded: false,
  };

  if (!input.userId) return { ...empty, error: "unauthenticated" };
  const offer = getFormationOffer(input.slug);
  if (!offer) return { ...empty, error: "unknown_formation" };

  const feeIncluded = !input.registrationFeeAlreadyPaid;
  const lineItems: FormationLineItem[] = [];
  if (feeIncluded) {
    lineItems.push({ kind: "registration_fee", label: "Frais d'inscription ARCADINS (unique)", amountCents: FORMATION_REGISTRATION_FEE_CENTS });
  }
  lineItems.push({ kind: "formation", label: offer.name, amountCents: offer.amountCents });

  const totalCents = lineItems.reduce((s, li) => s + li.amountCents, 0);

  return {
    ok: true,
    slug: offer.slug,
    currency: FORMATION_CURRENCY,
    mode: "payment",
    lineItems,
    totalCents,
    registrationFeeIncluded: feeIncluded,
    metadata: {
      type: "formation-purchase",
      slug: offer.slug,
      formationName: offer.name,
      userId: input.userId,
      registrationFeeIncluded: feeIncluded,
    },
  };
}
