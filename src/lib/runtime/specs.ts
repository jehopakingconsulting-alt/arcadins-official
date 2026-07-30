/**
 * Runtime étudiant — DeepSpecs & validation d'invariants (Sprint A).
 *
 * `RUNTIME_DEEP_SPECS` énumère les comportements attendus du cerveau du runtime (spécification vivante,
 * vérifiée par les tests). `validateRuntimeState` contrôle la cohérence d'un état donné.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { RuntimeState, RuntimeValidationIssue, RuntimeValidationReport } from "./types.ts";
import { UnlockRules } from "./unlock-rules.ts";
import { CompletionCalculator } from "./completion-calculator.ts";
import { allLessons } from "./helpers.ts";

/** Spécification vivante des invariants/comportements du runtime (couverte par les tests). */
export const RUNTIME_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "S1", description: "Le premier module est toujours débloqué ; les suivants sont verrouillés tant que le précédent n'est pas validé." },
  { id: "S2", description: "Un module est validé ⇔ toutes ses leçons réussies + sommatif ≥ 70 % + travail pratique soumis." },
  { id: "S3", description: "Débloquer un module rend ses leçons « available » ; un module verrouillé garde ses leçons « locked »." },
  { id: "S4", description: "Le reducer est pur : (state, event) → nouvel état immuable ; l'état d'origine n'est jamais muté." },
  { id: "S5", description: "Rejouer le journal d'événements depuis l'état initial reproduit exactement l'état courant (déterminisme)." },
  { id: "S6", description: "Le temps d'étude s'accumule par leçon et par jour ; chaque heartbeat est plafonné." },
  { id: "S7", description: "Une leçon complétée avec un quiz réussi passe à « passed » ; sinon « completed »." },
  { id: "S8", description: "La progression globale = leçons complétées / total ; le score moyen ignore les leçons sans score." },
  { id: "S9", description: "Les compétences acquises = union des compétences des modules validés uniquement." },
  { id: "S10", description: "Aucune bonne réponse n'est manipulée par le runtime : la correction reste hors de ce cerveau (serveur)." },
];

/** Vérifie la cohérence d'un état runtime au regard du cursus. */
export function validateRuntimeState(curriculum: ProgramCurriculumV2, state: RuntimeState): RuntimeValidationReport {
  const errors: RuntimeValidationIssue[] = [];
  const warnings: RuntimeValidationIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });
  const warn = (code: string, message: string) => warnings.push({ level: "warning", code, message });

  // 1) Cohérence programme.
  if (state.programSlug !== curriculum.slug) err("SLUG", "programSlug ne correspond pas au cursus.");

  const lessonIds = new Set(allLessons(curriculum).map((l) => l.id));

  // 2) Pas de progression orpheline (leçon inconnue du cursus).
  for (const ref of Object.keys(state.lessons)) {
    if (!lessonIds.has(ref)) err("ORPHAN_LESSON", `Progression pour une leçon inconnue : ${ref}.`);
  }

  // 3) Une leçon verrouillée ne doit pas avoir de progression au-delà de « locked ».
  for (const lp of Object.values(state.lessons)) {
    if (lp.state === "locked" && (lp.completedAt || typeof lp.quizScore === "number")) {
      err("LOCKED_WITH_PROGRESS", `${lp.lessonRef} est verrouillée mais porte une progression.`);
    }
  }

  // 4) Un module « passed » implique réellement le critère de validation.
  for (const m of curriculum.modules) {
    const mp = state.modules[m.index];
    if (mp?.state === "passed" && !CompletionCalculator.isModulePassed(curriculum, state, m.index)) {
      err("MODULE_PASSED_INVALID", `Module ${m.index} marqué « passed » sans remplir le critère.`);
    }
    // 5) Un module débloqué ne doit pas rester « locked ».
    if (UnlockRules.isModuleUnlocked(curriculum, state, m.index) && mp?.state === "locked") {
      warn("MODULE_LOCKED_MISMATCH", `Module ${m.index} débloqué mais encore « locked » (recalcul requis).`);
    }
  }

  // 6) Le total du temps d'étude doit égaler la somme par jour.
  const sumByDay = Object.values(state.study.byDay).reduce((a, b) => a + b, 0);
  if (sumByDay !== state.study.totalSeconds) warn("STUDY_TOTAL", "Total du temps d'étude incohérent avec la somme par jour.");

  return { ok: errors.length === 0, errors, warnings };
}
