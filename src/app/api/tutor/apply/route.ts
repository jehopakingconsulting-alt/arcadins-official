import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SKILLS, LEVELS } from "@/lib/data/tutorat";

const SKILL_IDS = new Set<string>(SKILLS.map((s) => s.id));
const LEVEL_IDS = new Set<string>(LEVELS.map((l) => l.id));

// Flux CANDIDATURE TUTEUR — file de notifications distincte du flux élève.
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
    const levels: string[] = Array.isArray(data.levels)
      ? data.levels.filter((l: string) => LEVEL_IDS.has(l))
      : [];

    const supabase = createAdminClient();
    const { error } = await supabase.from("tutor_applications").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: data.phone || null,
      skills,
      levels,
      experience: data.experience || null,
      qualifications: data.qualifications || null,
      motivation: data.motivation || null,
    });

    if (error) {
      // 42P01 = erreur Postgres brute ; PGRST205 = table absente du cache PostgREST.
      if (error.code === "42P01" || error.code === "PGRST205") {
        return NextResponse.json(
          { error: "Les candidatures ouvriront très bientôt. Contactez-nous en attendant." },
          { status: 503 }
        );
      }
      console.error("tutor_applications insert error:", error);
      return NextResponse.json({ error: "Erreur base de données" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Candidature reçue" });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
