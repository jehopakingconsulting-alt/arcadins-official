import Link from "next/link";
import { getAdminSession, readTable } from "@/lib/admin-data";
import { hasPermission } from "@/lib/rbac";
import { Card } from "./ui";

export default async function AdminOverviewPage() {
  const session = await getAdminSession();

  const tiles: { label: string; icon: string; href: string; value: string; hint?: string }[] = [];

  if (hasPermission(session.role, "tutoring_requests.view")) {
    const { rows, missing } = await readTable("tutoring_requests", "id", 500);
    tiles.push({ label: "Demandes de tutorat", icon: "🎯", href: "/admin/tutorat", value: missing ? "—" : String(rows.length), hint: missing ? "à activer" : undefined });
  }
  if (hasPermission(session.role, "tutor_applications.view")) {
    const { rows, missing } = await readTable("tutor_applications", "id", 500);
    tiles.push({ label: "Candidatures tuteur", icon: "🧑‍🏫", href: "/admin/tuteurs", value: missing ? "—" : String(rows.length), hint: missing ? "à activer" : undefined });
  }
  if (hasPermission(session.role, "contacts.view")) {
    const { rows, missing } = await readTable("contact_requests", "id", 500);
    tiles.push({ label: "Contacts", icon: "📨", href: "/admin/contacts", value: missing ? "—" : String(rows.length), hint: missing ? "à activer" : undefined });
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="block">
            <Card className="transition-all hover:border-gold hover:-translate-y-0.5">
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-navy">{t.value}</span>
                {t.hint && <span className="text-[11px] font-semibold text-amber-600">{t.hint}</span>}
              </div>
              <div className="text-[13px] text-muted mt-1">{t.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      {tiles.length === 0 && (
        <Card>
          <p className="text-[14px] text-muted">Aucune section disponible pour votre rôle.</p>
        </Card>
      )}

      <Card>
        <p className="text-[12.5px] text-muted leading-[1.7]">
          Chaque file est traitée séparément. Les demandes de tutorat (élèves) et les candidatures
          tuteur suivent des cycles de statut distincts, conformément à la séparation des flux.
        </p>
      </Card>
    </div>
  );
}
