import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLessonsForCourse } from "@/lib/lessons";

function generateCertificateNumber() {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ARC-${year}-${random}`;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { courseSlug } = await request.json();
  if (typeof courseSlug !== "string") {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  const lessons = getLessonsForCourse(courseSlug);
  if (lessons.length === 0) {
    return NextResponse.json({ error: "Formation introuvable" }, { status: 404 });
  }

  // Verify the user actually completed every lesson server-side — never
  // trust the client's "100%" claim.
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("lesson_index")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug);

  const completedCount = new Set((progress || []).map((p) => p.lesson_index)).size;
  if (completedCount < lessons.length) {
    return NextResponse.json({ error: "Formation non complétée" }, { status: 403 });
  }

  const { data: program } = await supabase
    .from("programs")
    .select("id")
    .eq("slug", courseSlug)
    .single();

  if (!program) {
    return NextResponse.json({ error: "Programme introuvable" }, { status: 404 });
  }

  // Already issued? Return the existing one (idempotent).
  const { data: existing } = await supabase
    .from("certificates")
    .select("id, certificate_number")
    .eq("user_id", user.id)
    .eq("program_id", program.id)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ id: existing.id, certificateNumber: existing.certificate_number });
  }

  const firstName = user.user_metadata?.first_name || "";
  const lastName = user.user_metadata?.last_name || "";
  const studentName = `${firstName} ${lastName}`.trim() || user.email || "Étudiant ARCADINS";

  const { data: created, error } = await supabase
    .from("certificates")
    .insert({
      user_id: user.id,
      program_id: program.id,
      course_slug: courseSlug,
      certificate_number: generateCertificateNumber(),
      student_name: studentName,
    })
    .select("id, certificate_number")
    .single();

  if (error || !created) {
    console.error("Certificate issuance error:", error);
    return NextResponse.json({ error: "Erreur lors de l'émission du certificat" }, { status: 500 });
  }

  return NextResponse.json({ id: created.id, certificateNumber: created.certificate_number });
}
