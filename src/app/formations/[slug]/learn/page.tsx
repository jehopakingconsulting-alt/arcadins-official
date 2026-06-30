import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PROGRAMS } from "@/lib/constants";
import { getLessonsForCourse } from "@/lib/lessons";
import LearnViewer from "@/components/learn/LearnViewer";

export default async function LearnPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = PROGRAMS.find((p) => p.slug === slug);

  if (!course || course.comingSoon) {
    redirect(`/formations/${slug}`);
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?redirect=/formations/${slug}/learn`);
  }

  const { data: program } = await supabase
    .from("programs")
    .select("id")
    .eq("slug", slug)
    .single();

  let enrolled = false;
  if (program) {
    const { data: enrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", user.id)
      .eq("program_id", program.id)
      .eq("status", "active")
      .maybeSingle();
    enrolled = !!enrollment;
  }

  if (!enrolled) {
    redirect(`/formations/${slug}?notice=not_enrolled`);
  }

  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("lesson_index")
    .eq("user_id", user.id)
    .eq("course_slug", slug);

  const completedIndexes = (progress || []).map((p) => p.lesson_index);
  const lessons = getLessonsForCourse(slug);

  return (
    <LearnViewer
      courseSlug={slug}
      courseName={course.name}
      courseIcon={course.icon}
      lessons={lessons}
      completedIndexes={completedIndexes}
    />
  );
}
