import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import ReviewModeration from "@/components/admin/ReviewModeration";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string; program_slug: string;
  rating: number; comment: string | null; status: string;
}

const STATUS_CLS: Record<string, string> = {
  pending: "bg-gold/20 text-gold",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

export default async function AdminReviewsPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "content.manage")) return <NotAllowed />;

  const { rows, missing } = await readTable<Row>(
    "program_reviews",
    "id, created_at, program_slug, rating, comment, status",
  );

  return (
    <Card>
      <div className="mb-5">
        <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy">Avis étudiants</h2>
        <p className="text-[13px] text-muted mt-0.5">Modération des avis publiés sur les fiches de formation</p>
      </div>
      {missing ? (
        <MissingTableNotice />
      ) : rows.length === 0 ? (
        <EmptyState label="Aucun avis pour le moment." />
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((r) => (
            <div key={r.id} className="border border-gold/12 rounded-xl p-4 bg-white">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-gold text-sm tracking-[2px]">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                  <span className="text-xs font-semibold text-navy">{r.program_slug}</span>
                  <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${STATUS_CLS[r.status] ?? "bg-gray-100"}`}>{r.status}</span>
                </div>
                <span className="text-[11px] text-muted">{formatDate(r.created_at)}</span>
              </div>
              {r.comment && <p className="text-[13.5px] text-body leading-[1.6] mb-3">{r.comment}</p>}
              <ReviewModeration id={r.id} current={r.status} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
