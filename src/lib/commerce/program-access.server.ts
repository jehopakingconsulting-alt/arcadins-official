/**
 * ARCADINS — Garde d'accès aux programmes, CÔTÉ SERVEUR (autorité). Lit
 * program_enrollments (RLS self-read) et applique la décision pure decideProgramAccess.
 * À utiliser dans les routes/pages d'apprentissage protégées TEF/TCF. Jamais côté client seul.
 */
import "server-only";
import { createClient } from "@/lib/supabase/server";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { decideProgramAccess, type AccessDecision } from "./access";

export interface ProgramAccessResult {
  decision: AccessDecision;
  userId: string | null;
}

/**
 * Résout l'accès d'un utilisateur à un programme officiel. Si le flag est OFF, la
 * table n'est pas garantie présente → renvoie "locked" (aucun accès self-service).
 */
export async function getProgramAccessForUser(program: string): Promise<ProgramAccessResult> {
  if (!PROGRAM_CHECKOUT_ENABLED) return { decision: "locked", userId: null };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { decision: "locked", userId: null };

  const { data: enr } = await supabase
    .from("program_enrollments")
    .select("program_code, status, access_expires_at")
    .eq("user_id", user.id)
    .eq("program_code", program)
    .maybeSingle();

  const decision = decideProgramAccess({ requestedProgram: program, enrollment: enr ?? null, now: new Date() });
  return { decision, userId: user.id };
}
