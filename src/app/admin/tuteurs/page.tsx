import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { getSkill, getLevel } from "@/lib/data/tutorat";
import { allowedTutorTargets, type TutorStatus } from "@/lib/tutor/status";
import StatusControl from "@/components/admin/StatusControl";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string | null; skills: string[] | null; levels: string[] | null;
  experience: string | null; motivation: string | null; status: string;
}
interface HistoryRow {
  tutor_application_id: string | null; from_status: string | null; to_status: string;
  created_at: string; reason: string | null;
}

const STATUS_CLS: Record<string, string> = {
  submitted: "bg-gold/20 text-gold", under_review: "bg-blue-100 text-blue-700",
  interview_requested: "bg-indigo-100 text-indigo-700", interview_scheduled: "bg-purple-100 text-purple-700",
  approved: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-600",
  suspended: "bg-amber-100 text-amber-700", archived: "bg-gray-200 text-gray-500",
};

export default async function AdminTuteursPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "tutor_applications.view")) return <NotAllowed />;
  const isAdmin = session.role === "admin";

  const { rows, missing } = await readTable<Row>(
    "tutor_applications",
    "id, created_at, first_name, last_name, email, phone, skills, levels, experience, motivation, status",
  );
  const { rows: history } = await readTable<HistoryRow>(
    "application_status_history",
    "tutor_application_id, from_status, to_status, created_at, reason", 1000,
  );
  const histByApp = new Map<string, HistoryRow[]>();
  for (const h of history) {
    if (!h.tutor_application_id) continue;
    const arr = histByApp.get(h.tutor_application_id) ?? [];
    arr.push(h); histByApp.set(h.tutor_application_id, arr);
  }

  return (
    <div>
      <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">Candidatures tuteur</h2>
      {missing && <MissingTableNotice />}
      {rows.length === 0 ? (
        <EmptyState label={missing ? "En attente d'activation du service." : "Aucune candidature pour le moment."} />
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
                {(r.levels ?? []).map((l) => (<span key={l} className="text-[11px] bg-gold/10 text-gold rounded px-2 py-0.5">{getLevel(l)?.labelFr ?? l}</span>))}
              </div>
              {r.experience && <p className="text-[13px] text-body mt-2 leading-[1.6]"><span className="text-muted">Expérience :</span> {r.experience}</p>}
              {r.motivation && <p className="text-[13px] text-body mt-1 leading-[1.6]"><span className="text-muted">Motivation :</span> {r.motivation}</p>}
              <div className="text-[11.5px] text-muted mt-2">{formatDate(r.created_at)}</div>

              {(histByApp.get(r.id)?.length ?? 0) > 0 && (
                <div className="mt-3 bg-off-white rounded-lg p-3">
                  <p className="text-[11px] font-semibold text-muted mb-1.5">Historique</p>
                  <ul className="space-y-1">
                    {histByApp.get(r.id)!.map((h, i) => (
                      <li key={i} className="text-[11.5px] text-body">
                        {formatDate(h.created_at)} · {h.from_status ?? "—"} → <strong>{h.to_status}</strong>{h.reason ? ` (${h.reason})` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <StatusControl
                endpoint={`/api/admin/tutor/${r.id}/status`}
                current={r.status}
                targets={allowedTutorTargets(r.status as TutorStatus)}
                requireReason={["rejected", "suspended"]}
                canReopen={isAdmin && ["rejected", "archived"].includes(r.status)}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
