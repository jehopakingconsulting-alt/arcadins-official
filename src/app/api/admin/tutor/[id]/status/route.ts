import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminSession } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { validateTutorTransition } from "@/lib/tutor/status";
import { TUTOR_STATUS_EVENT } from "@/lib/notifications/events";
import { getEmailProvider } from "@/lib/notifications/provider";
import { dispatchExternalEvent } from "@/lib/notifications/dispatch";
import { alreadySentInDb, persistDispatch, recordStatusHistory } from "@/lib/notifications/persist";

// Changement de statut d'une CANDIDATURE TUTEUR (parcours tuteur).
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session.userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  if (!hasPermission(session.role, "tutor_applications.view")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  let body: { to?: string; reason?: string; reopen?: boolean };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }
  const to = body.to;
  if (!to) return NextResponse.json({ error: "Statut cible requis" }, { status: 400 });

  if (body.reopen && session.role !== "admin") {
    return NextResponse.json({ error: "Réouverture réservée à un administrateur" }, { status: 403 });
  }

  const supabase = createAdminClient();
  const { data: row, error: readErr } = await supabase
    .from("tutor_applications").select("id, status, email, first_name").eq("id", id).maybeSingle();
  if (readErr || !row) return NextResponse.json({ error: "Candidature introuvable" }, { status: 404 });

  const check = validateTutorTransition(row.status, to, { reopen: body.reopen });
  if (!check.ok) return NextResponse.json({ error: check.reason }, { status: 409 });

  const { error: updErr } = await supabase
    .from("tutor_applications").update({ status: to, updated_at: new Date().toISOString() }).eq("id", id);
  if (updErr) return NextResponse.json({ error: "Échec de la mise à jour" }, { status: 500 });

  const event = TUTOR_STATUS_EVENT[to] ?? null;
  await recordStatusHistory({
    parcours: "tutor", requestId: id, fromStatus: row.status, toStatus: to,
    event, reason: body.reason ?? null, changedBy: session.userId,
  });

  if (event) {
    const result = await dispatchExternalEvent(
      { provider: getEmailProvider(), alreadySent: alreadySentInDb },
      { event, relatedId: id, recipientEmail: row.email, firstName: row.first_name },
    );
    await persistDispatch(result);
  }

  return NextResponse.json({ success: true, id, from: row.status, to });
}
