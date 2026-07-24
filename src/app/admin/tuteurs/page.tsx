import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { getSkill, getLevel } from "@/lib/data/tutorat";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; phone: string | null; skills: string[] | null; levels: string[] | null;
  experience: string | null; motivation: string | null; status: string;
}

const STATUS_CLS: Record<string, string> = {
  recue: "bg-gold/20 text-gold", en_revue: "bg-blue-100 text-blue-700",
  entretien: "bg-purple-100 text-purple-700", acceptee: "bg-green-100 text-green-700",
  refusee: "bg-red-100 text-red-600", archivee: "bg-gray-100 text-gray-400",
};

export default async function AdminTuteursPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "tutor_applications.view")) return <NotAllowed />;

  const { rows, missing } = await readTable<Row>(
    "tutor_applications",
    "id, created_at, first_name, last_name, email, phone, skills, levels, experience, motivation, status",
  );

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
                {(r.skills ?? []).map((s) => (
                  <span key={s} className="text-[11px] bg-navy/5 text-navy rounded px-2 py-0.5">{getSkill(s)?.abbr ?? s}</span>
                ))}
                {(r.levels ?? []).map((l) => (
                  <span key={l} className="text-[11px] bg-gold/10 text-gold rounded px-2 py-0.5">{getLevel(l)?.labelFr ?? l}</span>
                ))}
              </div>
              {r.experience && <p className="text-[13px] text-body mt-2 leading-[1.6]"><span className="text-muted">Expérience :</span> {r.experience}</p>}
              {r.motivation && <p className="text-[13px] text-body mt-1 leading-[1.6]"><span className="text-muted">Motivation :</span> {r.motivation}</p>}
              <div className="text-[11.5px] text-muted mt-2">{formatDate(r.created_at)}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
