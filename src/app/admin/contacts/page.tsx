import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { Card, NotAllowed, MissingTableNotice, EmptyState, formatDate } from "../ui";

interface Row {
  id: string; created_at: string | null; first_name: string; last_name: string;
  email: string; country: string | null; interest: string | null; message: string | null;
}

export default async function AdminContactsPage() {
  const session = await getAdminSession();
  if (!hasPermission(session.role, "contacts.view")) return <NotAllowed />;

  const { rows, missing } = await readTable<Row>(
    "contact_requests",
    "id, created_at, first_name, last_name, email, country, interest, message",
  );

  return (
    <div>
      <h2 className="font-[family-name:var(--font-heading)] text-xl text-navy mb-4">Demandes de contact</h2>
      {missing && <MissingTableNotice />}
      {rows.length === 0 ? (
        <EmptyState label={missing ? "En attente d'activation du service." : "Aucune demande de contact pour le moment."} />
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.id} className="!p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <div className="font-semibold text-navy text-[15px]">{r.first_name} {r.last_name}</div>
                  <a href={`mailto:${r.email}`} className="text-[13px] text-muted hover:text-gold">{r.email}</a>
                  {r.country && <span className="text-[13px] text-muted"> · {r.country}</span>}
                </div>
                {r.interest && <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-navy/5 text-navy">{r.interest}</span>}
              </div>
              {r.message && <p className="text-[13px] text-body mt-2 leading-[1.6]">{r.message}</p>}
              <div className="text-[11.5px] text-muted mt-2">{formatDate(r.created_at)}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
