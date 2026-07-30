/**
 * Runtime — Certification : BadgeEngine (Sprint H).
 *
 * Émet des badges VÉRIFIABLES uniquement sur preuve admissible (jamais sur un simple affichage client). Chaque
 * badge possède un identifiant public opaque, un statut, une preuve et un lien facultatif au credential parent.
 * Dédoublonnage par clé logique + idempotence par commandId. PUR.
 */
import type {
  BadgeDefinition,
  BadgeRecord,
  HashProvider,
} from "./types.ts";
import { CredentialIdGenerator } from "./credential-id-generator.ts";
import { CredentialStatusEngine } from "./credential-status-engine.ts";

export interface BadgeIssuanceInput {
  commandId: string;
  definition: BadgeDefinition;
  learnerReference: string;
  /** Preuve admissible (référence de résultat / de credential). Requise si la définition l'exige. */
  evidenceReference: string | null;
  parentCredentialReference?: string | null;
  internalBadgeId: string;
  now: Date;
}

export function computeBadgeIssuanceKey(definitionId: string, learnerReference: string, criteriaVersion: number, hashProvider: HashProvider): string {
  return hashProvider.hash(`badgekey:${definitionId}|${learnerReference}|${criteriaVersion}`);
}

export const BadgeEngine = {
  computeBadgeIssuanceKey,

  /** Vérifie qu'un badge peut être émis (preuve requise présente). */
  canIssue(input: BadgeIssuanceInput): { allowed: boolean; reasonCodes: string[] } {
    const reasonCodes: string[] = [];
    if (input.definition.requiresEvidence && (!input.evidenceReference || input.evidenceReference.trim() === "")) reasonCodes.push("EVIDENCE_REQUIRED");
    return { allowed: reasonCodes.length === 0, reasonCodes };
  },

  build(input: BadgeIssuanceInput, hashProvider: HashProvider, issuerCode: string): BadgeRecord {
    const def = input.definition;
    const issuanceKey = computeBadgeIssuanceKey(def.badgeDefinitionId, input.learnerReference, def.criteriaVersion, hashProvider);
    const contentSeed = `${input.internalBadgeId}:${issuanceKey}`;
    const publicVerificationId = CredentialIdGenerator.publicVerificationId(`badge:${contentSeed}`, hashProvider);
    void issuerCode;
    const expiresAt = def.expiration.kind === "duration" ? new Date(input.now.getTime() + def.expiration.validitySeconds * 1000).toISOString() : null;

    return {
      internalBadgeId: input.internalBadgeId,
      badgeDefinitionId: def.badgeDefinitionId,
      kind: def.kind,
      titleKey: def.titleKey,
      descriptionKey: def.descriptionKey,
      competencyCodes: [...def.competencyCodes],
      criteriaVersion: def.criteriaVersion,
      issuedAt: input.now.toISOString(),
      publicVerificationId,
      status: "active",
      evidenceReference: input.evidenceReference ?? "",
      expiresAt,
      parentCredentialReference: input.parentCredentialReference ?? null,
      issuanceKey,
      processedCommands: { [input.commandId]: "issued" },
    };
  },

  revoke(badge: BadgeRecord, commandId: string, now: Date): BadgeRecord {
    if (badge.status === "revoked") return badge;
    CredentialStatusEngine.transition(badge.status === "issued" ? "issued" : "active", "revoked");
    return { ...badge, status: "revoked", processedCommands: { ...badge.processedCommands, [commandId]: "revoked", revokedAt: now.toISOString() } };
  },
};
