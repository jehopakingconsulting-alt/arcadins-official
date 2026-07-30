/**
 * Runtime — Persistence : RuntimeSerializer + LearningSnapshot (Sprint B).
 *
 * Sérialisation/désérialisation PURE et versionnée, avec somme de contrôle déterministe (intégrité).
 */
import type { RuntimeState } from "../types.ts";
import type { Awards, LearningSnapshot } from "./types.ts";
import { SNAPSHOT_SCHEMA_VERSION } from "./types.ts";

/** Somme de contrôle déterministe (djb2) sur une chaîne — pour détecter une corruption. */
export function checksum(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) h = ((h << 5) + h + input.charCodeAt(i)) >>> 0;
  return h.toString(16);
}

function emptyAwards(): Awards {
  return { badges: [], certificates: [] };
}

export const RuntimeSerializer = {
  /** Construit un instantané à partir d'un état (révision +1). */
  createSnapshot(params: {
    userId: string;
    state: RuntimeState;
    awards?: Awards;
    revision?: number;
    updatedAt?: string;
  }): LearningSnapshot {
    const awards = params.awards ?? emptyAwards();
    const revision = (params.revision ?? 0) + 1;
    const updatedAt = params.updatedAt ?? new Date().toISOString();
    const body = { state: params.state, awards };
    return {
      schemaVersion: SNAPSHOT_SCHEMA_VERSION,
      userId: params.userId,
      programSlug: params.state.programSlug,
      programVersion: params.state.programVersion,
      revision,
      updatedAt,
      state: params.state,
      awards,
      checksum: checksum(stableStringify(body)),
    };
  },

  /** Recalcule et vérifie la somme de contrôle d'un instantané. */
  verify(snapshot: LearningSnapshot): boolean {
    const expected = checksum(stableStringify({ state: snapshot.state, awards: snapshot.awards }));
    return expected === snapshot.checksum;
  },

  /** Sérialise en JSON. */
  toJSON(snapshot: LearningSnapshot): string {
    return JSON.stringify(snapshot);
  },

  /** Désérialise depuis JSON. Renvoie null si illisible ou version incompatible. */
  fromJSON(json: string): LearningSnapshot | null {
    try {
      const obj = JSON.parse(json) as LearningSnapshot;
      if (!obj || typeof obj !== "object") return null;
      if (obj.schemaVersion !== SNAPSHOT_SCHEMA_VERSION) return null;
      return obj;
    } catch {
      return null;
    }
  },
};

/** JSON stable (clés triées) pour une somme de contrôle reproductible. */
export function stableStringify(value: unknown): string {
  return JSON.stringify(sortKeys(value));
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(value as Record<string, unknown>).sort()) {
      out[k] = sortKeys((value as Record<string, unknown>)[k]);
    }
    return out;
  }
  return value;
}
