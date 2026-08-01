/**
 * Runtime — Certification Authority : NEUTRALISATION de la voie d'émission legacy (Sprint K4A, §8, §20).
 *
 * Stratégie retenue = D (façade non émettrice à statut contrôlé). Le flux legacy `POST /api/certificates`
 * (LearnViewer → émission autonome) NE DOIT PLUS émettre de façon autonome. Tant que
 * `LEGACY_CERTIFICATE_EMISSION_ENABLED=false` (défaut), la voie legacy renvoie un statut contrôlé et n'écrit
 * RIEN (aucun certificat, aucune insertion). L'autorité unique (`CertificationAuthorizationService`) est la
 * seule voie d'autorisation. PUR / node-testable (aucun Supabase ici).
 */
import { CERTIFICATION_AUTHORITY_ENABLED, LEGACY_CERTIFICATE_EMISSION_ENABLED } from "./flags.ts";

export interface LegacyEmissionDecision {
  /** Le legacy peut-il émettre lui-même ? (toujours false tant que le flag est OFF). */
  allowed: boolean;
  httpStatus: number;
  /** Corps de réponse PUBLIC-SAFE (aucune donnée sensible). */
  body: { status: "emission_disabled" | "authority_required" | "allowed"; reasonCode: string; authorityRequired: boolean; emitted: false };
  auditOperation: "LEGACY_PATH_BLOCKED" | "LEGACY_PATH_ADAPTED";
}

/**
 * Évalue si la voie legacy peut émettre. Fail-closed : par défaut (flags OFF), aucune émission autonome.
 * Renvoie un statut contrôlé et NON émetteur (jamais 500, jamais de fausse attestation).
 */
export function evaluateLegacyEmission(
  flags: { legacyEnabled?: boolean; authorityEnabled?: boolean } = {},
): LegacyEmissionDecision {
  const legacyEnabled = flags.legacyEnabled ?? LEGACY_CERTIFICATE_EMISSION_ENABLED;
  const authorityEnabled = flags.authorityEnabled ?? CERTIFICATION_AUTHORITY_ENABLED;

  if (legacyEnabled) {
    // Émission legacy explicitement autorisée (non utilisée en K4A : le flag reste false).
    return { allowed: true, httpStatus: 200, body: { status: "allowed", reasonCode: "certification.legacy.allowed", authorityRequired: false, emitted: false }, auditOperation: "LEGACY_PATH_ADAPTED" };
  }
  // OFF : voie legacy neutralisée. Si l'autorité est active, elle prend le relais (K4B) ; sinon, désactivé.
  return {
    allowed: false,
    httpStatus: 200,
    body: { status: authorityEnabled ? "authority_required" : "emission_disabled", reasonCode: authorityEnabled ? "certification.legacy.authority_required" : "certification.legacy.disabled", authorityRequired: authorityEnabled, emitted: false },
    auditOperation: "LEGACY_PATH_BLOCKED",
  };
}
