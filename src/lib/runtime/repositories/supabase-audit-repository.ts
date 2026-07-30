/**
 * Runtime — Repositories : audit & idempotence Supabase (Sprint I). Aucune logique métier.
 * L'audit ne journalise jamais de donnée sensible (redaction en amont dans AcademicAuditService).
 */
import type { AcademicDbClient } from "./supabase-client-factory.ts";
import { rowToDomain } from "./mappers.ts";
import type { AuditRepository, CommandIdempotencyRepository } from "./contracts.ts";
import type { AcademicAuditEvent, IdempotencyRecord } from "../integration/types.ts";

export function createSupabaseAuditRepository(db: AcademicDbClient): AuditRepository {
  return {
    append: async (event) => void (await db.insert("academic_audit_events", { ...event, reason_codes: event.reasonCodes, metadata: event.metadata })),
    all: async () => (await db.select("academic_audit_events", {})).map((r) => rowToDomain<AcademicAuditEvent>(r)),
  };
}

/**
 * Idempotence Supabase. NB : l'interface `CommandIdempotencyRepository` est synchrone (utilisée dans des
 * services purs) ; cette implémentation maintient un cache synchrone alimenté par `hydrate`, et écrit en base
 * de façon best-effort. En production, la garantie d'unicité repose sur une contrainte DB (idempotency_key unique).
 */
export function createSupabaseIdempotencyRepository(db: AcademicDbClient): CommandIdempotencyRepository & { hydrate(key: string): Promise<void> } {
  const byKey = new Map<string, IdempotencyRecord>();
  const byId = new Map<string, IdempotencyRecord>();
  return {
    async hydrate(key: string) {
      const rows = await db.select("academic_commands", { idempotency_key: key });
      if (rows[0]) {
        const rec = rows[0] as unknown as IdempotencyRecord;
        byKey.set(rec.idempotencyKey, rec);
        byId.set(rec.commandId, rec);
      }
    },
    getByKey: (key) => byKey.get(key),
    getById: (id) => byId.get(id),
    upsert: (record) => {
      byKey.set(record.idempotencyKey, record);
      byId.set(record.commandId, record);
      void db.upsert("academic_commands", { ...record }, null).catch(() => {});
    },
  };
}
