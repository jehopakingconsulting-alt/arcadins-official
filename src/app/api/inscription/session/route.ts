import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { parseEnrollmentForm, forfaitsPath } from "@/lib/commerce/enrollment-session";

/**
 * Crée une SESSION D'INSCRIPTION reprise à partir du formulaire (/inscription).
 * Les données personnelles sont stockées CÔTÉ SERVEUR (enrollment_sessions), jamais
 * dans l'URL : seule la référence opaque circule. Ne crée AUCUN accès payant.
 * Gardé par PROGRAM_CHECKOUT_ENABLED (route inactive tant que le flag est OFF).
 */
export async function POST(request: Request) {
  if (!PROGRAM_CHECKOUT_ENABLED) {
    return NextResponse.json({ error: "enrollment_disabled" }, { status: 404 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = parseEnrollmentForm(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: "validation", fields: parsed.errors }, { status: 422 });
  }
  const form = parsed.data;

  // Lie la session à l'utilisateur si déjà authentifié (sinon rattachée après login).
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("enrollment_sessions")
    .insert({
      user_id: user?.id ?? null,
      program_code: form.program,
      package_choice: form.packageChoice,
      profile: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        objective: form.objective,
        frenchLevel: form.frenchLevel,
        newsletter: form.newsletter,
      },
      status: "started",
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("enrollment session insert failed:", error);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }

  return NextResponse.json({
    sessionRef: data.id,
    next: `${forfaitsPath(data.id)}&program=${encodeURIComponent(form.program)}`,
  });
}
