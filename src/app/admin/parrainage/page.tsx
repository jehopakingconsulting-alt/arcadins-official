import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { REFERRAL_ENABLED, REFERRAL_PLAN } from "@/lib/data/referral-config";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string; generation: number; status: string;
  sale_amount_cents: number; commission_amount_cents: number; currency: string;
}

const STATUS_CLS: Record<string, string> = {
  pending: "bg-gold/20 text-gold", approved: "bg-blue-100 text-blue-700",
  paid: "bg-green-100 text-green-700", reversed: "bg-red-100 text-red-600",
};

const money = (cents: number, cur: string) => `${(cents / 100).toFixed(2)} ${cur}`;

export default async function AdminParrainagePage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "referrals.view")) return <NotAllowed />;

  if (!REFERRAL_ENABLED) {
    return (
      <Card>
        <div className="text-3xl mb-2">💤</div>
        <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-1.5">Programme de parrainage désactivé</h2>
        <p className="text-[14px] text-muted leading-[1.6]">
          Le programme est prêt côté code mais reste <strong>désactivé</strong> (flag <code>REFERRAL_ENABLED = false</code>)
          en attendant la validation juridique du plan de rémunération et l&apos;application de la migration
          <code> 0003</code>. Plan prévu : {REFERRAL_PLAN.map((t) => `G${t.generation} ${t.ratePercent}%`).join(" · ")}.
        </p>
      </Card>
    );
  }

  const { rows, missing } = await readTable<Row>(
    "referral_commissions",
    "id, created_at, generation, status, sale_amount_cents, commission_amount_cents, currency",
  );

  return (
    <div>
      <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">Commissions de parrainage</h2>
      {missing && <MissingTableNotice />}
      {rows.length === 0 ? (
        <EmptyState label={missing ? "En attente d'activation." : "Aucune commission pour le moment."} />
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.id} className="!p-5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="font-semibold text-navy text-[15px]">{money(r.commission_amount_cents, r.currency)}</div>
                <div className="text-[12.5px] text-muted">Génération {r.generation} · vente {money(r.sale_amount_cents, r.currency)} · {formatDate(r.created_at)}</div>
              </div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${STATUS_CLS[r.status] ?? "bg-gray-100 text-gray-500"}`}>{r.status}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
