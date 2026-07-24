import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { tutoringRequestSchema } from "@/lib/validation/tutoring";
import { rateLimit } from "@/lib/rate-limit";
import { getEmailProvider } from "@/lib/notifications/provider";
import { dispatchExternalEvent, buildAdminNotification } from "@/lib/notifications/dispatch";
import { alreadySentInDb, persistDispatch, persistAdminNotification, recordStatusHistory } from "@/lib/notifications/persist";
import { TUTORING_INITIAL_STATUS } from "@/lib/tutoring/status";

const MISSING = new Set(["42P01", "PGRST205"]);

// Flux ÉLÈVE — strictement séparé du flux tuteur.
export async function POST(request: Request) {
  // Anti-spam / anti-soumissions multiples.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = rateLimit(`tutoring:${ip}`, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Trop de soumissions. Réessayez plus tard." }, { status: 429 });
  }

  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }

  const parsed = tutoringRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides", details: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const d = parsed.data;

  const supabase = createAdminClient();
  const { data: inserted, error } = await supabase
    .from("tutoring_requests")
    .insert({
      first_name: d.firstName, last_name: d.lastName, email: d.email, phone: d.phone || null,
      skills: d.skills, target_level: d.targetLevel ?? null, current_level: d.currentLevel || null,
      goal: d.goal || null, availability: d.availability || null, message: d.message || null,
      status: TUTORING_INITIAL_STATUS,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    if (error && MISSING.has(error.code)) {
      return NextResponse.json({ error: "Ce service est en cours de mise en place. Contactez-nous en attendant." }, { status: 503 });
    }
    console.error("tutoring_requests insert error:", error);
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
  }

  // Historique initial + notifications (élève + admin).
  await recordStatusHistory({
    parcours: "tutoring", requestId: inserted.id, fromStatus: null,
    toStatus: TUTORING_INITIAL_STATUS, event: "tutoring_request_submitted",
  });

  const provider = getEmailProvider();
  const result = await dispatchExternalEvent(
    { provider, alreadySent: alreadySentInDb },
    { event: "tutoring_request_submitted", relatedId: inserted.id, recipientEmail: d.email, firstName: d.firstName, lang: d.lang },
  );
  await persistDispatch(result);
  await persistAdminNotification(buildAdminNotification({ event: "tutoring_request_submitted", relatedId: inserted.id }));

  return NextResponse.json({ success: true, id: inserted.id, message: "Demande de tutorat reçue" });
}
