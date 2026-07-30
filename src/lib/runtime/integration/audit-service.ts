/**
 * Runtime — Integration : AcademicAuditService (Sprint I).
 *
 * Construit des événements d'audit immuables et REDACTÉS. Ne journalise JAMAIS : réponse correcte, clé privée,
 * secret, mot de passe, token complet, numéro de carte, données sensibles inutiles.
 */
import type { AcademicAuditEvent, AcademicAuditEventType } from "./types.ts";

const FORBIDDEN_LOG_KEYS = new Set([
  "correctAnswer", "correctOptionId", "correctOptionIds", "answer", "answers", "grading", "privateKey", "secret",
  "password", "token", "accessToken", "refreshToken", "cardNumber", "cvv", "serviceRoleKey", "email", "ssn",
]);

/** Redacte récursivement les clés sensibles (remplacées par "[redacted]"). */
export function redact(value: unknown): unknown {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(redact);
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
    if (FORBIDDEN_LOG_KEYS.has(k)) out[k] = "[redacted]";
    else if (/token|secret|password|key/i.test(k)) out[k] = "[redacted]";
    else out[k] = redact(v);
  }
  return out;
}

export interface AuditSink {
  append(event: AcademicAuditEvent): void;
}
export function createInMemoryAuditSink(): AuditSink & { all(): AcademicAuditEvent[] } {
  const events: AcademicAuditEvent[] = [];
  return { append: (e) => void events.push(e), all: () => [...events] };
}

export const AcademicAuditService = {
  event(type: AcademicAuditEventType, opts: { at: string; actorId: string | null; correlationId: string; resourceId?: string | null; reasonCodes?: string[]; metadata?: Record<string, unknown> }): AcademicAuditEvent {
    return Object.freeze({
      type,
      at: opts.at,
      actorId: opts.actorId,
      correlationId: opts.correlationId,
      resourceId: opts.resourceId ?? null,
      reasonCodes: opts.reasonCodes ?? [],
      metadata: redact(opts.metadata ?? {}) as Record<string, unknown>,
    }) as AcademicAuditEvent;
  },

  emit(sink: AuditSink, event: AcademicAuditEvent): void {
    sink.append(event);
  },

  /** Vérifie qu'aucune clé sensible ne porte une valeur NON redactée (défense en profondeur). */
  isClean(event: AcademicAuditEvent): boolean {
    const walk = (v: unknown): boolean => {
      if (v === null || typeof v !== "object") return true;
      if (Array.isArray(v)) return v.every(walk);
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
        if ((FORBIDDEN_LOG_KEYS.has(k) || /token|secret|password|key/i.test(k)) && val !== "[redacted]") return false;
        if (!walk(val)) return false;
      }
      return true;
    };
    return walk(event);
  },
};
