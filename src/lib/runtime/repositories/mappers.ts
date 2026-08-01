/**
 * Runtime — Repositories : mappers DB ↔ domaine + normalisation d'erreurs (Sprint I).
 *
 * Helpers PURS de conversion (snake_case DB ↔ camelCase domaine) et de normalisation d'erreurs de persistance.
 * Aucune logique métier. Utilisés par les implémentations Supabase (et réutilisables ailleurs).
 */
import { AcademicConflictError, AcademicNotFoundError, AcademicPersistenceError } from "../integration/errors.ts";
import type { VersionedEntity } from "../integration/types.ts";
import type { AcademicDbClient } from "./supabase-client-factory.ts";

/** snake_case → camelCase (récursif, superficiel sur les objets). */
export function rowToDomain<T = Record<string, unknown>>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) out[snakeToCamel(k)] = v;
  return out as T;
}
/** camelCase → snake_case. */
export function domainToRow(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[camelToSnake(k)] = v;
  return out;
}

function snakeToCamel(s: string): string {
  return s.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}
function camelToSnake(s: string): string {
  return s.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

/** Prochaine version optimiste (création = 1). */
export function nextVersion(current: VersionedEntity | null): number {
  return (current?.version ?? 0) + 1;
}

// ─────────────────────────── Builders génériques Supabase ───────────────────────────
/** Repository en lecture seule sur une table (mapping snake→camel automatique). */
export function makeReadRepo<T>(db: AcademicDbClient, table: string) {
  return {
    async get(id: string): Promise<T | null> {
      const rows = await db.select(table, { id });
      return rows[0] ? (rowToDomain<T>(rows[0])) : null;
    },
    async where(match: Record<string, string | number | boolean | null>): Promise<T[]> {
      const rows = await db.select(table, match);
      return rows.map((r) => rowToDomain<T>(r));
    },
  };
}

/** Repository versionné (optimistic concurrency) sur une table. */
export function makeVersionedRepo<T extends { id: string } & VersionedEntity>(db: AcademicDbClient, table: string) {
  const read = makeReadRepo<T>(db, table);
  return {
    ...read,
    async save(row: T, expectedVersion: number | null): Promise<T> {
      const saved = await db.upsert(table, domainToRow(row as unknown as Record<string, unknown>), expectedVersion);
      return rowToDomain<T>(saved);
    },
    async remove(match: Record<string, string | number | boolean | null>): Promise<void> {
      await db.delete(table, match);
    },
  };
}

/** Normalise une erreur Supabase/PostgREST en erreur académique typée (sans divulguer les détails). */
export function normalizePersistenceError(err: { code?: string; message?: string } | null, correlationId: string): AcademicPersistenceError | AcademicConflictError | AcademicNotFoundError {
  const code = err?.code ?? "";
  if (code === "23505" || code === "40001") return new AcademicConflictError({ correlationId, reasonCodes: ["DB_CONFLICT"], cause: err });
  if (code === "PGRST116") return new AcademicNotFoundError({ correlationId, cause: err });
  return new AcademicPersistenceError({ correlationId, cause: err });
}
