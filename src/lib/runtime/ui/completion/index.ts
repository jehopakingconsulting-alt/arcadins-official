/**
 * Runtime — UI/Completion : barrel (Sprint K3C). Orchestration SÉCURISÉE des résultats/décisions d'évaluation :
 * politique injectée, machine à états, événements dédiés, store, view models publics, contrat de transfert K4
 * NON émetteur, i18n. Aucun certificat/badge émis. SÛR CÔTÉ CLIENT (aucune banque privée).
 */
export * from "./completion-types.ts";
export * from "./completion-config.ts";
export * from "./result-policy.ts";
export * from "./retake-policy-evaluator.ts";
export * from "./competency-aggregation.ts";
export * from "./completion-events.ts";
export * from "./assessment-completion-orchestrator.ts";
export * from "./completion-store.ts";
export * from "./completion-view-models.ts";
export * from "./certification-handoff.ts";
export * from "./completion-i18n.ts";
