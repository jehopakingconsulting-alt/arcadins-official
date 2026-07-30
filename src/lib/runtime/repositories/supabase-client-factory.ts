/**
 * Runtime — Repositories : SupabaseAcademicClientFactory (Sprint I).
 *
 * Fabrique SERVEUR injectable. Les repositories ne dépendent que d'un `AcademicDbClient` abstrait, jamais du SDK
 * Supabase directement — la frontière est ici. Variantes : server, service-role (chemins autorisés uniquement),
 * transaction context abstrait, test, no-op, mock.
 *
 * INTERDICTIONS (garanties structurelles) : aucune clé service-role dans le navigateur, aucun import du client
 * admin dans un composant client, aucun secret dans NEXT_PUBLIC_*, aucun singleton global dangereux.
 */

export interface DbMatch {
  [column: string]: string | number | boolean | null;
}

/** Interface minimale de base de données consommée par les repositories (agnostique du SDK). */
export interface AcademicDbClient {
  select(table: string, match: DbMatch): Promise<Record<string, unknown>[]>;
  insert(table: string, row: Record<string, unknown>): Promise<Record<string, unknown>>;
  /** Upsert avec contrôle optimiste optionnel via colonne `version`. */
  upsert(table: string, row: Record<string, unknown>, expectedVersion: number | null): Promise<Record<string, unknown>>;
  delete(table: string, match: DbMatch): Promise<void>;
}

/** Client no-op : refuse toute opération (utilisé quand la persistance est désactivée). */
export function createNoopDbClient(): AcademicDbClient {
  const refuse = (): never => {
    throw new Error("ACADEMIC_PERSISTENCE_DISABLED");
  };
  return { select: refuse, insert: refuse, upsert: refuse, delete: refuse };
}

/** Client MOCK en mémoire (tests) : magasin de tables ; applique le contrôle optimiste de version. */
export function createMockDbClient(seed: Record<string, Record<string, unknown>[]> = {}): AcademicDbClient & { dump(table: string): Record<string, unknown>[] } {
  const tables = new Map<string, Record<string, unknown>[]>();
  for (const [t, rows] of Object.entries(seed)) tables.set(t, rows.map((r) => ({ ...r })));
  const get = (t: string) => tables.get(t) ?? (tables.set(t, []), tables.get(t)!);
  const matches = (row: Record<string, unknown>, m: DbMatch) => Object.entries(m).every(([k, v]) => row[k] === v);

  return {
    dump: (table) => (tables.get(table) ?? []).map((r) => ({ ...r })),
    async select(table, match) {
      return get(table).filter((r) => matches(r, match)).map((r) => ({ ...r }));
    },
    async insert(table, row) {
      get(table).push({ ...row });
      return { ...row };
    },
    async upsert(table, row, expectedVersion) {
      const rows = get(table);
      const id = row.id as string;
      const idx = rows.findIndex((r) => r.id === id);
      if (idx < 0) {
        if (expectedVersion !== null) throw new Error("VERSION_MISMATCH");
        const created = { ...row, version: 1 };
        rows.push(created);
        return { ...created };
      }
      if (expectedVersion !== null && rows[idx].version !== expectedVersion) throw new Error("VERSION_MISMATCH");
      const updated = { ...row, version: ((rows[idx].version as number) ?? 0) + 1 };
      rows[idx] = updated;
      return { ...updated };
    },
    async delete(table, match) {
      const rows = get(table);
      for (let i = rows.length - 1; i >= 0; i--) if (matches(rows[i], match)) rows.splice(i, 1);
    },
  };
}

/** Interface minimale du SDK Supabase (sous-ensemble utilisé), pour éviter un import direct au niveau module. */
export interface SupabaseLike {
  from(table: string): {
    select: (columns?: string) => { match: (m: DbMatch) => Promise<{ data: Record<string, unknown>[] | null; error: unknown }> };
    insert: (row: Record<string, unknown>) => { select: () => Promise<{ data: Record<string, unknown>[] | null; error: unknown }> };
    upsert: (row: Record<string, unknown>) => { select: () => Promise<{ data: Record<string, unknown>[] | null; error: unknown }> };
    delete: () => { match: (m: DbMatch) => Promise<{ error: unknown }> };
  };
}

/**
 * Adapte un client Supabase-like en `AcademicDbClient`. Le client concret est INJECTÉ (jamais importé ici),
 * ce qui empêche tout couplage module-level et toute fuite de clé service-role.
 */
export function fromSupabaseClient(client: SupabaseLike): AcademicDbClient {
  const unwrap = <T>(res: { data: T | null; error: unknown }): T => {
    if (res.error) throw res.error;
    return (res.data ?? ([] as unknown as T));
  };
  return {
    async select(table, match) {
      return unwrap(await client.from(table).select("*").match(match));
    },
    async insert(table, row) {
      return unwrap(await client.from(table).insert(row).select())[0] ?? row;
    },
    async upsert(table, row) {
      return unwrap(await client.from(table).upsert(row).select())[0] ?? row;
    },
    async delete(table, match) {
      const res = await client.from(table).delete().match(match);
      if (res.error) throw res.error;
    },
  };
}

export type AcademicClientKind = "server" | "service_role" | "test" | "noop" | "mock";
