/**
 * Runtime — Certification Authority : générateurs d'identifiants INTERNES opaques (Sprint K4A, §12).
 *
 * INJECTABLE et déterministe en test. K4A ne génère AUCUN identifiant public final actif servant de credential.
 * Aucun UUID/timestamp métier n'est produit dans React : tout passe par un provider injecté.
 */
export interface AuthorityIdProvider {
  authorizationId(): string;
  credentialRecordId(): string;
  replacementChainId(): string;
  revocationRecordId(): string;
  appealId(): string;
  auditEventId(): string;
}

/** Provider déterministe (compteur préfixé) — pour tests et environnements sans source d'aléa. */
export function createDeterministicIdProvider(seedPrefix = "k4a"): AuthorityIdProvider {
  const counters: Record<string, number> = {};
  const next = (kind: string) => {
    counters[kind] = (counters[kind] ?? 0) + 1;
    return `${seedPrefix}-${kind}-${counters[kind]}`;
  };
  return {
    authorizationId: () => next("auth"),
    credentialRecordId: () => next("cred"),
    replacementChainId: () => next("repl"),
    revocationRecordId: () => next("rev"),
    appealId: () => next("appeal"),
    auditEventId: () => next("evt"),
  };
}
