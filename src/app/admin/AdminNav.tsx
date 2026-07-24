"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Permission } from "@/lib/rbac";
import { REFERRAL_ENABLED } from "@/lib/data/referral-config";

const LINKS: { href: string; label: string; icon: string; perm?: Permission; flag?: boolean }[] = [
  { href: "/admin", label: "Vue d'ensemble", icon: "📊" },
  { href: "/admin/tutorat", label: "Demandes de tutorat", icon: "🎯", perm: "tutoring_requests.view" },
  { href: "/admin/tuteurs", label: "Candidatures tuteur", icon: "🧑‍🏫", perm: "tutor_applications.view" },
  { href: "/admin/contacts", label: "Contacts", icon: "📨", perm: "contacts.view" },
  { href: "/admin/parrainage", label: "Parrainage", icon: "🤝", perm: "referrals.view", flag: REFERRAL_ENABLED },
];

export default function AdminNav({ permissions }: { permissions: Permission[] }) {
  const pathname = usePathname();
  const visible = LINKS.filter(
    (l) => (!l.perm || permissions.includes(l.perm)) && l.flag !== false,
  );

  return (
    <nav className="bg-white border border-gold/16 rounded-[18px] p-2.5 flex flex-row lg:flex-col gap-1 overflow-x-auto">
      {visible.map((l) => {
        const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium whitespace-nowrap transition-all ${
              active ? "bg-navy text-gold" : "text-body hover:bg-gold/8 hover:text-navy"
            }`}
          >
            <span aria-hidden>{l.icon}</span>
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
