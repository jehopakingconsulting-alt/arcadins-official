import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAMS } from "@/lib/data/programs";
import { enforceRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// ── GET /api/reviews?slug=... — avis APPROUVÉS + moyenne (public) ────────────
export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug requis" }, { status: 400 });

  const supabase = await createClient(); // client RLS : ne renvoie que status='approved'
  const { data, error } = await supabase
    .from("program_reviews")
    .select("rating, comment, created_at")
    .eq("program_slug", slug)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    // Table absente (migration non appliquée) → réponse vide propre.
    return NextResponse.json({ average: 0, count: 0, reviews: [] });
  }
  const reviews = data ?? [];
  const count = reviews.length;
  const average = count ? Math.round((reviews.reduce((s, r) => s + (r.rating as number), 0) / count) * 10) / 10 : 0;
  return NextResponse.json({ average, count, reviews });
}

const BodySchema = z.object({
  slug: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(1000).optional().default(""),
});

// ── POST /api/reviews — laisser un avis (auth + inscription requises) ────────
export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  // Anti-spam : plafonne les soumissions d'avis par utilisateur (comme /api/contact).
  const rl = await enforceRateLimit(`review:${user.id}`, 5, 60_000);
  if (!rl.allowed) return NextResponse.json({ error: "Trop de soumissions. Réessayez plus tard." }, { status: 429 });

  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 422 });
  const { slug, rating, comment } = parsed.data;

  // Le slug doit correspondre à une formation ACTIVE réelle.
  const program = PROGRAMS.find((p) => p.slug === slug && !p.comingSoon);
  if (!program) return NextResponse.json({ error: "Formation inconnue" }, { status: 404 });

  const admin = createAdminClient();

  // Vérifier l'INSCRIPTION réelle de l'utilisateur à cette formation.
  const { data: prog } = await admin.from("programs").select("id").eq("slug", slug).maybeSingle();
  if (!prog) return NextResponse.json({ error: "Inscription requise pour laisser un avis" }, { status: 403 });
  const { data: enrollment } = await admin
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("program_id", prog.id)
    .neq("status", "cancelled")
    .limit(1)
    .maybeSingle();
  if (!enrollment) return NextResponse.json({ error: "Inscription requise pour laisser un avis" }, { status: 403 });

  // Upsert : un avis par (user, formation), remis en modération à chaque édition.
  const { error } = await admin.from("program_reviews").upsert(
    { user_id: user.id, program_slug: slug, rating, comment: comment || null, status: "pending" },
    { onConflict: "user_id,program_slug" },
  );
  if (error) return NextResponse.json({ error: "Enregistrement impossible" }, { status: 500 });

  return NextResponse.json({ ok: true, status: "pending" });
}
