"use client";

import Link from "next/link";
import { useLang, t, UI } from "@/lib/i18n";

const SERVICES = [
  { icon: "📋", catKey: "svc.tests.cat", nameKey: "svc.tests.name", descKey: "svc.tests.desc", href: "/tef" },
  { icon: "🎓", catKey: "svc.formations.cat", nameKey: "svc.formations.name", descKey: "svc.formations.desc", href: "/formations" },
  { icon: "💻", catKey: "svc.examens.cat", nameKey: "svc.examens.name", descKey: "svc.examens.desc", href: "/examens" },
  { icon: "🍁", catKey: "svc.immigration.cat", nameKey: "svc.immigration.name", descKey: "svc.immigration.desc", href: "/immigration" },
];

export default function ServicesGrid() {
  const { lang } = useLang();

  return (
    <div className="bg-off-white py-[70px] px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            {t(UI["services.label"], lang)}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[38px] text-navy">
            {t(UI["services.title1"], lang)}
            <br />
            <em className="text-gold italic">{t(UI["services.title2"], lang)}</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.nameKey}
              href={s.href}
              className="bg-white border border-gold/16 rounded-[20px] p-6 cursor-pointer transition-all hover:-translate-y-1 hover:border-gold/48 hover:shadow-[0_16px_40px_rgba(13,27,46,0.1)] block"
            >
              <div className="text-[34px] mb-3">{s.icon}</div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1.5">
                {t(UI[s.catKey], lang)}
              </div>
              <div className="font-[family-name:var(--font-heading)] text-lg text-navy mb-2">
                {t(UI[s.nameKey], lang)}
              </div>
              <div className="text-[13px] text-muted leading-[1.65]">
                {t(UI[s.descKey], lang)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
