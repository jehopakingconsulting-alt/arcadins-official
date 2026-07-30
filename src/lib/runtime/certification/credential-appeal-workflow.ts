/**
 * Runtime — Certification : CredentialAppealWorkflow (Sprint H).
 *
 * Flux d'appel d'une révocation, sans interface. Aucune restauration AUTOMATIQUE : la restauration ne survient
 * qu'après une décision explicite d'approbation. PUR et immuable.
 */
import type { AppealStatus, CredentialAppeal } from "./types.ts";

const APPEAL_TRANSITIONS: Record<AppealStatus, AppealStatus[]> = {
  none: ["appeal_requested"],
  appeal_requested: ["under_review", "closed"],
  under_review: ["additional_information_required", "approved", "denied", "closed"],
  additional_information_required: ["under_review", "closed"],
  approved: ["credential_restored", "replacement_issued", "closed"],
  denied: ["closed"],
  credential_restored: ["closed"],
  replacement_issued: ["closed"],
  closed: [],
};

function canTransition(from: AppealStatus, to: AppealStatus): boolean {
  return from === to || (APPEAL_TRANSITIONS[from]?.includes(to) ?? false);
}

export const CredentialAppealWorkflow = {
  create(input: { id: string; credentialPublicId: string; requestedByReference: string; reason: string; now: Date }): CredentialAppeal {
    const at = input.now.toISOString();
    return {
      id: input.id,
      credentialPublicId: input.credentialPublicId,
      status: "appeal_requested",
      requestedByReference: input.requestedByReference,
      reason: input.reason,
      decisions: [{ at, status: "appeal_requested", byReference: input.requestedByReference }],
      createdAt: at,
      updatedAt: at,
    };
  },

  advance(appeal: CredentialAppeal, to: AppealStatus, byReference: string, now: Date, note?: string): CredentialAppeal {
    if (!canTransition(appeal.status, to)) throw new Error(`INVALID_APPEAL_TRANSITION:${appeal.status}->${to}`);
    const at = now.toISOString();
    return {
      ...appeal,
      status: to,
      decisions: [...appeal.decisions, { at, status: to, byReference, note }],
      updatedAt: at,
    };
  },

  /** L'appel autorise-t-il une restauration ? (uniquement après approbation explicite). */
  authorizesRestoration(appeal: CredentialAppeal): boolean {
    return appeal.status === "approved" || appeal.status === "credential_restored";
  },

  canTransition,
};
