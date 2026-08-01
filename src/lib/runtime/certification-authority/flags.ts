/**
 * Runtime — Certification Authority : feature flags (Sprint K4A).
 *
 * TOUS `false` par défaut. K4A n'active RIEN : c'est une couche d'AUTORITÉ et de CONTRAT. Toute route ou
 * service futur doit ÉCHOUER FERMÉ (fail-closed) lorsque son flag est OFF. `LEGACY_CERTIFICATE_EMISSION_ENABLED`
 * neutralise la voie d'émission legacy `/api/certificates` (voir `legacy-emission-gate.ts`).
 */
export const CERTIFICATION_AUTHORITY_ENABLED = false as const;
export const LEGACY_CERTIFICATE_EMISSION_ENABLED = false as const;
export const CREDENTIAL_ISSUANCE_ENABLED = false as const;
export const BADGE_ISSUANCE_ENABLED = false as const;
export const CERTIFICATE_PDF_ENABLED = false as const;
export const CERTIFICATE_QR_ENABLED = false as const;
export const PUBLIC_CREDENTIAL_VERIFICATION_ENABLED = false as const;

/** Snapshot lisible de tous les flags K4A (pour audit/tests). */
export const CERTIFICATION_AUTHORITY_FLAGS = {
  CERTIFICATION_AUTHORITY_ENABLED,
  LEGACY_CERTIFICATE_EMISSION_ENABLED,
  CREDENTIAL_ISSUANCE_ENABLED,
  BADGE_ISSUANCE_ENABLED,
  CERTIFICATE_PDF_ENABLED,
  CERTIFICATE_QR_ENABLED,
  PUBLIC_CREDENTIAL_VERIFICATION_ENABLED,
} as const;
