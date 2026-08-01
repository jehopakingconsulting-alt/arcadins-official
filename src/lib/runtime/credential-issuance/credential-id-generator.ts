/**
 * Runtime — Credential Issuance : générateurs d'identifiants INJECTABLES (Sprint K4B, §14).
 *
 * Déterministes en test, opaques, distincts par type, sans PII/email/score/date-de-naissance/séquence DB.
 * K4B N'ACTIVE PAS d'identifiant public consultable (`publicCredentialReference` reste préparé, jamais publié).
 */
export interface CredentialIdProvider {
  credentialRecordId(): string;
  issuanceEventId(): string;
  revocationReference(): string;
  replacementChainId(): string;
  signatureReference(): string;
  /** Préparé pour K4C — non activé en K4B. */
  futurePublicCredentialReference(): string;
}

export function createDeterministicCredentialIdProvider(prefix = "k4b"): CredentialIdProvider {
  const counters: Record<string, number> = {};
  const next = (kind: string) => {
    counters[kind] = (counters[kind] ?? 0) + 1;
    return `${prefix}-${kind}-${counters[kind]}`;
  };
  return {
    credentialRecordId: () => next("cred"),
    issuanceEventId: () => next("evt"),
    revocationReference: () => next("rev"),
    replacementChainId: () => next("chain"),
    signatureReference: () => next("sig"),
    futurePublicCredentialReference: () => next("public"),
  };
}
