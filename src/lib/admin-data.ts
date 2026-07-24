import "server-only";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { permissionsForRole, type Permission } from "@/lib/rbac";

/** Codes signalant une table non encore migrée : on renvoie alors une liste vide. */
const MISSING_TABLE_CODES = new Set(["42P01", "PGRST205"]);

export interface AdminSession {
  userId: string | null;
  email: string | null;
  role: string | null;
  permissions: Permission[];
}

/** Récupère l'utilisateur courant et son rôle (via sa propre session). */
export async function getAdminSession(): Promise<AdminSession> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { userId: null, email: null, role: null, permissions: [] };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = (profile?.role as string | undefined) ?? null;
  return { userId: user.id, email: user.email ?? null, role, permissions: permissionsForRole(role) };
}

/**
 * Lit une table d'administration via le service role (contourne la RLS).
 * Renvoie [] proprement si la table n'existe pas encore (migration non appliquée).
 */
export async function readTable<T = Record<string, unknown>>(
  table: string,
  columns: string,
  limit = 200,
): Promise<{ rows: T[]; missing: boolean }> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    if (MISSING_TABLE_CODES.has(error.code)) return { rows: [], missing: true };
    console.error(`readTable(${table}) error:`, error);
    return { rows: [], missing: false };
  }
  return { rows: (data as T[]) ?? [], missing: false };
}
