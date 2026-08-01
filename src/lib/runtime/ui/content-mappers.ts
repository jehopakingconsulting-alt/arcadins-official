/**
 * Runtime — UI : mappers CONTENU ACADÉMIQUE → view models (Sprint K1).
 *
 * Transforme un `ProgramCurriculumV2` RÉEL (Marketing v2 ou tout programme) en view models d'interface :
 * aperçu programme, parcours (modules/semaines/leçons), lecteur de leçon (blocs de contenu). GÉNÉRIQUE : aucune
 * logique propre à un programme. SÉCURITÉ : n'expose JAMAIS de donnée de correction — les `answerKey` des activités
 * interactives et les bonnes réponses des banques sont EXCLUS des blocs publics (garde `ensureClean`).
 *
 * La PROGRESSION réelle (statuts calculés par le moteur) est branchée au sous-sprint K2 ; ici, un overlay
 * optionnel fournit des statuts, sinon un défaut déterministe neutre est appliqué (module 1 accessible, suivants
 * verrouillés — la raison de verrouillage reste une donnée, jamais recalculée par le composant).
 */
import type {
  InteractiveActivity,
  LessonV2,
  ModuleV2,
  ProgramCurriculumV2,
} from "@/lib/academic/types";
import type { ContentBlock, JourneyStatus } from "./types.ts";
import type {
  CompetencyViewModel,
  JourneyViewModel,
  LessonJourneyItemViewModel,
  LessonPlayerViewModel,
  ModuleViewModel,
  ProgramOverviewViewModel,
  ProgressViewModel,
  ResourceViewModel,
  WeekViewModel,
} from "./view-models.ts";
import { ensureClean } from "./mappers.ts";

/** Overlay de progression optionnel (fourni par le moteur au K2 ; défaut neutre sinon). */
export interface ProgressOverlay {
  lessonStatus?: Record<string, JourneyStatus>;
  lessonPercent?: Record<string, number>;
  moduleAvailable?: Record<number, boolean>;
  currentLessonId?: string | null;
}

export function toProgramOverview(c: ProgramCurriculumV2): ProgramOverviewViewModel {
  return ensureClean({
    programId: c.slug,
    programTitle: c.title,
    totalWeeks: c.totalWeeks,
    totalModules: c.modules.length,
    passThresholdPercent: c.passingScore,
  });
}

/** Ordre plat des leçons du programme (pour précédent/suivant + leçon courante). */
export function flattenLessons(c: ProgramCurriculumV2): { lessonId: string; moduleIndex: number }[] {
  return c.modules.flatMap((m) => m.lessons.map((l) => ({ lessonId: l.id, moduleIndex: m.index })));
}

/** Regroupe les leçons d'un module par semaine (par `lesson.week` si fourni, sinon répartition en 3 blocs). */
function groupLessonsByWeek(m: ModuleV2): { week: number; lessons: LessonV2[] }[] {
  const weeks = m.weeks;
  const haveWeeks = m.lessons.every((l) => typeof l.week === "number" && weeks.includes(l.week as number));
  if (haveWeeks) {
    return weeks.map((w) => ({ week: w, lessons: m.lessons.filter((l) => l.week === w) }));
  }
  // Répartition déterministe en 3 groupes ~égaux mappés sur les 3 semaines.
  const perWeek = Math.ceil(m.lessons.length / weeks.length) || 1;
  return weeks.map((w, i) => ({ week: w, lessons: m.lessons.slice(i * perWeek, (i + 1) * perWeek) }));
}

