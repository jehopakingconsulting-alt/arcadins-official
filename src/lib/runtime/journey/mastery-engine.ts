/**
 * Runtime — Journey : MasteryEngine (Sprint E).
 *
 * Calcule la maîtrise par compétence de façon PURE et DÉTERMINISTE, à partir de signaux réels du Runtime
 * (aucune donnée inventée). La maîtrise ne dépend jamais d'un seul quiz : elle combine, selon la config,
 * complétion, réussite des leçons, sommatifs, pratiques et validation tuteur.
 */
import type { ProgramCurriculumV2, ModuleV2 } from "@/lib/academic/types";
import type { JourneyContext, MasteryLevel, MasteryProfile, MasteryStrength, SkillMastery } from "./types.ts";
import { CompletionCalculator } from "../completion-calculator.ts";
import { clamp, round } from "../helpers.ts";

function skillsOf(curriculum: ProgramCurriculumV2): string[] {
  const set = new Set<string>();
  for (const m of curriculum.modules) for (const c of m.competencies) set.add(c);
  return [...set].sort();
}

function modulesOfSkill(curriculum: ProgramCurriculumV2, skill: string): ModuleV2[] {
  return curriculum.modules.filter((m) => m.competencies.includes(skill));
}

export const MasteryEngine = {
  build(ctx: JourneyContext): MasteryProfile {
    const { curriculum, state, config } = ctx;
    const tutorValidated = new Set(ctx.tutorValidatedSkillIds ?? []);
    const w = config.mastery.weights;
    const th = config.mastery.thresholds;
    const usedWeights = w.lessonCompleted + w.lessonPassed + w.summative + w.practical + w.tutor || 1;

    const skills = skillsOf(curriculum).map((skillId): SkillMastery => {
      const mods = modulesOfSkill(curriculum, skillId);
      const lessons = mods.flatMap((m) => m.lessons);
      const lessonsTotal = lessons.length;
      const lessonsCompleted = lessons.filter((l) => CompletionCalculator.isLessonCompleted(state, l.id)).length;
      const lessonsPassed = lessons.filter((l) => CompletionCalculator.isLessonPassed(state, l.id)).length;
      const summativesPassed = mods.filter((m) => CompletionCalculator.moduleSummativePassed(state, m.index)).length;
      const practicalsSubmitted = mods.filter((m) => CompletionCalculator.modulePracticalSubmitted(state, m.index)).length;
      const isTutor = tutorValidated.has(skillId);

      const completionRatio = lessonsTotal ? lessonsCompleted / lessonsTotal : 0;
      const passRatio = lessonsTotal ? lessonsPassed / lessonsTotal : 0;
      const summativeRatio = mods.length ? summativesPassed / mods.length : 0;
      const practicalRatio = mods.length ? practicalsSubmitted / mods.length : 0;

      const score = clamp(
        (w.lessonCompleted * completionRatio +
          w.lessonPassed * passRatio +
          w.summative * summativeRatio +
          w.practical * practicalRatio +
          w.tutor * (isTutor ? 1 : 0)) /
          usedWeights,
        0,
        1,
      );

      const level: MasteryLevel =
        score >= th.mastered ? "mastered" : score >= th.passed ? "passed" : score >= th.practiced ? "practiced" : score > 0 ? "exposed" : "unknown";
      const strength: MasteryStrength = score >= th.mastered ? "strong" : score >= th.practiced ? "fragile" : "insufficient";

      // Dernière réussite : date de complétion la plus récente parmi les leçons réussies.
      let lastSuccessAt: string | null = null;
      for (const l of lessons) {
        const lp = state.lessons[l.id];
        if (lp?.completedAt && CompletionCalculator.isLessonPassed(state, l.id)) {
          if (!lastSuccessAt || lp.completedAt > lastSuccessAt) lastSuccessAt = lp.completedAt;
        }
      }

      return {
        skillId,
        level,
        score: round(score, 3),
        strength,
        lastSuccessAt,
        signals: {
          lessonsTotal,
          lessonsCompleted,
          lessonsPassed,
          modulesTotal: mods.length,
          summativesPassed,
          practicalsSubmitted,
          tutorValidated: isTutor,
        },
      };
    });

    return { skills, generatedAt: ctx.now.toISOString() };
  },

  /** Compétences fragiles ou insuffisantes (à renforcer), triées par score croissant puis id. */
  weakSkills(profile: MasteryProfile): SkillMastery[] {
    return profile.skills
      .filter((s) => s.strength !== "strong" && s.score > 0)
      .sort((a, b) => a.score - b.score || (a.skillId < b.skillId ? -1 : 1));
  },
};
