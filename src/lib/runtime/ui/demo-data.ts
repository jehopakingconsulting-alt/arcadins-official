/**
 * Runtime — UI : jeu de données de DÉMONSTRATION (Sprint J).
 *
 * Données ENTIÈREMENT FICTIVES pour la preview interne. Aucun nom réel, aucune donnée réelle, aucune bonne réponse.
 * Produit directement des view models (aucune dépendance aux moteurs lourds → bundle léger). Générique : le libellé
 * de programme est un simple exemple, aucune logique propre au Marketing Digital n'est codée.
 */
import type { ContentBlock, JourneyStatus } from "./types.ts";
import type {
  AssessmentIntroViewModel, AssessmentResultViewModel, AssessmentViewModel, BadgeViewModel, BookmarkViewModel,
  CalendarViewModel, CredentialViewModel, JourneyViewModel, LessonPlayerViewModel, NoteViewModel,
  NotificationViewModel, ProgressViewModel, StudentDashboardViewModel,
} from "./view-models.ts";
import { CREDENTIAL_DOCUMENT_TITLE } from "./config.ts";

const NOW = "2026-12-01T09:00:00Z";
const PROGRAM = { programId: "demo-program", programTitle: "Formation ARCADINS (démo)", totalWeeks: 24, totalModules: 8, passThresholdPercent: 70 };

export function demoDashboard(): StudentDashboardViewModel {
  return {
    identity: { displayName: "Étudiant Démo", initials: "ÉD", demo: true },
    program: PROGRAM,
    enrollmentStatus: "active",
    welcomeMessageKey: "dashboard.welcome",
    overallPercent: 42,
    weeklyPercent: 65,
    currentModuleTitle: "Module 3 (démo)",
    nextLessonTitle: "Leçon 3.4 (démo)",
    lastActivityAt: NOW,
    totalStudyMinutes: 860,
    averageScorePercent: 78,
    competencies: [
      { code: "c1", labelKey: "competency.c1", percent: 82, level: "strong" },
      { code: "c2", labelKey: "competency.c2", percent: 54, level: "fragile" },
      { code: "c3", labelKey: "competency.c3", percent: 30, level: "insufficient" },
    ],
    goals: [
      { id: "g1", labelKey: "goal.finish_module3", percent: 60, dueAt: "2026-12-10T00:00:00Z" },
      { id: "g2", labelKey: "goal.pass_quiz4", percent: 0, dueAt: "2026-12-15T00:00:00Z" },
    ],
    recommendations: demoRecommendations(),
    badges: demoBadges(),
    credentials: demoCredentials(),
    notifications: demoNotifications(),
    recentActivity: [
      { id: "a1", type: "lesson.completed", at: NOW, labelKey: "activity.lesson_completed" },
      { id: "a2", type: "assessment.graded", at: NOW, labelKey: "activity.quiz_graded" },
    ],
    accessExpiresAt: "2027-06-01T00:00:00Z",
  };
}

export function demoJourney(): JourneyViewModel {
  const statuses: JourneyStatus[] = ["completed", "completed", "in_progress", "available", "locked", "locked", "locked", "locked"];
  return {
    program: PROGRAM,
    currentLessonId: "L-3-4",
    modules: statuses.map((status, i) => {
      const index = i + 1;
      const weeks = [index * 3 - 2, index * 3 - 1, index * 3];
      return {
        moduleId: `M-${index}`,
        index,
        titleKey: `module.${index}.title`,
        status,
        percent: status === "completed" ? 100 : status === "in_progress" ? 45 : 0,
        weeks: weeks.map((week) => ({
          week,
          titleKey: `week.${week}.title`,
          status: status === "completed" ? "completed" : status === "in_progress" && week === weeks[1] ? "in_progress" : status === "locked" ? "locked" : "available",
          lessons: [1, 2, 3, 4].map((n) => ({
            lessonId: `L-${index}-${n}`,
            titleKey: `lesson.${index}.${n}.title`,
            status: status === "locked" ? "locked" : status === "completed" ? "completed" : n <= 2 ? "completed" : n === 3 ? "in_progress" : "available",
            percent: status === "completed" ? 100 : n <= 2 ? 100 : n === 3 ? 40 : 0,
            lockedReasonCode: status === "locked" ? "PREREQUISITE_MODULE_INCOMPLETE" : null,
          })),
        })),
      };
    }),
  };
}

