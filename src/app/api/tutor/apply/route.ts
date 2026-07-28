import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { tutorApplicationSchema } from "@/lib/validation/tutor";
import { enforceRateLimit } from "@/lib/rate-limit";
import { getEmailProvider } from "@/lib/notifications/provider";
import { dispatchExternalEvent, buildAdminNotification } from "@/lib/notifications/dispatch";
import { alreadySentInDb, persistDispatch, persistAdminNotification, recordStatusHistory } from "@/lib/notifications/persist";
import { TUTOR_INITIAL_STATUS } from "@/lib/tutor/status";

const MISSING = new Set(["42P01", "PGRST205"]);

// Flux CANDIDATURE TUTEUR — strictement séparé du flux élève.
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = await enforceRateLimit(`tutor:${ip}`, 5, 60_000);
  if (!rl.allowed) {
    return NextResponse.json({ error: "Trop de soumissions. Réessayez plus tard." }, { status: 429 });
  }

  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "Requête invalide" }, { status: 400 }); }

  const parsed = tutorApplicationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Champs invalides", details: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const d = parsed.data;

  const supabase = createAdminClient();
  const { data: inserted, error } = await supabase
    .from("tutor_applications")
    .insert({
      first_name: d.firstName, last_name: d.lastName, email: d.email, phone: d.phone || null,
      skills: d.skills, levels: d.levels ?? [], experience: d.experience || null,
      qualifications: d.qualifications || null, motivation: d.motivation || null,
      status: TUTOR_INITIAL_STATUS,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    if (error && MISSING.has(error.code)) {
      return NextResponse.json({ error: "Les candidatures ouvriront très bientôt. Contactez-nous en attendant." }, { status: 503 });
    }
    console.error("tutor_applications insert error:", error);
    return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
  }

  await recordStatusHistory({
    parcours: "tutor", requestId: inserted.id, fromStatus: null,
    toStatus: TUTOR_INITIAL_STATUS, event: "tutor_application_submitted",
  });

  const provider = getEmailProvider();
  const result = await dispatchExternalEvent(
    { provider, alreadySent: alreadySentInDb },
    { event: "tutor_application_submitted", relatedId: inserted.id, recipientEmail: d.email, firstName: d.firstName, lang: d.lang },
  );
  await persistDispatch(result);
  await persistAdminNotification(buildAdminNotification({ event: "tutor_application_submitted", relatedId: inserted.id }));

  return NextResponse.json({ success: true, id: inserted.id, message: "Candidature reçue" });
}
