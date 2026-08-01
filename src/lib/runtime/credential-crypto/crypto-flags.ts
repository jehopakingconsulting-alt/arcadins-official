/**
 * Runtime — Credential Crypto : feature flags (Sprint K4C-A). TOUS `false` par défaut. Fail-closed : tout
 * service refuse d'agir tant que son flag n'est pas explicitement injecté à `true` (tests uniquement).
 */
export const PRODUCTION_SIGNING_PROVIDER_ENABLED = false as const;
export const EPHEMERAL_SIGNING_PROVIDER_ENABLED = false as const;
export const KEY_ROTATION_ENABLED = false as const;
export const KEY_REVOCATION_ENABLED = false as const;

export const CREDENTIAL_CRYPTO_FLAGS = {
  PRODUCTION_SIGNING_PROVIDER_ENABLED,
  EPHEMERAL_SIGNING_PROVIDER_ENABLED,
  KEY_ROTATION_ENABLED,
  KEY_REVOCATION_ENABLED,
} as const;
