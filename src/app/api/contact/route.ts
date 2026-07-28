import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { enforceRateLimit } from "@/lib/rate-limit";

// Formulaire de contact public. Écriture via service role côté serveur (comme
// les autres formulaires) : `contact_requests` a la RLS activée (lecture admin
// uniquement), donc un client anonyme ne peut pas insérer. Rate-limité (anti-spam).
export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = await enforceRateLimit(`contact:${ip}`, 5, 60_000);
    if (!rl.allowed) {
      return NextResponse.json({ error: "Trop de soumissions. Réessayez plus tard." }, { status: 429 });
    }

    const data = await request.json();
    const { firstName, lastName, email, country, interest, message } = data;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("contact_requests").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      country,
      interest,
      message,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Demande reçue" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
