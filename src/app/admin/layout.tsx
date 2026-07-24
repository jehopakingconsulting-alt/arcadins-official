import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAdminSession } from "@/lib/admin-data";
import { canAccessAdmin, ROLE_LABELS, type Role } from "@/lib/rbac";
import AdminNav from "./AdminNav";

export const metadata: Metadata = {
  title: "Administration — ARCADINS",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session.userId) redirect("/auth/login?redirect=/admin");
  if (!canAccessAdmin(session.role)) redirect("/dashboard");

  const roleLabel = session.role && session.role in ROLE_LABELS
    ? ROLE_LABELS[session.role as Role]
    : session.role ?? "—";

  return (
    <div className="bg-off-white min-h-screen pt-24 pb-16">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-7">
        <div className="mb-6">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-1">Administration</p>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-[family-name:var(--font-heading)] text-[30px] text-navy">Tableau de bord</h1>
            <span className="text-[11.5px] font-semibold bg-navy text-gold px-3 py-1 rounded-full">{roleLabel}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 items-start">
          <AdminNav permissions={session.permissions} />
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
