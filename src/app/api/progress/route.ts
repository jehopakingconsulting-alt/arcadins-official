import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { courseSlug, lessonIndex, completed } = await request.json();

  if (typeof courseSlug !== "string" || typeof lessonIndex !== "number") {
    return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
  }

  if (completed) {
    const { error } = await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      course_slug: courseSlug,
      lesson_index: lessonIndex,
    }, { onConflict: "user_id,course_slug,lesson_index" });

    if (error) {
      console.error("Progress upsert error:", error);
      return NextResponse.json({ error: "Erreur de sauvegarde" }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("lesson_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("course_slug", courseSlug)
      .eq("lesson_index", lessonIndex);

    if (error) {
      console.error("Progress delete error:", error);
      return NextResponse.json({ error: "Erreur de suppression" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