export function demoLesson(): LessonPlayerViewModel {
  const blocks: ContentBlock[] = [
    { id: "b1", type: "heading", heading: "Introduction (démo)" },
    { id: "b2", type: "paragraph", text: "Ceci est un contenu de démonstration entièrement fictif." },
    { id: "b3", type: "keyTakeaway", text: "Point clé de démonstration." },
    { id: "b4", type: "list", items: ["Élément un", "Élément deux", "Élément trois"] },
    { id: "b5", type: "callout", text: "Encadré informatif (démo)." },
    { id: "b6", type: "warning", text: "Avertissement de démonstration." },
    { id: "b7", type: "definition", heading: "Terme", text: "Définition fictive." },
    { id: "b8", type: "example", text: "Exemple de démonstration." },
    { id: "b9", type: "caseStudy", heading: "Étude de cas", text: "Scénario fictif." },
    { id: "b10", type: "table", rows: [["Colonne A", "Colonne B"], ["1", "2"]] },
    { id: "b11", type: "video", meta: { placeholder: true, minutes: 6 } },
    { id: "b12", type: "audio", meta: { placeholder: true } },
    { id: "b13", type: "pdf", meta: { placeholder: true } },
    { id: "b14", type: "code", text: "console.log('démo');" },
    { id: "b15", type: "formula", text: "ROAS = revenus / dépenses" },
    { id: "b16", type: "checklist", items: ["Étape 1", "Étape 2"] },
    { id: "b17", type: "reflection", text: "Question de réflexion (démo)." },
    { id: "b18", type: "summary", text: "Résumé de démonstration." },
    { id: "b19", type: "unknown_block_type", text: "Bloc inconnu — fallback sûr attendu." },
  ];
  return {
    lessonId: "L-3-4",
    titleKey: "lesson.3.4.title",
    moduleTitleKey: "module.3.title",
    week: 9,
    estimatedMinutes: 25,
    objectives: ["Objectif 1 (démo)", "Objectif 2 (démo)"],
    blocks,
    resources: [
      { id: "r1", labelKey: "resource.slides", kind: "pdf", placeholder: true },
      { id: "r2", labelKey: "resource.video", kind: "video", placeholder: true },
    ],
    progressPercent: 40,
    canRequestValidation: true,
    canMarkComplete: false, // le serveur décide ; en démo la complétion n'est pas encore autorisée
    previousLessonId: "L-3-3",
    nextLessonId: "L-4-1",
  };
}

export function demoAssessmentIntro(): AssessmentIntroViewModel {
  return { assessmentId: "A-3", titleKey: "assessment.3.title", instructionsKey: "assessment.instructions", questionCount: 3, indicativeMinutes: 10, difficultyKey: "difficulty.medium", attemptNumber: 1, maxAttempts: 3 };
}

export function demoAssessment(): AssessmentViewModel {
  // AUCUNE bonne réponse : seulement le libellé public.
  return {
    assessmentId: "A-3", attemptId: "att-demo", answered: 1, total: 3, currentIndex: 0,
    questions: [
      { questionId: "q1", kind: "single", prompt: "Question à choix unique (démo) ?", options: [{ id: "o0", label: "Option A" }, { id: "o1", label: "Option B" }], points: 1 },
      { questionId: "q2", kind: "multiple", prompt: "Question à choix multiples (démo) ?", options: [{ id: "o0", label: "A" }, { id: "o1", label: "B" }, { id: "o2", label: "C" }], points: 2 },
      { questionId: "q3", kind: "true_false", prompt: "Affirmation vraie ou fausse (démo) ?", options: [{ id: "true", label: "Vrai" }, { id: "false", label: "Faux" }], points: 1 },
    ],
  };
}

export function demoAssessmentResult(): AssessmentResultViewModel {
  return {
    scorePercent: 75, passed: true,
    feedbackKeys: ["feedback.good_progress"], strengths: ["competency.c1"], toReview: ["competency.c2"],
    recommendations: demoRecommendations().slice(0, 2), nextStepKey: "next.continue_module",
  };
}

