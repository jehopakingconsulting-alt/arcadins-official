/**
 * Runtime — Secure Final Exam Engine : point d'entrée (barrel), Sprint G.
 *
 * Moteur générique et SÉCURISÉ des examens finaux / sommatifs officiels internes d'ARCADINS. Correction serveur,
 * chronomètre autoritaire, soumission irréversible, résultat provisoire ≠ définitif, correction hybride
 * automatique/humaine, transmission conditionnelle à la certification. Aucune UI, aucune base, aucun réseau,
 * aucun LLM. Flag `FINAL_EXAM_ENABLED = false`.
 */
export * from "./types.ts";
export * from "./config.ts";
export * from "./eligibility-engine.ts";
export * from "./exam-definition-registry.ts";
export * from "./exam-session-manager.ts";
export * from "./exam-attempt-manager.ts";
export * from "./authoritative-timer.ts";
export * from "./navigation-policy-engine.ts";
export * from "./response-manager.ts";
export * from "./secure-exam-serializer.ts";
export * from "./final-exam-grading-engine.ts";
export * from "./manual-review-workflow.ts";
export * from "./final-decision-engine.ts";
export * from "./exam-integrity-engine.ts";
export * from "./accommodation-policy.ts";
export * from "./exam-audit-events.ts";
export * from "./exam-hooks.ts";
export * from "./exam-result-contract.ts";
export * from "./final-exam-engine.ts";
export * from "./validation.ts";
export * from "./specs.ts";
