import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminSession } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";

// Modération d'un avis étudiant (approuver / rejeter). Réservé aux rôles
// disposant de `content.manage` (admin, content_manager).
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getAdminSession();
  if (!session.userId) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  if (!hasPermission(session.role, "content.manage")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 403 });
  }

  let body: { status?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }
  if (body.status !== "approved" && body.status !== "rejected") {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("program_reviews").update({ status: body.status }).eq("id", id);
  if (error) return NextResponse.json({ error: "Mise à jour impossible" }, { status: 500 });

  return NextResponse.json({ ok: true, status: body.status });
}
