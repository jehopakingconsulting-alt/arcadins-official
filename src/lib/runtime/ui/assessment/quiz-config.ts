/**
 * Runtime — UI/Assessment : configuration du quiz formatif (Sprint K3A).
 *
 * Compose UNIQUEMENT des briques existantes du Sprint F (banque réelle + définition + politique). Aucune
 * logique de correction ici : la sélection et le barème restent dans les moteurs purs. Le quiz est un
 * QUIZ FORMATIF ; il n'active ni l'examen final (Sprint G), ni les certificats/badges (Sprint H).
 */
import type { AssessmentDefinition, AssessmentPolicy, FeedbackPolicy } from "@/lib/runtime/assessment/types";
import { InMemoryQuestionBank, fromBankQuestions } from "@/lib/runtime/assessment/question-bank";
import { DEFAULT_ASSESSMENT_POLICY } from "@/lib/runtime/assessment/config";
import { marketingDigitalV2Bank } from "@/lib/academic/question-bank/marketing-digital-v2";

/**
 * FLAG dédié au quiz runtime. RESTE `false`. Le quiz n'est rendu que dans une route de preview LOCALE ou
 * administrative gardée ; il n'est jamais visible sur la plateforme publique.
 */
export const QUIZ_RUNTIME_ENABLED = false as const;

/**
 * Politique de rétroaction du quiz formatif : la rétroaction publique est libérée après soumission, mais NE
 * divulgue JAMAIS les bonnes réponses (garantie du FeedbackEngine : `disclosesAnswers === false`).
 */
export const DEFAULT_QUIZ_FEEDBACK_POLICY: FeedbackPolicy = "no_answer_disclosure";

/** Politique par défaut d'un quiz formatif (dérive de la politique du Sprint F, override rétroaction). */
export function makeFormativeQuizPolicy(overrides: Partial<AssessmentPolicy> = {}): AssessmentPolicy {
  return {
    ...DEFAULT_ASSESSMENT_POLICY,
    feedback: DEFAULT_QUIZ_FEEDBACK_POLICY,
    ...overrides,
    attempts: { ...DEFAULT_ASSESSMENT_POLICY.attempts, ...(overrides.attempts ?? {}) },
    timing: { ...DEFAULT_ASSESSMENT_POLICY.timing, ...(overrides.timing ?? {}) },
    navigation: { ...DEFAULT_ASSESSMENT_POLICY.navigation, ...(overrides.navigation ?? {}) },
  };
}

/**
 * Construit la banque de questions RÉELLE du programme pilote (Marketing Digital v2). Les questions privées
 * (barème/bonnes réponses) restent dans le moteur ; seules des questions PUBLIQUES nettoyées atteindront l'UI.
 */
export function buildQuizBank(): InMemoryQuestionBank {
  return new InMemoryQuestionBank(fromBankQuestions(marketingDigitalV2Bank));
}

/** Nombre de questions par quiz de module par défaut (déterministe, borné à la banque réelle du module). */
export const DEFAULT_QUIZ_QUESTION_COUNT = 5;

/**
 * Construit une définition de quiz formatif pour un module donné. `moduleId` correspond à l'identifiant de
 * module tel que porté par la banque réelle (`String(question.module)`), ex. "1".
 */
export function buildModuleQuizDefinition(opts: {
  programSlug: string;
  moduleId: string;
  count?: number;
  version?: number;
  assessmentId?: string;
  lessonId?: string;
}): AssessmentDefinition {
  return {
    id: opts.assessmentId ?? `quiz-${opts.programSlug}-m${opts.moduleId}`,
    programId: opts.programSlug,
    moduleId: opts.moduleId,
    lessonId: opts.lessonId,
    version: opts.version ?? 1,
    selection: { count: opts.count ?? DEFAULT_QUIZ_QUESTION_COUNT, moduleId: opts.moduleId },
  };
}
