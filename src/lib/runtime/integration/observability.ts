/**
 * Runtime — Integration : observabilité (Sprint I).
 *
 * Contrats INJECTABLES (logger, métriques, tracer, health). Implémentations no-op sûres par défaut. Aucun
 * service externe branché. Le logger redacte les métadonnées sensibles via l'audit-service.
 */
import { redact } from "./audit-service.ts";

export type LogLevel = "debug" | "info" | "warn" | "error";
export interface AcademicLogger {
  log(level: LogLevel, message: string, meta?: Record<string, unknown>): void;
}
export interface AcademicMetrics {
  increment(name: AcademicMetricName, value?: number, tags?: Record<string, string>): void;
  observe(name: AcademicMetricName, value: number, tags?: Record<string, string>): void;
}
export interface AcademicTracer {
  startSpan(name: string): { end(): void };
}
export interface AcademicHealthReporter {
  report(component: string, healthy: boolean, detail?: string): void;
}

export type AcademicMetricName =
  | "request.count"
  | "authorization.denied"
  | "lesson.completion"
  | "assessment.attempts"
  | "exam.attempts"
  | "submission.latency"
  | "persistence.failures"
  | "concurrency.conflicts"
  | "idempotency.replays"
  | "credential.issuance"
  | "verification.requests"
  | "feature.disabled_requests";

export interface Observability {
  logger: AcademicLogger;
  metrics: AcademicMetrics;
  tracer: AcademicTracer;
  health: AcademicHealthReporter;
}

/** Observabilité no-op (aucun effet de bord, aucun réseau). */
export function createNoopObservability(): Observability {
  return {
    logger: { log: () => {} },
    metrics: { increment: () => {}, observe: () => {} },
    tracer: { startSpan: () => ({ end: () => {} }) },
    health: { report: () => {} },
  };
}

/** Logger de collecte en mémoire (tests) — redacte les métadonnées. */
export function createInMemoryLogger(): AcademicLogger & { entries: { level: LogLevel; message: string; meta: unknown }[] } {
  const entries: { level: LogLevel; message: string; meta: unknown }[] = [];
  return {
    entries,
    log(level, message, meta) {
      entries.push({ level, message, meta: redact(meta ?? {}) });
    },
  };
}
