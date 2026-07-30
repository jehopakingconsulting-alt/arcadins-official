/**
 * Runtime — Exam : ExamAttemptManager (Sprint G).
 *
 * Construit et fait évoluer la tentative PRIVÉE : sélection déterministe et FIGÉE des questions par section
 * (via le QuestionSelector du Sprint F), chronomètre autoritaire, budget de tentatives, accommodations.
 * Une reprise crée TOUJOURS une nouvelle tentative liée (`previousAttemptId`) sans jamais écraser l'antérieure.
 */
import type {
  ExamAccommodation,
  ExamAttempt,
  ExamFrozenSection,
  ExamRetakePolicy,
  ExamSessionStatus,
  FinalExamDefinition,
} from "./types.ts";
import type { QuestionBank } from "../assessment/question-bank.ts";
import { QuestionSelector } from "../assessment/question-selector.ts";
import { AuthoritativeExamTimer } from "./authoritative-timer.ts";
import { EMPTY_INTEGRITY } from "./exam-integrity-engine.ts";

export interface CreateAttemptInput {
  id: string;
  sessionId: string;
  definition: FinalExamDefinition;
  bank: QuestionBank;
  learnerRef: string;
  attemptNumber: number;
  previousAttemptId?: string | null;
  retakeReason?: string | null;
  retakeAuthorizedBy?: string | null;
  cooldownUntil?: string | null;
  accommodations?: ExamAccommodation[];
  seed: number;
  now: Date;
  gracePeriodSeconds: number;
  kind?: "official" | "practice";
}

export const ExamAttemptManager = {
  /** Somme du temps supplémentaire (accessibilité), bornée à ≥ 0. */
  extraTimeSeconds(accommodations: ExamAccommodation[]): number {
    return Math.max(0, accommodations.filter((a) => a.type === "extra_time").reduce((n, a) => n + (a.extraTimeSeconds ?? 0), 0));
  },

  /** Sections dont l'apprenant est exempté (accommodation section_exemption). */
  exemptedSectionIds(accommodations: ExamAccommodation[]): string[] {
    return accommodations.filter((a) => a.type === "section_exemption" && a.sectionId).map((a) => a.sectionId as string);
  },

  /** Sélectionne et fige les questions de chaque section (déterministe, graine dérivée par index). */
  freezeSections(definition: FinalExamDefinition, bank: QuestionBank, seed: number, exempted: string[]): ExamFrozenSection[] {
    return definition.sections
      .filter((s) => !exempted.includes(s.id))
      .map((s, index) => {
        // Graine dérivée déterministe par section : même (seed, index) → même sélection.
        const sectionSeed = (seed + index * 2654435761) >>> 0;
        const questions = QuestionSelector.select(bank, s.selection, sectionSeed);
        return {
          id: s.id,
          titleKey: s.titleKey,
          weight: s.weight,
          minSectionPercent: s.minSectionPercent,
          eliminatory: s.eliminatory ?? false,
          durationLimitSeconds: s.durationLimitSeconds,
          sequential: s.sequential ?? (definition.navigation.mode === "sequential"),
          lockAfterComplete: s.lockAfterComplete ?? definition.navigation.lockSectionAfterComplete,
          questions,
          locked: false,
        };
      });
  },

  create(input: CreateAttemptInput): ExamAttempt {
    const accommodations = input.accommodations ?? [];
    const exempted = ExamAttemptManager.exemptedSectionIds(accommodations);
    const sections = ExamAttemptManager.freezeSections(input.definition, input.bank, input.seed, exempted);
    const extraTime = ExamAttemptManager.extraTimeSeconds(accommodations);
    const allowPause = accommodations.some((a) => a.type === "allow_pause");
    const allowedPauseSeconds = allowPause ? Number.MAX_SAFE_INTEGER : 0;

    const timer = AuthoritativeExamTimer.create({
      startedAt: input.now,
      durationLimitSeconds: input.definition.durationLimitSeconds,
      extraTimeSeconds: extraTime,
      gracePeriodSeconds: input.gracePeriodSeconds,
      allowedPauseSeconds,
    });
    // La tentative est « ready » : le chronomètre officiel ne court qu'au démarrage explicite.
    const at = input.now.toISOString();

    return {
      id: input.id,
      sessionId: input.sessionId,
      examId: input.definition.examId,
      programId: input.definition.programId,
      learnerRef: input.learnerRef,
      attemptNumber: input.attemptNumber,
      maximumAttempts: input.definition.retake.maximumAttempts,
      remainingAttempts: Math.max(0, input.definition.retake.maximumAttempts - input.attemptNumber),
      kind: input.kind ?? "official",
      lifecycle: "active",
      previousAttemptId: input.previousAttemptId ?? null,
      retakeReason: input.retakeReason ?? null,
      retakeAuthorizedBy: input.retakeAuthorizedBy ?? null,
      cooldownUntil: input.cooldownUntil ?? null,
      specialAccommodation: accommodations,
      invalidationReason: null,
      cancellationReason: null,
      status: "ready",
      frozenVersion: structuredClone(input.definition.version),
      gradingPolicy: structuredClone(input.definition.grading),
      navigationPolicy: structuredClone(input.definition.navigation),
      retakePolicy: structuredClone(input.definition.retake),
      passThresholdPercent: input.definition.passThresholdPercent,
      sections,
      // Chronomètre remis à l'état « non démarré » tant que start() n'a pas été appelé.
      timer: { ...timer, officialStartedAt: null, remainingOfficialSeconds: timer.durationLimitSeconds + timer.extraTimeSeconds, elapsedOfficialSeconds: 0, expired: false, inGracePeriod: false },
      responses: {},
      responseHistory: {},
      provisionalResult: null,
      finalResult: null,
      integrity: EMPTY_INTEGRITY,
      processedCommands: {},
      createdAt: at,
      updatedAt: at,
    };
  },

  withStatus(attempt: ExamAttempt, status: ExamSessionStatus, now: Date): ExamAttempt {
    return { ...attempt, status, updatedAt: now.toISOString() };
  },

  /** Démarre officiellement la tentative : le chronomètre autoritaire commence à courir. */
  start(attempt: ExamAttempt, now: Date): ExamAttempt {
    const timer = AuthoritativeExamTimer.create({
      startedAt: now,
      durationLimitSeconds: attempt.timer.durationLimitSeconds,
      extraTimeSeconds: attempt.timer.extraTimeSeconds,
      gracePeriodSeconds: attempt.timer.gracePeriodSeconds,
      allowedPauseSeconds: attempt.timer.allowedPauseSeconds,
    });
    return { ...attempt, status: "active", timer, updatedAt: now.toISOString() };
  },

  /** Autorise-t-on une nouvelle tentative selon le budget et le délai ? */
  canRetake(policy: ExamRetakePolicy, attemptNumber: number, lastCompletedAt: string | null, now: Date): { allowed: boolean; reasonCodes: string[] } {
    const reasonCodes: string[] = [];
    if (attemptNumber > policy.maximumAttempts) reasonCodes.push("MAX_ATTEMPTS_REACHED");
    if (policy.cooldownSeconds > 0 && lastCompletedAt) {
      const elapsed = (now.getTime() - new Date(lastCompletedAt).getTime()) / 1000;
      if (elapsed < policy.cooldownSeconds) reasonCodes.push("COOLDOWN_NOT_ELAPSED");
    }
    return { allowed: reasonCodes.length === 0, reasonCodes };
  },
};
