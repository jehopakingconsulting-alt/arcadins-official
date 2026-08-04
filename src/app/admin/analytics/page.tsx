import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { canAccessAdmin } from "@/lib/rbac";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { PROGRAMS } from "@/lib/constants";
import {
  computeLearningAnalytics,
  type SaleRecord,
  type EnrollmentRecord,
  type CertificateRecord,
} from "@/lib/analytics/learning-analytics";

// Admin — System 6 : tableau de bord ANALYTIQUE. Branche le moteur pur
// (learning-analytics) sur les vraies tables. Lecture seule, rôle admin, flag-guarded.
export default async function AdminAnalyticsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };
  if (!canAccessAdmin(profile?.role as string | undefined)) redirect("/dashboard");

  const sales: SaleRecord[] = [];
  const enrollments: EnrollmentRecord[] = [];
  const certificates: CertificateRecord[] = [];

  if (PROGRAM_CHECKOUT_ENABLED) {
    const admin = createAdminClient();
    const [pe, fees, forms, certs] = await Promise.all([
      admin.from("program_enrollments").select("user_id, program_code, offer_amount_cents, currency, status, created_at"),
      admin.from("registration_fee_payments").select("amount_cents, currency, paid_at"),
      admin.from("enrollments").select("user_id, status, enrolled_at, programs(slug)"),
      admin.from("certificates").select("id"),
    ]);

    for (const r of (pe.data as { user_id: string; program_code: string; offer_amount_cents: number; currency: string; status: string; created_at: string }[]) || []) {
      sales.push({ program: r.program_code, amountCents: r.offer_amount_cents, currency: r.currency || "usd", at: r.created_at });
      enrollments.push({ program: r.program_code, userId: r.user_id, status: r.status, at: r.created_at });
    }
    for (const f of (fees.data as { amount_cents: number; currency: string; paid_at: string }[]) || []) {
      sales.push({ program: "frais-inscription", amountCents: f.amount_cents, currency: f.currency || "usd", at: f.paid_at });
    }
    for (const e of (forms.data as { user_id: string; status: string; enrolled_at: string; programs: { slug: string }[] | null }[]) || []) {
      const slug = e.programs?.[0]?.slug;
      if (!slug) continue;
      enrollments.push({ program: slug, userId: e.user_id, status: e.status, at: e.enrolled_at });
      if (e.status === "active") {
        const price = PROGRAMS.find((p) => p.slug === slug)?.price;
        if (price) sales.push({ program: slug, amountCents: price * 100, currency: "cad", at: e.enrolled_at });
      }
    }
    const certCount = ((certs.data as { id: string }[]) || []).length;
    for (let i = 0; i < certCount; i++) certificates.push({ program: "" });
  }

  const a = computeLearningAnalytics({ sales, enrollments, completions: [], exams: [], certificates });
  const money = (cents: number, cur: string) => new Intl.NumberFormat("fr-CA", { style: "currency", currency: cur.toUpperCase() }).format(cents / 100);

  return (
    <div className="min-h-screen bg-off-white pt-28 pb-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl text-navy mb-2">Analytique</h1>
        <p className="text-muted text-[14px] mb-6">Revenus, inscriptions et activité (lecture seule).</p>

        {!PROGRAM_CHECKOUT_ENABLED && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-6 text-[13px] text-body">
            Commerce inactif (flag OFF) — les données apparaîtront après activation.
          </div>
        )}

        {/* Revenu par devise */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {Object.keys(a.revenueByCurrency).length === 0 ? (
            <div className="bg-white border border-gold/16 rounded-xl p-4"><div className="text-2xl font-bold text-navy">—</div><div className="text-[12px] text-muted mt-1">Revenu</div></div>
          ) : Object.entries(a.revenueByCurrency).map(([cur, cents]) => (
            <div key={cur} className="bg-white border border-gold/16 rounded-xl p-4">
              <div className="text-2xl font-bold text-navy">{money(cents, cur)}</div>
              <div className="text-[12px] text-muted mt-1">Revenu ({cur.toUpperCase()})</div>
            </div>
          ))}
        </div>

        {/* KPI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Ventes", value: a.salesCount },
            { label: "Inscriptions", value: a.enrollmentsCount },
            { label: "Étudiants actifs", value: a.activeStudents },
            { label: "Certificats émis", value: a.certificatesIssued },
            { label: "Taux de complétion", value: `${a.completionRatePct}%` },
            { label: "Progression moyenne", value: `${a.avgProgressPct}%` },
            { label: "Taux d'abandon", value: `${a.dropoutRatePct}%` },
            { label: "Réussite examens", value: `${a.examPassRatePct}%` },
          ].map((k) => (
            <div key={k.label} className="bg-white border border-gold/16 rounded-xl p-4">
              <div className="text-2xl font-bold text-navy">{k.value}</div>
              <div className="text-[12px] text-muted mt-1">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Top programmes */}
        <h2 className="font-bold text-navy text-[15px] mb-3">Programmes les plus populaires</h2>
        <div className="overflow-x-auto rounded-xl border border-gold/16 bg-white">
          <table className="w-full text-left text-[13px] min-w-[480px]">
            <thead className="bg-off-white text-muted"><tr>
              <th className="px-4 py-2.5 font-semibold">Programme</th><th className="px-4 py-2.5 font-semibold">Inscriptions</th><th className="px-4 py-2.5 font-semibold">Revenu</th>
            </tr></thead>
            <tbody>
              {a.topPrograms.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-6 text-center text-muted">Aucune donnée pour l&apos;instant.</td></tr>
              ) : a.topPrograms.map((p) => (
                <tr key={p.program} className="border-t border-gold/10">
                  <td className="px-4 py-2.5 text-navy font-medium">{p.program}</td>
                  <td className="px-4 py-2.5">{p.enrollments}</td>
                  <td className="px-4 py-2.5">{p.revenueCents ? money(p.revenueCents, "cad") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-muted mt-4">Complétion, progression et examens se peupleront à l&apos;activation du runtime d&apos;apprentissage.</p>
      </div>
    </div>
  );
}
