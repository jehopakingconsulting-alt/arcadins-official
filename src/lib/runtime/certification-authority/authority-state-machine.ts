/**
 * Runtime — Certification Authority : machine à états PURE (Sprint K4A, §7).
 *
 * Transitions strictement contrôlées. Aucune émission n'est déclenchée ici : la machine ne fait que garder la
 * cohérence des états. Les transitions interdites (ex. received→issued, revoked→issued) lèvent une erreur.
 */
import type { AuthorityState } from "./authority-types.ts";

/** Table des transitions VALIDES. */
export const AUTHORITY_TRANSITIONS: Record<AuthorityState, AuthorityState[]> = {
  received: ["validating", "rejected", "administratively_blocked"],
  validating: ["eligible", "rejected", "administratively_blocked"],
  rejected: [],
  eligible: ["issuance_pending", "administratively_blocked", "rejected"],
  issuance_pending: ["issuance_authorized", "rejected", "administratively_blocked", "suspended"],
  issuance_authorized: ["issuance_in_progress", "suspended", "revoked"],
  issuance_in_progress: ["issued", "issuance_failed"],
  issued: ["suspended", "revoked", "replacement_pending", "appeal_pending"],
  issuance_failed: ["issuance_pending"], // retry idempotent uniquement
  suspended: ["issuance_authorized", "revoked", "administratively_blocked"],
  revoked: ["replacement_pending", "appeal_pending"], // jamais → issued
  replacement_pending: ["replaced", "rejected"],
  replaced: [], // terminal : un nouveau record est requis
  appeal_pending: ["appeal_resolved"],
  appeal_resolved: ["eligible", "rejected"],
  administratively_blocked: [], // terminal tant que le blocage n'est pas levé (hors K4A)
};

export function canTransition(from: AuthorityState, to: AuthorityState): boolean {
  return AUTHORITY_TRANSITIONS[from]?.includes(to) ?? false;
}

/** Applique une transition ; lève `INVALID_TRANSITION:<from>-><to>` si interdite. */
export function transition(from: AuthorityState, to: AuthorityState): AuthorityState {
  if (!canTransition(from, to)) throw new Error(`INVALID_TRANSITION:${from}->${to}`);
  return to;
}

export function isTerminal(state: AuthorityState): boolean {
  return AUTHORITY_TRANSITIONS[state].length === 0;
}
