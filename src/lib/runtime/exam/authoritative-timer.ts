/**
 * Runtime — Exam : AuthoritativeExamTimer (Sprint G).
 *
 * Chronomètre DÉTERMINISTE et AUTORITAIRE fondé exclusivement sur une horloge injectée (`now`).
 * Ne JAMAIS appeler Date.now() dans la logique centrale : le navigateur peut afficher un compte à rebours,
 * mais l'autorité temporelle reste serveur. Gère temps supplémentaire, pauses bornées, période de grâce,
 * dérive du client, reconnexion, heartbeat en retard et expiration.
 */
import type { ExamTimerState } from "./types.ts";

export interface CreateTimerInput {
  startedAt: Date;
  durationLimitSeconds: number;
  extraTimeSeconds: number;
  gracePeriodSeconds: number;
  allowedPauseSeconds: number;
}

export const AuthoritativeExamTimer = {
  create(input: CreateTimerInput): ExamTimerState {
    const startedAt = input.startedAt.toISOString();
    const state: ExamTimerState = {
      officialStartedAt: startedAt,
      lastHeartbeatAt: startedAt,
      officialSubmittedAt: null,
      durationLimitSeconds: input.durationLimitSeconds,
      extraTimeSeconds: input.extraTimeSeconds,
      gracePeriodSeconds: input.gracePeriodSeconds,
      allowedPauseSeconds: input.allowedPauseSeconds,
      totalPausedSeconds: 0,
      pausedSince: null,
      elapsedOfficialSeconds: 0,
      remainingOfficialSeconds: input.durationLimitSeconds + input.extraTimeSeconds,
      expired: false,
      inGracePeriod: false,
    };
    return AuthoritativeExamTimer.recompute(state, input.startedAt);
  },

  /** Limite effective (durée + temps supplémentaire d'accessibilité). */
  effectiveLimitSeconds(state: ExamTimerState): number {
    return state.durationLimitSeconds + state.extraTimeSeconds;
  },

  /**
   * Recalcule l'état à partir de l'horloge injectée. Le temps en pause (en cours ou cumulé) est exclu.
   * Toujours borné : elapsed ≥ 0, remaining ≥ 0.
   */
  recompute(state: ExamTimerState, now: Date): ExamTimerState {
    if (!state.officialStartedAt) return state;
    if (state.officialSubmittedAt) return state; // gelé après soumission

    const startMs = new Date(state.officialStartedAt).getTime();
    const nowMs = now.getTime();
    const currentPause = state.pausedSince ? Math.max(0, Math.floor((nowMs - new Date(state.pausedSince).getTime()) / 1000)) : 0;
    const grossElapsed = Math.max(0, Math.floor((nowMs - startMs) / 1000));
    const elapsed = Math.max(0, grossElapsed - state.totalPausedSeconds - currentPause);

    const limit = AuthoritativeExamTimer.effectiveLimitSeconds(state);
    const remaining = Math.max(0, limit - elapsed);
    const expired = elapsed > limit + state.gracePeriodSeconds;
    const inGracePeriod = elapsed > limit && elapsed <= limit + state.gracePeriodSeconds;

    return { ...state, elapsedOfficialSeconds: elapsed, remainingOfficialSeconds: remaining, expired, inGracePeriod };
  },

  /** Met en pause (horodatage autoritaire). Idempotent si déjà en pause. */
  pause(state: ExamTimerState, now: Date): ExamTimerState {
    if (state.pausedSince) return state;
    const recomputed = AuthoritativeExamTimer.recompute(state, now);
    return { ...recomputed, pausedSince: now.toISOString() };
  },

  /** Reprend : cumule le temps de pause écoulé (borné au budget autorisé). */
  resume(state: ExamTimerState, now: Date): ExamTimerState {
    if (!state.pausedSince) return AuthoritativeExamTimer.recompute(state, now);
    const paused = Math.max(0, Math.floor((now.getTime() - new Date(state.pausedSince).getTime()) / 1000));
    const totalPausedSeconds = Math.min(state.allowedPauseSeconds, state.totalPausedSeconds + paused);
    const resumed: ExamTimerState = { ...state, pausedSince: null, totalPausedSeconds, lastHeartbeatAt: now.toISOString() };
    return AuthoritativeExamTimer.recompute(resumed, now);
  },

  /** Enregistre un heartbeat (autorité serveur). */
  heartbeat(state: ExamTimerState, now: Date): ExamTimerState {
    const recomputed = AuthoritativeExamTimer.recompute(state, now);
    return { ...recomputed, lastHeartbeatAt: now.toISOString() };
  },

  /** Écart depuis le dernier heartbeat (secondes) selon l'horloge serveur. */
  heartbeatGapSeconds(state: ExamTimerState, now: Date): number {
    if (!state.lastHeartbeatAt) return 0;
    return Math.max(0, Math.floor((now.getTime() - new Date(state.lastHeartbeatAt).getTime()) / 1000));
  },

  /**
   * Dérive du temps client : écart entre le temps officiel écoulé (serveur) et le temps annoncé par le client.
   * Sert d'indice défensif ; ne modifie jamais l'autorité serveur.
   */
  clientDriftSeconds(state: ExamTimerState, clientElapsedSeconds: number, now: Date): number {
    const server = AuthoritativeExamTimer.recompute(state, now).elapsedOfficialSeconds;
    return Math.abs(server - clientElapsedSeconds);
  },

  /** Marque la soumission (gèle le chronomètre). */
  markSubmitted(state: ExamTimerState, now: Date): ExamTimerState {
    const recomputed = AuthoritativeExamTimer.recompute(state, now);
    return { ...recomputed, officialSubmittedAt: now.toISOString() };
  },

  /** L'examen doit-il être auto-soumis ? (expiré au-delà de la grâce, non déjà soumis) */
  shouldAutoSubmit(state: ExamTimerState, now: Date): boolean {
    if (state.officialSubmittedAt) return false;
    return AuthoritativeExamTimer.recompute(state, now).expired;
  },
};
