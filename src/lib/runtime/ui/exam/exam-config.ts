/**
 * Runtime — UI/Exam : configuration de l'examen final (Sprint K3B).
 *
 * Compose UNIQUEMENT des briques du Sprint G (définition figée + admissibilité + banque réelle). Aucune
 * logique de correction ici. L'examen final reste DISTINCT du quiz formatif (K3A) : son propre cycle de vie,
 * ses politiques figées, son chronomètre autoritaire. Aucun certificat/badge n'est émis ici.
 */
import type {
  ExamEligibilityContext,
  ExamEligibilityRule,
  FinalExamDefinition,
  FinalExamSection,
  FinalExamVersion,
} from "@/lib/runtime/exam/types";
import {
  DEFAULT_EXAM_ACCOMMODATION_POLICY,
  DEFAULT_EXAM_GRADING_POLICY,
  DEFAULT_EXAM_NAVIGATION_POLICY,
  DEFAULT_EXAM_RETAKE_POLICY,
} from "@/lib/runtime/exam/config";
import { InMemoryQuestionBank } from "@/lib/runtime/assessment/question-bank";
import type { PrivateQuestion } from "@/lib/runtime/assessment/types";

/**
 * FLAG dédié au Runtime d'examen final. RESTE `false`. L'examen n'est rendu que dans une route de preview
 * LOCALE ou administrative doublement gardée ; jamais sur la plateforme publique.
 *
 * K3-S : ce module est SÛR CÔTÉ CLIENT (aucun import de banque privée). La construction de la banque RÉELLE
 * est isolée dans `exam-bank.server.ts` (jamais importée par un composant client).
 */
export const FINAL_EXAM_RUNTIME_ENABLED = false as const;

const DEMO_VERSION: FinalExamVersion = {
  examVersion: 1,
  questionsVersion: 1,
  bankVersion: 1,
  rubricsVersion: 1,
  gradingVersion: 1,
  eligibilityVersion: 1,
  navigationVersion: 1,
  accommodationVersion: 1,
  passThresholdVersion: 1,
};

/** Règle d'admissibilité de démonstration (consommée par l'ExamEligibilityEngine du Sprint G). */
export function demoEligibilityRule(): ExamEligibilityRule {
  return {
    requireActiveEnrollment: true,
    requireProgramAccessible: true,
    requiredModuleIds: ["1", "2"],
    minimumProgressPercent: 80,
    requiredPassedQuizIds: [],
    requireFinalProjectSubmitted: false,
    requireFinalProjectApproved: false,
    forbidAdministrativeHold: true,
    minimumAvailableAttempts: 1,
    mandatoryCooldownSeconds: 0,
    requireExamWindowOpen: true,
    requiredPrerequisiteSkillIds: [],
    version: 1,
  };
}

/** Contexte d'admissibilité de DÉMONSTRATION (admissible par défaut ; surcharge pour tester les refus). */
export function demoEligibilityContext(overrides: Partial<ExamEligibilityContext> = {}): ExamEligibilityContext {
  return {
    enrollmentActive: true,
    programAccessible: true,
    completedModuleIds: ["1", "2"],
    progressPercent: 100,
    passedQuizIds: [],
    finalProjectSubmitted: true,
    finalProjectApproved: true,
    administrativeHold: false,
    availableAttempts: 2,
    lastAttemptCompletedAt: null,
    examWindowOpen: true,
    satisfiedPrerequisiteSkillIds: [],
    specialApproval: null,
    ...overrides,
  };
}

/** Définition d'examen final de démonstration (structure ; la banque réelle est fournie côté serveur). */
export function buildDemoExamDefinition(opts: { programSlug: string }): FinalExamDefinition {
  const sections: FinalExamSection[] = [
    { id: "1", titleKey: "exam.section.fundamentals", selection: { count: 3, moduleId: "1" }, weight: 1 },
    { id: "2", titleKey: "exam.section.strategy", selection: { count: 3, moduleId: "2" }, weight: 1 },
  ];
  return {
    examId: `exam-${opts.programSlug}`,
    programId: opts.programSlug,
    version: DEMO_VERSION,
    status: "active",
    sections,
    durationLimitSeconds: 3600,
    passThresholdPercent: 70,
    navigation: { ...DEFAULT_EXAM_NAVIGATION_POLICY, mode: "sequential", allowBacktrack: true, allowPartialSubmission: true },
    retake: { ...DEFAULT_EXAM_RETAKE_POLICY },
    grading: { ...DEFAULT_EXAM_GRADING_POLICY },
    eligibilityRule: demoEligibilityRule(),
    accommodationPolicy: { ...DEFAULT_EXAM_ACCOMMODATION_POLICY },
    humanReviewRequired: false,
    activatedAt: "2026-01-01T00:00:00Z",
    retiredAt: null,
  };
}

// ── Variante DÉTERMINISTE (test navigateur) : bonne réponse connue = 1re option ("o0"). ──────────────
export function buildDeterministicExamBank(): InMemoryQuestionBank {
  const items: PrivateQuestion[] = [];
  for (const s of ["1", "2"]) {
    for (let i = 0; i < 2; i++) {
      items.push({
        id: `${s}-det${i}`,
        version: 1,
        type: "single",
        difficulty: "easy",
        prompt: `Section ${s} — question déterministe ${i + 1}`,
        options: [{ id: "o0", label: "Bonne réponse" }, { id: "o1", label: "Autre réponse" }],
        points: 2,
        grading: { kind: "single", correctOptionId: "o0" },
        competencyId: `C${s}`,
        moduleId: s,
        status: "active",
      });
    }
  }
  return new InMemoryQuestionBank(items);
}

export function buildDeterministicExamDefinition(opts: { programSlug: string }): FinalExamDefinition {
  const base = buildDemoExamDefinition(opts);
  return {
    ...base,
    examId: `exam-det-${opts.programSlug}`,
    // Séquentiel SANS retour arrière : permet de prouver un refus de navigation en navigateur.
    navigation: { ...base.navigation, mode: "sequential", allowBacktrack: false },
    sections: [
      { id: "1", titleKey: "exam.section.fundamentals", selection: { count: 2, moduleId: "1" }, weight: 1 },
      { id: "2", titleKey: "exam.section.strategy", selection: { count: 2, moduleId: "2" }, weight: 1 },
    ],
  };
}
