import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// Runs daily via Vercel Cron. Cancels any "pending_payment" enrollment
// whose 30-day deadline has passed. The $50 registration fee is
// non-refundable, so no Stripe refund is issued — the enrollment is
// simply marked cancelled.
export async function GET(request: Request) {
  // Refuse l'accès si le secret n'est pas configuré (évite un contournement via
  // un en-tête « Bearer undefined » quand CRON_SECRET est vide).
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Cron non configuré" }, { status: 503 });
  }
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("enrollments")
    .update({ status: "cancelled" })
    .eq("status", "pending_payment")
    .lt("payment_deadline", now)
    .select("id");

  if (error) {
    console.error("Cron expire-pending error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  return NextResponse.json({ expired: data?.length || 0 });
}
