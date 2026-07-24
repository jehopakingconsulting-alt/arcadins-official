import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { getSkill, getLevel } from "@/lib/data/tutorat";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string | null; skills: string[] | null;
  target_level: string | null; goal: string | null; status: string;
}

const STATUS_CLS: Record<string, string> = {
  nouvelle: "bg-gold/20 text-gold", contactee: "bg-blue-100 text-blue-700",
  planifiee: "bg-green-100 text-green-700", close: "bg-gray-200 text-gray-600",
  archivee: "bg-gray-100 text-gray-400",
};

export default async function AdminTutoratPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "tutoring_requests.view")) return <NotAllowed />;

  const { rows, missing } = await readTable<Row>(
    "tutoring_requests",
    "id, created_at, first_name, last_name, email, phone, skills, target_level, goal, status",
  );

  return (
    <div>
      <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">Demandes de tutorat (élèves)</h2>
      {missing && <MissingTableNotice />}
      {rows.length === 0 ? (
        <EmptyState label={missing ? "En attente d'activation du service." : "Aucune demande pour le moment."} />
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.id} className="!p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="font-semibold text-navy text-[15px]">{r.first_name} {r.last_name}</div>
                  <a href={`mailto:${r.email}`} className="text-[13px] text-muted hover:text-gold">{r.email}</a>
                  {r.phone && <span className="text-[13px] text-muted"> · {r.phone}</span>}
                </div>
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${STATUS_CLS[r.status] ?? "bg-gray-100 text-gray-500"}`}>{r.status}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {(r.skills ?? []).map((s) => (
                  <span key={s} className="text-[11px] bg-navy/5 text-navy rounded px-2 py-0.5">{getSkill(s)?.abbr ?? s}</span>
                ))}
                {r.target_level && <span className="text-[11px] bg-gold/10 text-gold rounded px-2 py-0.5">{getLevel(r.target_level)?.labelFr ?? r.target_level}</span>}
              </div>
              {r.goal && <p className="text-[13px] text-body mt-2 leading-[1.6]">{r.goal}</p>}
              <div className="text-[11.5px] text-muted mt-2">{formatDate(r.created_at)}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