export function demoProgress(): ProgressViewModel {
  return {
    overallPercent: 42,
    modules: [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({ moduleId: `M-${i}`, titleKey: `module.${i}.title`, percent: i <= 2 ? 100 : i === 3 ? 45 : 0, completed: i <= 2 })),
    weeks: Array.from({ length: 24 }, (_, i) => ({ week: i + 1, percent: i < 8 ? 100 : i === 8 ? 40 : 0 })),
    lessonsCompleted: 34, quizzesPassed: 6, projects: 1,
    competencies: demoDashboard().competencies,
    studyMinutes: 860, streakDays: 5,
    goals: demoDashboard().goals,
    deadlines: demoCalendar().events.filter((e) => e.kind === "quiz" || e.kind === "project"),
    recommendations: demoRecommendations(),
  };
}

export function demoCalendar(): CalendarViewModel {
  return {
    events: [
      { id: "e1", labelKey: "calendar.lesson_3_4", at: "2026-12-02T00:00:00Z", kind: "lesson", status: "available" },
      { id: "e2", labelKey: "calendar.review_c2", at: "2026-12-05T00:00:00Z", kind: "review", status: "needs_review" },
      { id: "e3", labelKey: "calendar.quiz_4", at: "2026-12-15T00:00:00Z", kind: "quiz", status: "available" },
      { id: "e4", labelKey: "calendar.project", at: "2027-01-10T00:00:00Z", kind: "project", status: "not_started" },
      { id: "e5", labelKey: "calendar.exam", at: "2027-02-01T00:00:00Z", kind: "exam", status: "locked" },
    ],
  };
}

export function demoRecommendations() {
  return [
    { id: "rec1", kind: "continue_lesson" as const, labelKey: "rec.continue_lesson", reasonKey: "rec.reason.in_progress", targetId: "L-3-4" },
    { id: "rec2", kind: "review_competency" as const, labelKey: "rec.review_competency", reasonKey: "rec.reason.fragile_competency", targetId: "c2" },
    { id: "rec3", kind: "retry_quiz" as const, labelKey: "rec.retry_quiz", reasonKey: "rec.reason.below_threshold", targetId: "A-2" },
  ];
}

export function demoBadges(): BadgeViewModel[] {
  return [
    { badgeDefinitionId: "badge-module1", titleKey: "badge.module1.title", descriptionKey: "badge.module1.desc", obtained: true, criteriaKey: "badge.module1.criteria", obtainedAt: "2026-11-01T00:00:00Z", progressPercent: 100 },
    { badgeDefinitionId: "badge-module2", titleKey: "badge.module2.title", descriptionKey: "badge.module2.desc", obtained: true, criteriaKey: "badge.module2.criteria", obtainedAt: "2026-11-15T00:00:00Z", progressPercent: 100 },
    { badgeDefinitionId: "badge-module3", titleKey: "badge.module3.title", descriptionKey: "badge.module3.desc", obtained: false, criteriaKey: "badge.module3.criteria", obtainedAt: null, progressPercent: 45 },
  ];
}

export function demoCredentials(): CredentialViewModel[] {
  return [
    { publicVerificationIdMasked: "ABC••••Z9", documentTitle: CREDENTIAL_DOCUMENT_TITLE, status: "not_issued", issuedAt: null, version: 1, replacementReference: null },
  ];
}

export function demoNotifications(): NotificationViewModel[] {
  return [
    { id: "n1", kind: "module_unlocked", labelKey: "notif.module_unlocked", at: NOW, read: false },
    { id: "n2", kind: "quiz_retry", labelKey: "notif.quiz_retry", at: NOW, read: false },
    { id: "n3", kind: "badge_obtained", labelKey: "notif.badge_obtained", at: NOW, read: true },
    { id: "n4", kind: "access_expiring", labelKey: "notif.access_expiring", at: NOW, read: true },
  ];
}

export function demoNotes(): NoteViewModel[] {
  return [
    { id: "note1", lessonId: "L-3-3", body: "Ma note de démonstration.", updatedAt: NOW },
  ];
}
export function demoBookmarks(): BookmarkViewModel[] {
  return [
    { id: "bm1", lessonId: "L-3-2", lessonTitleKey: "lesson.3.2.title" },
  ];
}