export function toJourneyViewModel(c: ProgramCurriculumV2, overlay: ProgressOverlay = {}): JourneyViewModel {
  const modules: ModuleViewModel[] = c.modules.map((m, mi) => {
    const available = overlay.moduleAvailable?.[m.index] ?? mi === 0; // défaut : seul le 1er module accessible
    const moduleStatus: JourneyStatus = available ? (mi === 0 ? "in_progress" : "available") : "locked";
    const weeks: WeekViewModel[] = groupLessonsByWeek(m).map((wk) => ({
      week: wk.week,
      titleKey: `Semaine ${wk.week}`,
      status: available ? "available" : "locked",
      lessons: wk.lessons.map((l): LessonJourneyItemViewModel => {
        const status = overlay.lessonStatus?.[l.id] ?? (available ? "available" : "locked");
        return {
          lessonId: l.id,
          titleKey: l.title,
          status,
          percent: overlay.lessonPercent?.[l.id] ?? 0,
          lockedReasonCode: status === "locked" ? "PREREQUISITE_MODULE_INCOMPLETE" : null,
        };
      }),
    }));
    // Pourcentage module = moyenne des pourcentages de leçons.
    const allLessons = weeks.flatMap((w) => w.lessons);
    const percent = allLessons.length > 0 ? Math.round(allLessons.reduce((a, l) => a + l.percent, 0) / allLessons.length) : 0;
    return { moduleId: `M-${m.index}`, index: m.index, titleKey: m.title, status: moduleStatus, percent, weeks };
  });
  const currentLessonId = overlay.currentLessonId ?? c.modules[0]?.lessons[0]?.id ?? null;
  return ensureClean({ program: toProgramOverview(c), modules, currentLessonId });
}

/** Convertit une activité interactive en bloc PUBLIC — SANS `answerKey` ni `feedback` (correction privée). */
function interactiveActivityToBlock(a: InteractiveActivity, idx: number): ContentBlock {
  const lines = [a.objective, ...a.instructions];
  if (a.successCriterion) lines.push(`Critère de réussite : ${a.successCriterion}`);
  return { id: `ia-${idx}-${a.id}`, type: "interactiveActivity", heading: a.title, text: lines.join("\n"), items: a.instructions };
}

/** Mappe une leçon RÉELLE en blocs de contenu (ordre pédagogique). Aucune donnée de correction. */
export function lessonToBlocks(l: LessonV2): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let n = 0;
  const push = (b: Omit<ContentBlock, "id">) => blocks.push({ id: `b${n++}`, ...b });

  if (l.introduction) push({ type: "paragraph", text: l.introduction });
  if (l.sections && l.sections.length > 0) {
    for (const s of l.sections) {
      push({ type: "heading", heading: s.heading });
      for (const p of s.body) push({ type: "paragraph", text: p });
    }
  } else if (l.content && l.content.length > 0) {
    for (const p of l.content) push({ type: "paragraph", text: p });
  }
  for (const d of l.definitions ?? []) push({ type: "definition", heading: d.term, text: d.definition });
  for (const ex of l.examples ?? []) push({ type: "example", text: ex });
  for (const f of l.formulas ?? []) push({ type: "formula", text: `${f.name} = ${f.expression} — ${f.example}` });
  if (l.caseStudy) push({ type: "caseStudy", heading: l.caseStudy.title, text: `${l.caseStudy.isFictional ? "(cas fictif) " : ""}${l.caseStudy.body.join("\n\n")}` });
  (l.interactiveActivities ?? []).forEach((a, i) => blocks.push(interactiveActivityToBlock(a, i)));
  if (l.commonError) push({ type: "warning", heading: l.commonError.title, text: l.commonError.body });
  if (l.vigilancePoint) push({ type: "warning", heading: l.vigilancePoint.title, text: l.vigilancePoint.body });
  for (const k of l.keyTakeaways ?? []) push({ type: "keyTakeaway", text: k });
  if (l.summary) push({ type: "summary", text: l.summary });
  return blocks;
}

export function toLessonResources(l: LessonV2): ResourceViewModel[] {
  return (l.resources ?? []).map((r, i) => ({ id: `res-${l.id}-${i}`, labelKey: r, kind: "link", placeholder: true }));
}

