/**
 * Runtime — Dashboard Étudiant : contrôleurs PURS (Sprint D).
 *
 * Chaque contrôleur produit une tranche du dashboard en DÉLÉGUANT au Runtime (A), à la Persistence (B)
 * et au Player (C). Aucune logique métier nouvelle, aucune écriture. Générique.
 */
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { LearningEvent, RuntimeState } from "../types.ts";
import { ProgressCalculator } from "../progress-calculator.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import { TimeTracker } from "../time-tracker.ts";
import { LearningPathEngine } from "../learning-path-engine.ts";
import { LessonEngine } from "../lesson-engine.ts";
import { UnlockRules } from "../unlock-rules.ts";
import { orderedModules, isoDay, findLesson } from "../helpers.ts";
import { LessonTimeline } from "../player/controllers.ts";
import { BadgeRepository, CertificateRepository, DEFAULT_BADGES, type BadgeDefinition } from "../persistence/repositories.ts";
import type { Awards } from "../persistence/types.ts";
import type {
  ActivityItem,
  AvailableExam,
  BadgeStatus,
  CalendarEntry,
  CertificationStatusView,
  CourseOverviewItem,
  DashboardNotification,
  LearningSummaryView,
  ModuleProgressItem,
  Recommendation,
  StudentAchievementsView,
  StudentProgressView,
  StudentStatisticsView,
  UpcomingLesson,
} from "./types.ts";

// ── StudentStatistics ──
export const StudentStatistics = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, awards: Awards, now: Date = new Date()): StudentStatisticsView {
    const { completed, total } = CompletionCalculator.lessonCompletionCount(curriculum, state);
    const modulesPassed = curriculum.modules.filter((m) => CompletionCalculator.isModulePassed(curriculum, state, m.index)).length;
    const badgesRemaining = DEFAULT_BADGES.filter((b) => !awards.badges.includes(b.code)).length;
    return {
      timeTotalSeconds: TimeTracker.timeSpentSeconds(state),
      timeTodaySeconds: state.study.byDay[isoDay(now)] ?? 0,
      averageScore: ProgressCalculator.averageScore(state),
      lessonsCompleted: completed,
      lessonsTotal: total,
      modulesPassed,
      modulesTotal: curriculum.modules.length,
      badgesOwned: awards.badges.length,
      badgesRemaining,
    };
  },
};

// ── StudentProgress ──
export const StudentProgress = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date = new Date()): StudentProgressView {
    const modules: ModuleProgressItem[] = orderedModules(curriculum).map((m) => ({
      moduleIndex: m.index,
      title: m.title,
      percent: ProgressCalculator.modulePercent(curriculum, state, m.index),
      state: UnlockRules.deriveModuleState(curriculum, state, m.index),
    }));
    return {
      globalPercent: ProgressCalculator.programPercent(curriculum, state),
      weeklyPercent: ProgressCalculator.weeklyPercent(curriculum, state, now),
      dailyPercent: ProgressCalculator.dailyPercent(curriculum, state, now),
      level: ProgressCalculator.level(curriculum, state),
      modules,
    };
  },
};

// ── StudentTimeline ── (réutilise le Player, pas de duplication)
export const StudentTimeline = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, currentRef?: string) {
    return LessonTimeline.build(curriculum, state, currentRef);
  },
};

// ── StudentAchievements ──
export const StudentAchievements = {
  build(
    curriculum: ProgramCurriculumV2,
    state: RuntimeState,
    awards: Awards,
    catalog: BadgeDefinition[] = DEFAULT_BADGES,
    now?: Date,
  ): StudentAchievementsView {
    const eligible = new Set(BadgeRepository.newlyEligible(curriculum, state, awards, catalog, now));
    const owned: BadgeStatus[] = [];
    const remaining: BadgeStatus[] = [];
    for (const b of catalog) {
      const isOwned = awards.badges.includes(b.code);
      const status: BadgeStatus = { code: b.code, label: b.label, description: b.description, owned: isOwned, eligible: eligible.has(b.code) };
      (isOwned ? owned : remaining).push(status);
    }
    return { owned, remaining };
  },
};

