"use client";

import Link from "next/link";
import { useLang, t, UI } from "@/lib/i18n";
import Icon, { type IconName } from "@/components/ui/Icon";

const SERVICES: { icon: IconName; catKey: string; nameKey: string; descKey: string; href: string }[] = [
  { icon: "clipboard", catKey: "svc.tests.cat", nameKey: "svc.tests.name", descKey: "svc.tests.desc", href: "/tef" },
  { icon: "cap", catKey: "svc.formations.cat", nameKey: "svc.formations.name", descKey: "svc.formations.desc", href: "/formations" },
  { icon: "laptop", catKey: "svc.examens.cat", nameKey: "svc.examens.name", descKey: "svc.examens.desc", href: "/examens" },
  { icon: "globe", catKey: "svc.immigration.cat", nameKey: "svc.immigration.name", descKey: "svc.immigration.desc", href: "/immigration" },
];

export default function ServicesGrid() {
  const { lang } = useLang();

  return (
    <div className="bg-off-white py-[70px] px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold-ink mb-2.5">
            {t(UI["services.label"], lang)}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[38px] text-navy">
            {t(UI["services.title1"], lang)}
            <br />
            <em className="text-gold-ink italic">{t(UI["services.title2"], lang)}</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s) => (
            <Link
              key={s.nameKey}
              href={s.href}
              className="bg-white border border-gold/16 rounded-[20px] p-6 cursor-pointer transition-all hover:-translate-y-1 hover:border-gold/48 hover:shadow-[0_16px_40px_rgba(13,27,46,0.1)] block"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy text-gold flex items-center justify-center mb-3">
                <Icon name={s.icon} size={26} />
              </div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold-ink mb-1.5">
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
