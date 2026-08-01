"use client";

import Link from "next/link";
import { useLang, t, UI } from "@/lib/i18n";
import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * Séparation des DEUX DÉPARTEMENTS sur l'accueil (règle d'architecture permanente).
 *  - Département A : Programmes officiels de langue (TEF/TCF/TFI/DELF/DALF) → /tef (entrée V1).
 *  - Département B : Formations professionnelles (les 9) → /formations.
 * Chaque bloc a son propre libellé, sa description et son CTA. Aucun croisement de
 * navigation ni de terminologie. Voir docs/V1_DEPARTMENT_SEPARATION_AUDIT.md.
 */
const DEPARTMENTS: {
  key: "a" | "b";
  icon: IconName;
  href: string;
  accent: string;
}[] = [
  { key: "a", icon: "clipboard", href: "/tef", accent: "from-gold/18 to-gold/5" },
  { key: "b", icon: "cap", href: "/formations", accent: "from-[#8A9BB5]/18 to-[#8A9BB5]/5" },
];

export default function DepartmentsSplit() {
  const { lang } = useLang();

  return (
    <section className="bg-navy py-[76px] px-7 border-t border-gold/10">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-11">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">
            {t(UI["dept.kicker"], lang)}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[34px] md:text-[40px] text-white">
            {t(UI["dept.title"], lang)}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {DEPARTMENTS.map((d) => (
            <div
              key={d.key}
              className="group relative flex flex-col bg-white/[0.04] border border-gold/16 rounded-[24px] p-8 md:p-10 transition-all hover:border-gold/45 hover:bg-white/[0.06]"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${d.accent} border border-gold/25 text-gold flex items-center justify-center mb-6`}>
                <Icon name={d.icon} size={30} />
              </div>
              <div className="text-[11px] font-bold tracking-[2.5px] uppercase text-gold mb-3">
                {t(UI[`dept.${d.key}.badge`], lang)}
              </div>
              <h3 className="font-[family-name:var(--font-heading)] text-[24px] md:text-[27px] text-white mb-4 leading-tight">
                {t(UI[`dept.${d.key}.title`], lang)}
              </h3>
              <p className="text-[14.5px] text-white/62 leading-[1.75] mb-8 flex-1">
                {t(UI[`dept.${d.key}.desc`], lang)}
              </p>
              <Link
                href={d.href}
                className="inline-flex items-center gap-2 self-start bg-gold text-navy font-bold text-[14px] px-6 py-3 rounded-[10px] transition-all hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(201,168,76,0.3)]"
              >
                {t(UI[`dept.${d.key}.cta`], lang)}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