// ── StudentRecommendations ──
export const StudentRecommendations = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState): Recommendation[] {
    const recs: Recommendation[] = [];
    const resume = LessonEngine.continueWhereILeftOff(curriculum, state);
    if (resume) recs.push({ kind: "continue", label: "Continuer où j'étais", lessonRef: resume });

    const next = LearningPathEngine.nextLesson(curriculum, state);
    if (next && next !== resume) recs.push({ kind: "next-lesson", label: "Prochaine leçon", lessonRef: next });

    // Leçons à revoir (échec) = needs_review.
    for (const lp of Object.values(state.lessons)) {
      if (lp.state === "needs_review") recs.push({ kind: "review", label: "À revoir", lessonRef: lp.lessonRef, moduleIndex: lp.moduleIndex });
    }

    const objective = StudentRecommendations.nextObjective(curriculum, state);
    if (objective) recs.push(objective);
    return recs;
  },
  /** Prochain objectif : prochain module à débloquer, sinon prochaine leçon. */
  nextObjective(curriculum: ProgramCurriculumV2, state: RuntimeState): Recommendation | undefined {
    const pending = UnlockRules.unlockedPending(curriculum, state);
    if (pending.length > 0) {
      const idx = pending[0];
      const mod = curriculum.modules.find((m) => m.index === idx);
      return { kind: "next-objective", label: `Valider le module ${idx} : ${mod?.title ?? ""}`.trim(), moduleIndex: idx };
    }
    const next = LearningPathEngine.nextLesson(curriculum, state);
    return next ? { kind: "next-objective", label: "Terminer la prochaine leçon", lessonRef: next } : undefined;
  },
};

// ── StudentNotifications (in-app dérivées) ──
export const StudentNotifications = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, awards: Awards, now?: Date): DashboardNotification[] {
    const notifs: DashboardNotification[] = [];
    for (const m of curriculum.modules) {
      const st = UnlockRules.deriveModuleState(curriculum, state, m.index);
      if (st === "needs_review") notifs.push({ id: `nr-${m.index}`, kind: "needs-review", message: `Module ${m.index} : révision recommandée.` });
    }
    if (LearningPathEngine.isProgramComplete(curriculum, state)) {
      notifs.push({ id: "exam-ready", kind: "exam-ready", message: "Vous êtes prêt pour l'examen final." });
    }
    for (const code of BadgeRepository.newlyEligible(curriculum, state, awards, DEFAULT_BADGES, now)) {
      notifs.push({ id: `badge-${code}`, kind: "badge-available", message: `Nouveau badge disponible : ${code}.` });
    }
    if (CertificateRepository.isEligible(curriculum, state)) {
      notifs.push({ id: "cert", kind: "certificate-eligible", message: "Attestation disponible (éligible)." });
    }
    return notifs;
  },
};

// ── LearningCalendar ──
export const LearningCalendar = {
  build(state: RuntimeState): CalendarEntry[] {
    const completionsByDay: Record<string, number> = {};
    for (const lp of Object.values(state.lessons)) {
      if (lp.completedAt) {
        const d = isoDay(lp.completedAt);
        completionsByDay[d] = (completionsByDay[d] ?? 0) + 1;
      }
    }
    const days = new Set([...Object.keys(state.study.byDay), ...Object.keys(completionsByDay)]);
    return [...days]
      .sort()
      .map((day) => ({ day, studySeconds: state.study.byDay[day] ?? 0, lessonsCompleted: completionsByDay[day] ?? 0 }));
  },
};