export function toLessonPlayerViewModel(c: ProgramCurriculumV2, lessonId: string, overlay: ProgressOverlay = {}): LessonPlayerViewModel | null {
  const flat = flattenLessons(c);
  const idx = flat.findIndex((f) => f.lessonId === lessonId);
  if (idx < 0) return null;
  let lesson: LessonV2 | undefined;
  let mod: ModuleV2 | undefined;
  for (const m of c.modules) {
    const found = m.lessons.find((l) => l.id === lessonId);
    if (found) { lesson = found; mod = m; break; }
  }
  if (!lesson || !mod) return null;

  return ensureClean({
    lessonId: lesson.id,
    titleKey: lesson.title,
    moduleTitleKey: mod.title,
    week: lesson.week ?? mod.weeks[0] ?? null,
    estimatedMinutes: lesson.durationMinutes ?? 20,
    objectives: [...lesson.objectives],
    blocks: lessonToBlocks(lesson),
    resources: toLessonResources(lesson),
    progressPercent: overlay.lessonPercent?.[lesson.id] ?? 0,
    canRequestValidation: !!lesson.exercise || !!lesson.activity,
    canMarkComplete: overlay.lessonStatus?.[lesson.id] === "completed", // le serveur décide (K2) ; défaut false
    previousLessonId: idx > 0 ? flat[idx - 1].lessonId : null,
    nextLessonId: idx < flat.length - 1 ? flat[idx + 1].lessonId : null,
  });
}

/** Premier lesson id « accessible » (module 1 par défaut) — point d'entrée du lecteur. */
export function firstAccessibleLessonId(c: ProgramCurriculumV2, overlay: ProgressOverlay = {}): string | null {
  return overlay.currentLessonId ?? c.modules[0]?.lessons[0]?.id ?? null;
}

/** Progression RÉELLE dérivée du contenu + overlay (structure réelle ; valeurs 0 par défaut jusqu'au moteur K2). */
export function toContentProgress(c: ProgramCurriculumV2, overlay: ProgressOverlay = {}): ProgressViewModel {
  const journey = toJourneyViewModel(c, overlay);
  const modules = journey.modules.map((m) => ({ moduleId: m.moduleId, titleKey: m.titleKey, percent: m.percent, completed: m.percent >= 100 }));
  const overall = modules.length > 0 ? Math.round(modules.reduce((a, m) => a + m.percent, 0) / modules.length) : 0;
  const allLessons = c.modules.flatMap((m) => m.lessons);
  const lessonsCompleted = allLessons.filter((l) => overlay.lessonStatus?.[l.id] === "completed").length;
  const competencies: CompetencyViewModel[] = c.exitCompetencies.slice(0, 8).map((code) => ({ code, labelKey: code, percent: 0, level: "insufficient" }));
  const weeks = Array.from({ length: c.totalWeeks }, (_, i) => ({ week: i + 1, percent: 0 }));
  return ensureClean({
    overallPercent: overall,
    modules,
    weeks,
    lessonsCompleted,
    quizzesPassed: 0,
    projects: 0,
    competencies,
    studyMinutes: 0,
    streakDays: 0,
    goals: [],
    deadlines: [],
    recommendations: [],
  });
}

/** Titre du module courant + prochaine leçon (pour le tableau de bord), dérivés du contenu réel. */
export function academicDashboardFocus(c: ProgramCurriculumV2, overlay: ProgressOverlay = {}): { currentModuleTitle: string | null; nextLessonTitle: string | null; nextLessonId: string | null; overallPercent: number } {
  const flat = flattenLessons(c);
  const currentId = firstAccessibleLessonId(c, overlay);
  const currentIdx = flat.findIndex((f) => f.lessonId === currentId);
  const currentModule = c.modules.find((m) => m.lessons.some((l) => l.id === currentId)) ?? c.modules[0] ?? null;
  const nextEntry = currentIdx >= 0 && currentIdx < flat.length - 1 ? flat[currentIdx + 1] : null;
  const nextLesson = nextEntry ? c.modules.flatMap((m) => m.lessons).find((l) => l.id === nextEntry.lessonId) ?? null : null;
  const progress = toContentProgress(c, overlay);
  return {
    currentModuleTitle: currentModule ? `Module ${currentModule.index} — ${currentModule.title}` : null,
    nextLessonTitle: nextLesson ? nextLesson.title : null,
    nextLessonId: nextEntry?.lessonId ?? null,
    overallPercent: progress.overallPercent,
  };
}
