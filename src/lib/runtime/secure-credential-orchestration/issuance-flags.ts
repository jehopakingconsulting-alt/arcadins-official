/**
 * Runtime — Secure Credential Orchestration : flags (Sprint K4C-B). TOUS false par défaut ; fail-closed. Les
 * tests injectent `true` explicitement. Aucun `.env` modifié.
 */
export const SECURE_ISSUANCE_ORCHESTRATOR_ENABLED = false as const;
export const CREDENTIAL_PERSISTENCE_ENABLED = false as const;

export const SECURE_ISSUANCE_FLAGS = { SECURE_ISSUANCE_ORCHESTRATOR_ENABLED, CREDENTIAL_PERSISTENCE_ENABLED } as const;
