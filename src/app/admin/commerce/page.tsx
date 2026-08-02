import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { canAccessAdmin } from "@/lib/rbac";
import { PROGRAM_CHECKOUT_ENABLED } from "@/lib/config/launch-flags";
import { evaluateCommerceConfig } from "@/lib/commerce/config-check";
import { PROGRAM_NAMES, isProgramCode } from "@/lib/commerce/program-commerce";

// Admin — Commerce & inscriptions self-service (TEF/TCF). LECTURE seule + état de config.
// Gate d'accès : rôle admin uniquement. Aucune donnée Stripe secrète exposée.
export default async function AdminCommercePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };
  if (!canAccessAdmin(profile?.role as string | undefined)) redirect("/dashboard");

  const config = evaluateCommerceConfig(process.env as Record<string, string | undefined>);

  type Enr = { id: string; user_id: string; program_code: string; package_key: string; status: string; offer_amount_cents: number; order_reference: string | null; created_at: string };
  type Fee = { user_id: string; amount_cents: number; paid_at: string };
  type Evt = { stripe_event_id: string; event_type: string; processed_at: string };

  let enrollments: Enr[] = [];
  let fees: Fee[] = [];
  let events: Evt[] = [];
  let sessionsCount = 0;

  if (PROGRAM_CHECKOUT_ENABLED) {
    const admin = createAdminClient();
    const [e, f, ev, s] = await Promise.all([
      admin.from("program_enrollments").select("id, user_id, program_code, package_key, status, offer_amount_cents, order_reference, created_at").order("created_at", { ascending: false }).limit(50),
      admin.from("registration_fee_payments").select("user_id, amount_cents, paid_at").order("paid_at", { ascending: false }).limit(50),
      admin.from("program_purchase_events").select("stripe_event_id, event_type, processed_at").order("processed_at", { ascending: false }).limit(50),
      admin.from("enrollment_sessions").select("id", { count: "exact", head: true }),
    ]);
    enrollments = (e.data as Enr[]) || [];
    fees = (f.data as Fee[]) || [];
    events = (ev.data as Evt[]) || [];
    sessionsCount = s.count || 0;
  }

  const usd = (c: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(c / 100);

  return (
    <div className="min-h-screen bg-off-white pt-28 pb-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl text-navy mb-2">Commerce & inscriptions</h1>
        <p className="text-muted text-[14px] mb-6">Programmes officiels self-service (TEF / TCF). Lecture seule.</p>

        {/* État de configuration */}
        <div className={`rounded-2xl p-5 mb-8 border ${config.canActivate ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300"}`}>
          <div className="font-bold text-navy text-[14px] mb-1">État : {config.canActivate ? "✅ prêt à activer" : "⚠️ non activable"}</div>
          <p className="text-[13px] text-body">{config.summary}</p>
          {config.missing.length > 0 && <p className="text-[12px] text-muted mt-1">Manquant : {config.missing.join(", ")}</p>}
        </div>

        {!PROGRAM_CHECKOUT_ENABLED ? (
          <div className="bg-white border border-gold/16 rounded-2xl p-8 text-center text-muted text-[14px]">
            Commerce self-service désactivé (flag OFF). Les tables et données apparaîtront une fois le flag activé et la migration appliquée.
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Inscriptions programme", value: enrollments.length },
                { label: "Frais d'inscription payés", value: fees.length },
                { label: "Événements Stripe traités", value: events.length },
                { label: "Sessions d'inscription", value: sessionsCount },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gold/16 rounded-xl p-4">
                  <div className="text-2xl font-bold text-navy">{s.value}</div>
                  <div className="text-[12px] text-muted mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <section>
              <h2 className="font-bold text-navy text-[15px] mb-3">Inscriptions récentes</h2>
              <div className="overflow-x-auto rounded-xl border border-gold/16 bg-white">
                <table className="w-full text-left text-[13px] min-w-[640px]">
                  <thead className="bg-off-white text-muted"><tr>
                    <th className="px-4 py-2.5 font-semibold">Programme</th><th className="px-4 py-2.5 font-semibold">Forfait</th>
                    <th className="px-4 py-2.5 font-semibold">Montant</th><th className="px-4 py-2.5 font-semibold">Statut</th>
                    <th className="px-4 py-2.5 font-semibold">Référence</th><th className="px-4 py-2.5 font-semibold">Date</th>
                  </tr></thead>
                  <tbody>
                    {enrollments.length === 0 ? (
                      <tr><td colSpan={6} className="px-4 py-6 text-center text-muted">Aucune inscription pour l&apos;instant.</td></tr>
                    ) : enrollments.map((e) => (
                      <tr key={e.id} className="border-t border-gold/10">
                        <td className="px-4 py-2.5 text-navy font-medium">{isProgramCode(e.program_code) ? PROGRAM_NAMES[e.program_code] : e.program_code}</td>
                        <td className="px-4 py-2.5">{e.package_key}</td>
                        <td className="px-4 py-2.5">{usd(e.offer_amount_cents)}</td>
                        <td className="px-4 py-2.5">{e.status}</td>
                        <td className="px-4 py-2.5 font-mono text-[11px]">{e.order_reference || "—"}</td>
                        <td className="px-4 py-2.5 text-muted">{new Date(e.created_at).toLocaleDateString("fr-CA")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-bold text-navy text-[15px] mb-3">Événements webhook traités (idempotence)</h2>
              <div className="overflow-x-auto rounded-xl border border-gold/16 bg-white">
                <table className="w-full text-left text-[13px] min-w-[520px]">
                  <thead className="bg-off-white text-muted"><tr>
                    <th className="px-4 py-2.5 font-semibold">Événement Stripe</th><th className="px-4 py-2.5 font-semibold">Type</th><th className="px-4 py-2.5 font-semibold">Traité le</th>
                  </tr></thead>
                  <tbody>
                    {events.length === 0 ? (
                      <tr><td colSpan={3} className="px-4 py-6 text-center text-muted">Aucun événement.</td></tr>
                    ) : events.map((ev) => (
                      <tr key={ev.stripe_event_id} className="border-t border-gold/10">
                        <td className="px-4 py-2.5 font-mono text-[11px]">{ev.stripe_event_id}</td>
                        <td className="px-4 py-2.5">{ev.event_type}</td>
                        <td className="px-4 py-2.5 text-muted">{new Date(ev.processed_at).toLocaleString("fr-CA")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
