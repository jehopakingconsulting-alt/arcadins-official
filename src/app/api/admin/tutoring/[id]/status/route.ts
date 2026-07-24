import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminSession } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { validateTutoringTransition } from "@/lib/tutoring/status";
import { TUTORING_STATUS_EVENT } from "@/lib/notifications/events";
import { getEmailProvider } from "@/lib/notifications/provider";
import { dispatchExternalEvent } from "@/lib/notifications/dispatch";
import { alreadySentInDb, persistDispatch, recordStatusHistory } from "@/lib/notifications/persist";

// Changement de statut d'une DEMANDE DE TUTORAT (parcours élève).
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session.userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  if (!hasPermission(session.role, "tutoring_requests.view")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  let body: { to?: string; reason?: string; reopen?: boolean };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }
  const to = body.to;
  if (!to) return NextResponse.json({ error: "Statut cible requis" }, { status: 400 });

  // La réouverture explicite est réservée aux administrateurs.
  if (body.reopen && session.role !== "admin") {
    return NextResponse.json({ error: "Réouverture réservée à un administrateur" }, { status: 403 });
  }

  const supabase = createAdminClient();
  const { data: row, error: readErr } = await supabase
    .from("tutoring_requests").select("id, status, email, first_name").eq("id", id).maybeSingle();
  if (readErr || !row) return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });

  const check = validateTutoringTransition(row.status, to, { reopen: body.reopen });
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 409 });

  const { error: updErr } = await supabase
    .from("tutoring_requests").update({ status: to, updated_at: new Date().toISOString() }).eq("id", id);
  if (updErr) return NextResponse.json({ error: "Échec de la mise à jour" }, { status: 500 });

  const event = TUTORING_STATUS_EVENT[to] ?? null;
  await recordStatusHistory({
    parcours: "tutoring", requestId: id, fromStatus: row.status, toStatus: to,
    event, reason: body.reason ?? null, changedBy: session.userId,
  });

  // Notifie l'élève si l'événement comporte un modèle.
  if (event) {
    const result = await dispatchExternalEvent(
      { provider: getEmailProvider(), alreadySent: alreadySentInDb },
      { event, relatedId: id, recipientEmail: row.email, firstName: row.first_name },
    );
    await persistDispatch(result);
  }

  return NextResponse.json({ success: true, id, from: row.status, to });
}
