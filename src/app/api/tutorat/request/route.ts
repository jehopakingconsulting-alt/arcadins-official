import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";

const SKILL_IDS = new Set<string>(SKILLS.map((s) => s.id));
const LEVEL_IDS = new Set<string>(LEVELS.map((l) => l.id));

// Flux ÉLÈVE — file de notifications distincte des candidatures tuteur.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email } = data;

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const skills: string[] = Array.isArray(data.skills)
      ? data.skills.filter((s: string) => SKILL_IDS.has(s))
      : [];
    const targetLevel =
      typeof data.targetLevel === "string" && LEVEL_IDS.has(data.targetLevel)
        ? data.targetLevel
        : null;

    const supabase = createAdminClient();
    const { error } = await supabase.from("tutoring_requests").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: data.phone || null,
      skills,
      target_level: targetLevel,
      current_level: data.currentLevel || null,
      goal: data.goal || null,
      availability: data.availability || null,
      message: data.message || null,
    });

    if (error) {
      // Table pas encore migrée : on répond proprement sans casser le site.
      // 42P01 = erreur Postgres brute ; PGRST205 = table absente du cache PostgREST.
      if (error.code === "42P01" || error.code === "PGRST205") {
        return NextResponse.json(
          { error: "Ce service est en cours de mise en place. Contactez-nous en attendant." },
          { status: 503 }
        );
      }
      console.error("tutoring_requests insert error:", error);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Demande de tutorat reçue" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
