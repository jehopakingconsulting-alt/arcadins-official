/**
 * Runtime — UI/Completion : contrat de transfert vers K4 (Sprint K3C).
 *
 * NON ÉMETTEUR : ne produit AUCUN certificat/badge/PDF/QR/signature. Décrit uniquement, après une décision
 * DÉFINITIVE de RÉUSSITE, les éléments PUBLICS qu'un futur moteur de certification (K4) pourra consommer.
 * Reste inerte tant que K4 n'est pas autorisé. Validé par la garde de frontière.
 */
import type { CompletionInput, FinalDecision } from "./completion-types.ts";
import type { CompetencySummary } from "./competency-aggregation.ts";
import { ensureClientSafePayload } from "../security/ensure-client-safe.ts";

export interface CertificationHandoffContract {
  learnerRefOpaque: string;
  programId: string;
  programVersion: string;
  curriculumVersion: string;
  finalDecisionId: string;
  finalStatus: string;
  passed: boolean;
  completedAt: string;
  certificationEligibility: boolean;
  competenciesSummary: { competencyId: string; acquired: boolean }[]; // public
  policyVersion: number;
  contractVersion: number;
  /** Référence d'intégrité PUBLIQUE (checksum logique non secret), jamais une signature. */
  resultIntegrityReference: string;
  /** Code d'émetteur PRÉVU (K4), aucune reconnaissance officielle inventée. */
  issuerCode: string;
  requestedLocale: string;
  emitted: false; // invariant : ce contrat n'émet jamais
}

/**
 * Construit le contrat de transfert UNIQUEMENT après une décision définitive de RÉUSSITE. Renvoie `null`
 * sinon (aucun transfert sur résultat provisoire ou échec).
 */
export function buildCertificationHandoff(
  final: FinalDecision | null,
  input: CompletionInput,
  competencySummary: CompetencySummary | null,
  opts: { locale?: string; issuerCode?: string } = {},
): CertificationHandoffContract | null {
  if (!final || !final.passed) return null;

  const contract: CertificationHandoffContract = {
    learnerRefOpaque: input.learnerRefOpaque,
    programId: input.programSlug,
    programVersion: input.curriculumVersion,
    curriculumVersion: input.curriculumVersion,
    finalDecisionId: final.decisionId,
    finalStatus: final.finalStatus,
    passed: final.passed,
    completedAt: final.decidedAt,
    certificationEligibility: final.certificationEligibility,
    competenciesSummary: (competencySummary?.items ?? []).map((c) => ({ competencyId: c.competencyId, acquired: c.acquired })),
    policyVersion: final.policyVersion,
    contractVersion: final.contractVersion,
    // Référence d'intégrité déterministe, non secrète (aucune valeur privée reconstituable).
    resultIntegrityReference: `k3c:${final.decisionId}:${final.policyVersion}:${final.contractVersion}`,
    issuerCode: opts.issuerCode ?? "ARCADINS-PENDING",
    requestedLocale: opts.locale ?? "fr",
    emitted: false,
  };
  return ensureClientSafePayload(contract, "handoff");
}
