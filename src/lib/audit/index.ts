// SERVEUR UNIQUEMENT : ce module utilise le service role (admin). Ne jamais l'importer
// depuis un composant client. (Pas d'import `server-only` : le paquet n'est pas installé ;
// l'usage du service role garantit déjà un chemin serveur.)
import { createAdminClient } from "../supabase/admin";
import { buildAuditRecord, type AuditRecordInput } from "./record";

export { buildAuditRecord } from "./record";
export type { AuditAction, AuditActor, AuditContext, AuditRecord, AuditRecordInput } from "./record";

/**
 * Enregistre un événement d'audit sensible dans `public.audit_log` (service role).
 * SERVEUR UNIQUEMENT (`server-only`). Best-effort : ne lève jamais dans le chemin
 * appelant — un échec d'audit ne doit pas casser l'action métier, mais il est
 * journalisé côté serveur pour investigation.
 */
export async function recordAuditEvent(input: AuditRecordInput): Promise<void> {
  try {
    const record = buildAuditRecord(input);
    const admin = createAdminClient();
    const { error } = await admin.from("audit_log").insert(record);
    if (error) console.error("[audit] échec insertion:", error.message);
  } catch (e) {
    console.error("[audit] exception:", e instanceof Error ? e.message : String(e));
  }
}
