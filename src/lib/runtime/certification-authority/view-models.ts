/**
 * Runtime — Certification Authority : ViewModel PUBLIC minimal (Sprint K4A, §16).
 *
 * N'expose JAMAIS : raison interne, internes de policy, signaux de risque, score privé, réponses, notes de
 * reviewer, secret d'intégrité, matériel de signature, IDs de base non nécessaires. Validé par la garde K3-S.
 */
import type { AuthorizationResult } from "./authority-types.ts";
import { ensureClientSafePayload } from "../ui/security/ensure-client-safe.ts";

export interface CertificationAuthorizationViewModel {
  status: string;
  publicReasonCode: string;
  authorizationReference: string | null; // opaque
  credentialType: string | null;
  issuerDisplayName: string;
  nextStepKey: string;
  retryAllowed: boolean;
  appealAllowed: boolean;
  replacementAllowed: boolean;
  locale: string;
  /** INVARIANT public : aucun certificat émis à ce stade. */
  certificateEmitted: false;
}

function nextStep(result: AuthorizationResult): string {
  if (result.errorCode) return `certification.next.${result.errorCode}`;
  if (result.decision === "issuance_allowed") return "certification.next.awaiting_issuance"; // K4B émettra (non émis ici)
  if (result.decision === "issuance_already_completed") return "certification.next.already_authorized";
  return "certification.next.review";
}

export function toCertificationAuthorizationViewModel(result: AuthorizationResult, opts: { issuerDisplayName?: string } = {}): CertificationAuthorizationViewModel {
  return ensureClientSafePayload({
    status: result.state,
    publicReasonCode: result.publicReasonCode,
    authorizationReference: result.authorizationReference,
    credentialType: result.credentialType,
    issuerDisplayName: opts.issuerDisplayName ?? "ARCADINS (émission en attente)",
    nextStepKey: nextStep(result),
    retryAllowed: result.retryAllowed,
    appealAllowed: result.appealAllowed,
    replacementAllowed: result.replacementAllowed,
    locale: result.locale,
    certificateEmitted: false as const,
  }, "certification-authorization");
}
