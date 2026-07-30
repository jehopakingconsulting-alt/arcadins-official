/**
 * Runtime — Learning Journey Engine : événements immuables (Sprint E).
 *
 * Fabriques pures. Ces événements seront consommables plus tard par la Persistence / Analytics / Notifications,
 * SANS créer ces intégrations ici.
 */
import type { JourneyEvent, JourneyEventType } from "./types.ts";

function make(type: JourneyEventType, at: string, payload: Record<string, unknown> = {}): JourneyEvent {
  return Object.freeze({ type, at, payload: Object.freeze({ ...payload }) }) as JourneyEvent;
}

export const JourneyEvents = {
  generated: (at: string, payload: Record<string, unknown> = {}) => make("journey.generated", at, payload),
  recommendationCreated: (at: string, id: string, type: string) => make("recommendation.created", at, { id, type }),
  recommendationAccepted: (at: string, id: string) => make("recommendation.accepted", at, { id }),
  recommendationDismissed: (at: string, id: string) => make("recommendation.dismissed", at, { id }),
  prerequisiteFailed: (at: string, targetId: string, missing: unknown) => make("prerequisite.failed", at, { targetId, missing }),
  contentUnlocked: (at: string, targetType: string, targetId: string) => make("content.unlocked", at, { targetType, targetId }),
  masteryUpdated: (at: string, skills: number) => make("mastery.updated", at, { skills }),
  remediationStarted: (at: string, targetId: string, attempt: number) => make("remediation.started", at, { targetId, attempt }),
  remediationCompleted: (at: string, targetId: string) => make("remediation.completed", at, { targetId }),
  reviewScheduled: (at: string, id: string, dueAt: string) => make("review.scheduled", at, { id, dueAt }),
  reviewCompleted: (at: string, id: string) => make("review.completed", at, { id }),
  goalUpdated: (at: string, goalId: string, status: string) => make("goal.updated", at, { goalId, status }),
  planGenerated: (at: string, totalMinutes: number) => make("plan.generated", at, { totalMinutes }),
};
