import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { DispatchResult, NotificationRecord } from "./dispatch.ts";
import type { Parcours } from "./events.ts";

const MISSING = new Set(["42P01", "PGRST205"]);

/** Un envoi (dedup_key) a-t-il déjà été effectué avec succès ? */
export async function alreadySentInDb(dedupKey: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("notification_delivery_logs")
    .select("id")
    .eq("dedup_key", dedupKey)
    .in("status", ["sent", "skipped"])
    .maybeSingle();
  if (error) return false; // table absente ou aucune ligne → on n'a pas encore envoyé
  return !!data;
}

/** Persiste la notification interne + le journal de livraison d'un dispatch. */
export async function persistDispatch(result: DispatchResult): Promise<void> {
  const supabase = createAdminClient();
  try {
    if (result.recipientNotification) {
      await supabase.from("notifications").insert(toNotifRow(result.recipientNotification));
    }
    await supabase.from("notification_delivery_logs").insert({
      notification_id: null,
      parcours: result.deliveryLog.parcours,
      event: result.deliveryLog.event,
      channel: result.deliveryLog.channel,
      provider: result.deliveryLog.provider,
      to_email: result.deliveryLog.to_email,
      template_key: result.deliveryLog.template_key,
      lang: result.deliveryLog.lang,
      status: result.deliveryLog.status,
      attempts: result.deliveryLog.attempts,
      error: result.deliveryLog.error,
      dedup_key: result.deliveryLog.dedup_key,
    });
  } catch (e) {
    logSoft("persistDispatch", e);
  }
}

/** Notification interne destinée aux administrateurs. */
export async function persistAdminNotification(rec: NotificationRecord): Promise<void> {
  const supabase = createAdminClient();
  try {
    await supabase.from("notifications").insert(toNotifRow(rec));
  } catch (e) {
    logSoft("persistAdminNotification", e);
  }
}

/** Entrée d'historique de changement de statut. */
export async function recordStatusHistory(input: {
  parcours: Parcours;
  requestId: string;
  fromStatus: string | null;
  toStatus: string;
  event: string | null;
  reason?: string | null;
  changedBy?: string | null;
}): Promise<void> {
  const supabase = createAdminClient();
  try {
    await supabase.from("application_status_history").insert({
      parcours: input.parcours,
      tutoring_request_id: input.parcours === "tutoring" ? input.requestId : null,
      tutor_application_id: input.parcours === "tutor" ? input.requestId : null,
      from_status: input.fromStatus,
      to_status: input.toStatus,
      event: input.event,
      reason: input.reason ?? null,
      changed_by: input.changedBy ?? null,
    });
  } catch (e) {
    logSoft("recordStatusHistory", e);
  }
}

function toNotifRow(rec: NotificationRecord) {
  return {
    audience: rec.audience,
    recipient_id: rec.recipient_id,
    parcours: rec.parcours,
    event: rec.event,
    title: rec.title,
    body: rec.body,
    related_id: rec.related_id,
  };
}

function logSoft(where: string, e: unknown) {
  const code = (e as { code?: string })?.code;
  if (code && MISSING.has(code)) return; // table pas encore migrée : silencieux
  console.error(`${where} error:`, e);
}
