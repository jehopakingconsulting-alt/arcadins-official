/**
 * Runtime — UI/Completion : évaluation des reprises (Sprint K3C).
 *
 * Compose la politique de reprise FIGÉE (max tentatives, cooldown) issue de l'examen. Déterministe (horloge
 * injectée). Motif PUBLIC + motif INTERNE séparés. N'accorde jamais plus que la limite.
 */
import type { CompletionInput, RetakeOutcome } from "./completion-types.ts";

/** Évalue la disponibilité d'une reprise APRÈS une décision finale d'échec. */
export function evaluateRetake(input: CompletionInput, now: Date): RetakeOutcome {
  const exam = input.exam;
  const attemptsUsed = exam.attemptsUsed;
  const attemptsRemaining = Math.max(0, exam.maxAttempts - attemptsUsed);

  // Cooldown : la reprise n'est possible qu'après `cooldownSeconds` depuis la dernière tentative complétée.
  let cooldownUntil: string | null = null;
  let cooldownElapsed = true;
  if (exam.lastCompletedAt && exam.cooldownSeconds > 0) {
    const until = new Date(new Date(exam.lastCompletedAt).getTime() + exam.cooldownSeconds * 1000);
    cooldownUntil = until.toISOString();
    cooldownElapsed = now.getTime() >= until.getTime();
  }

  const internalReasonCodes: string[] = [];
  const exhausted = attemptsRemaining <= 0;
  const passed = exam.finalPassed === true;

  if (passed) {
    internalReasonCodes.push("ALREADY_PASSED");
    return { allowed: false, attemptsUsed, attemptsRemaining, cooldownUntil, exhausted: false, publicReasonKey: "completion.retake.not_needed", internalReasonCodes };
  }
  if (exhausted) {
    internalReasonCodes.push("MAX_ATTEMPTS_REACHED");
    return { allowed: false, attemptsUsed, attemptsRemaining, cooldownUntil, exhausted: true, publicReasonKey: "completion.retake.exhausted", internalReasonCodes };
  }
  if (!cooldownElapsed) {
    internalReasonCodes.push("COOLDOWN_NOT_ELAPSED");
    return { allowed: false, attemptsUsed, attemptsRemaining, cooldownUntil, exhausted: false, publicReasonKey: "completion.retake.cooldown", internalReasonCodes };
  }
  internalReasonCodes.push("RETAKE_AVAILABLE");
  return { allowed: true, attemptsUsed, attemptsRemaining, cooldownUntil, exhausted: false, publicReasonKey: "completion.retake.available", internalReasonCodes };
}
