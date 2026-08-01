/**
 * Runtime — Journey : RemediationEngine (Sprint E).
 *
 * Détecte les difficultés répétées (échecs) via le journal d'événements et propose des actions de remédiation
 * BORNÉES (nombre de reprises limité par config, sortie encadrée quand le seuil est atteint). Déterministe, explicable.
 */
import type { JourneyContext, RemediationPlan, RemediationStep } from "./types.ts";
import { CompletionCalculator } from "../completion-calculator.ts";

export const RemediationEngine = {
  build(ctx: JourneyContext): RemediationPlan[] {
    const { state, config } = ctx;
    const max = config.remediation.maxAttempts;

    // Comptage des échecs par cible (déterministe, à partir des événements).
    const lessonFails = new Map<string, number>();
    const moduleFails = new Map<number, number>();
    for (const e of state.events) {
      if (e.type === "QUIZ_SUBMITTED" && !e.passed) lessonFails.set(e.lessonRef, (lessonFails.get(e.lessonRef) ?? 0) + 1);
      if (e.type === "SUMMATIVE_SUBMITTED" && !e.passed) moduleFails.set(e.moduleIndex, (moduleFails.get(e.moduleIndex) ?? 0) + 1);
    }

    const plans: RemediationPlan[] = [];

    for (const [lessonRef, attempt] of [...lessonFails.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
      if (CompletionCalculator.isLessonPassed(state, lessonRef)) continue; // déjà réussi → pas de remédiation
      plans.push(lessonPlan(lessonRef, attempt, max));
    }
    for (const [moduleIndex, attempt] of [...moduleFails.entries()].sort((a, b) => a[0] - b[0])) {
      if (CompletionCalculator.moduleSummativePassed(state, moduleIndex)) continue;
      plans.push(modulePlan(moduleIndex, attempt, max));
    }

    return plans;
  },
};

function lessonPlan(lessonRef: string, attempt: number, max: number): RemediationPlan {
  const exhausted = attempt >= max;
  const steps: RemediationStep[] = exhausted
    ? [{ action: "contact-tutor", targetType: "lesson", targetId: lessonRef, reasonCodes: ["MAX_ATTEMPTS_REACHED"] }]
    : [
        { action: "review-lesson", targetType: "lesson", targetId: lessonRef, reasonCodes: ["REPEATED_FAILURE"] },
        { action: "redo-activity", targetType: "lesson", targetId: lessonRef, reasonCodes: ["REPEATED_FAILURE"] },
      ];
  return {
    targetType: "lesson",
    targetId: lessonRef,
    attempt,
    maxAttempts: max,
    exhausted,
    steps,
    reasonCodes: exhausted ? ["REMEDIATION_EXHAUSTED"] : ["REMEDIATION_RECOMMENDED"],
  };
}

function modulePlan(moduleIndex: number, attempt: number, max: number): RemediationPlan {
  const exhausted = attempt >= max;
  const id = String(moduleIndex);
  const steps: RemediationStep[] = exhausted
    ? [{ action: "contact-tutor", targetType: "module", targetId: id, reasonCodes: ["MAX_ATTEMPTS_REACHED"] }]
    : [
        { action: "study-resource", targetType: "module", targetId: id, reasonCodes: ["REPEATED_FAILURE"] },
        { action: "redo-activity", targetType: "module", targetId: id, reasonCodes: ["REPEATED_FAILURE"] },
      ];
  return {
    targetType: "module",
    targetId: id,
    attempt,
    maxAttempts: max,
    exhausted,
    steps,
    reasonCodes: exhausted ? ["REMEDIATION_EXHAUSTED"] : ["REMEDIATION_RECOMMENDED"],
  };
}
