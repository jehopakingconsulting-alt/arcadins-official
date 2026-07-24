import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { getSkill, getLevel } from "@/lib/data/tutorat";
import { allowedTutoringTargets, type TutoringStatus } from "@/lib/tutoring/status";
import StatusControl from "@/components/admin/StatusControl";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string | null; skills: string[] | null;
  target_level: string | null; goal: string | null; status: string;
}
interface HistoryRow {
  tutoring_request_id: string | null; from_status: string | null; to_status: string;
  created_at: string; reason: string | null;
}

const STATUS_CLS: Record<string, string> = {
  submitted: "bg-gold/20 text-gold", under_review: "bg-blue-100 text-blue-700",
  contacted: "bg-indigo-100 text-indigo-700", scheduled: "bg-purple-100 text-purple-700",
  enrolled: "bg-green-100 text-green-700", closed: "bg-gray-200 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export default async function AdminTutoratPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "tutoring_requests.view")) return <NotAllowed />;
  const isAdmin = session.role === "admin";

  const { rows, missing } = await readTable<Row>(
    "tutoring_requests",
    "id, created_at, first_name, last_name, email, phone, skills, target_level, goal, status",
  );
  const { rows: history } = await readTable<HistoryRow>(
    "application_status_history",
    "tutoring_request_id, from_status, to_status, created_at, reason", 1000,
  );
  const histByReq = new Map<string, HistoryRow[]>();
  for (const h of history) {
    if (!h.tutoring_request_id) continue;
    const arr = histByReq.get(h.tutoring_request_id) ?? [];
    arr.push(h); histByReq.set(h.tutoring_request_id, arr);
  }

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
                {(r.skills ?? []).map((s) => (<span key={s} className="text-[11px] bg-navy/5 text-navy rounded px-2 py-0.5">{getSkill(s)?.abbr ?? s}</span>))}
                {r.target_level && <span className="text-[11px] bg-gold/10 text-gold rounded px-2 py-0.5">{getLevel(r.target_level)?.labelFr ?? r.target_level}</span>}
              </div>
              {r.goal && <p className="text-[13px] text-body mt-2 leading-[1.6]">{r.goal}</p>}
              <div className="text-[11.5px] text-muted mt-2">{formatDate(r.created_at)}</div>

              {/* Historique des changements de statut */}
              {(histByReq.get(r.id)?.length ?? 0) > 0 && (
                <div className="mt-3 bg-off-white rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-muted mb-1.5">Historique</p>
                  <ul className="space-y-1">
                    {histByReq.get(r.id)!.map((h, i) => (
                      <li key={i} className="text-[11.5px] text-body">
                        {formatDate(h.created_at)} · {h.from_status ?? "—"} → <strong>{h.to_status}</strong>{h.reason ? ` (${h.reason})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <StatusControl
                endpoint={`/api/admin/tutoring/${r.id}/status`}
                current={r.status}
                targets={allowedTutoringTargets(r.status as TutoringStatus)}
                requireReason={["cancelled", "closed"]}
                canReopen={isAdmin && ["closed", "cancelled"].includes(r.status)}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