// ── UpcomingLessons ──
export const UpcomingLessons = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, limit = 5): UpcomingLesson[] {
    const out: UpcomingLesson[] = [];
    for (const ref of LessonEngine.sequence(curriculum)) {
      if (out.length >= limit) break;
      const st = LessonEngine.stateOf(state, ref);
      if ((st === "available" || st === "in_progress") && !CompletionCalculator.isLessonCompleted(state, ref)) {
        const lesson = findLesson(curriculum, ref);
        out.push({ lessonRef: ref, moduleIndex: LessonEngine.moduleIndexOf(curriculum, ref), title: lesson?.title ?? ref });
      }
    }
    return out;
  },
};

// ── RecentActivity ──
export const RecentActivity = {
  build(state: RuntimeState, limit = 15): ActivityItem[] {
    return [...state.events]
      .slice(-limit)
      .reverse()
      .map(toActivityItem)
      .filter((a): a is ActivityItem => a !== null);
  },
};

function toActivityItem(e: LearningEvent): ActivityItem | null {
  switch (e.type) {
    case "LESSON_VIEWED":
      return { type: "lesson_viewed", at: e.at, lessonRef: e.lessonRef, label: "Leçon consultée" };
    case "LESSON_COMPLETED":
      return { type: "lesson_completed", at: e.at, lessonRef: e.lessonRef, label: "Leçon terminée" };
    case "QUIZ_SUBMITTED":
      return { type: "quiz_submitted", at: e.at, lessonRef: e.lessonRef, label: `Quiz soumis (${e.score}%)` };
    case "SUMMATIVE_SUBMITTED":
      return { type: "summative_submitted", at: e.at, moduleIndex: e.moduleIndex, label: `Sommatif module ${e.moduleIndex} (${e.score}%)` };
    case "PRACTICAL_SUBMITTED":
      return { type: "practical_submitted", at: e.at, moduleIndex: e.moduleIndex, label: `Travail pratique module ${e.moduleIndex} soumis` };
    case "NOTE_SAVED":
      return { type: "note_saved", at: e.at, lessonRef: e.lessonRef, label: "Note enregistrée" };
    case "BOOKMARK_TOGGLED":
      return { type: "bookmark_toggled", at: e.at, lessonRef: e.lessonRef, label: e.on ? "Favori ajouté" : "Favori retiré" };
    default:
      return null; // LESSON_POSITION, STUDY_TIME, MODULE_UNLOCKED : non listés dans l'activité
  }
}

// ── LearningSummary ──
export const LearningSummary = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, now: Date = new Date()): LearningSummaryView {
    return {
      resumeLessonRef: LessonEngine.continueWhereILeftOff(curriculum, state),
      globalPercent: ProgressCalculator.programPercent(curriculum, state),
      timeTotalSeconds: TimeTracker.timeSpentSeconds(state),
      timeTodaySeconds: state.study.byDay[isoDay(now)] ?? 0,
      estimatedRemainingSeconds: TimeTracker.estimatedRemainingSeconds(curriculum, state),
      nextObjective: StudentRecommendations.nextObjective(curriculum, state),
    };
  },
};

// ── CourseOverview ──
export const CourseOverview = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState): CourseOverviewItem {
    const percent = ProgressCalculator.programPercent(curriculum, state);
    const completed = LearningPathEngine.isProgramComplete(curriculum, state);
    return { programSlug: curriculum.slug, title: curriculum.title, percent, active: !completed, completed };
  },
};

// ── CertificationStatus ──
export const CertificationStatus = {
  build(curriculum: ProgramCurriculumV2, state: RuntimeState, awards: Awards): CertificationStatusView {
    const eligible = CertificateRepository.isEligible(curriculum, state);
    const complete = LearningPathEngine.isProgramComplete(curriculum, state);
    const examsAvailable: AvailableExam[] = complete
      ? curriculum.modules.filter((m) => m.finalExam).map((m) => ({ examId: m.finalExam!.id, title: m.finalExam!.title }))
      : [];
    return {
      eligible,
      status: eligible ? "eligible" : "locked",
      certificates: CertificateRepository.owned(awards),
      examsAvailable,
    };
  },
};
