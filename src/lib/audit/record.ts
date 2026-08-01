/**
 * Journal d'audit — construction PURE de l'enregistrement (sans I/O).
 * Testable via `node --test` (imports relatifs, aucune dépendance runtime).
 * La persistance vit dans `./index.ts` (service role, serveur uniquement).
 */

/** Actions sensibles connues (extensible). Chaîne libre acceptée pour l'évolutivité. */
export type AuditAction =
  | "admin.login"
  | "role.change"
  | "moderation.decision"
  | "payment.refund"
  | "enrollment.grant"
  | "enrollment.revoke"
  | "certificate.issue"
  | "certificate.revoke"
  | "data.export"
  | (string & {});

export interface AuditActor {
  id?: string | null;
  email?: string | null;
  role?: string | null;
}

export interface AuditContext {
  ip?: string | null;
  userAgent?: string | null;
}

export interface AuditRecordInput {
  action: AuditAction;
  actor?: AuditActor;
  targetType?: string | null;
  targetId?: string | null;
  metadata?: Record<string, unknown>;
  context?: AuditContext;
}

/** Ligne prête pour `insert` dans `public.audit_log` (clés = colonnes SQL). */
export interface AuditRecord {
  action: string;
  actor_id: string | null;
  actor_email: string | null;
  actor_role: string | null;
  target_type: string | null;
  target_id: string | null;
  ip: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown>;
}

function nullify(v: string | null | undefined): string | null {
  if (v === undefined || v === null) return null;
  const trimmed = v.trim();
  return trimmed === "" ? null : trimmed;
}

/**
 * Normalise une entrée d'audit en ligne SQL. Déterministe, sans I/O.
 * Lève si `action` est vide (un événement d'audit sans action est invalide).
 */
export function buildAuditRecord(input: AuditRecordInput): AuditRecord {
  const action = nullify(input.action as string);
  if (!action) throw new Error("audit: `action` requis (non vide)");
  return {
    action,
    actor_id: nullify(input.actor?.id),
    actor_email: nullify(input.actor?.email)?.toLowerCase() ?? null,
    actor_role: nullify(input.actor?.role),
    target_type: nullify(input.targetType),
    target_id: nullify(input.targetId),
    ip: nullify(input.context?.ip),
    user_agent: nullify(input.context?.userAgent),
    metadata: input.metadata ?? {},
  };
}
