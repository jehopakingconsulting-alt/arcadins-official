"use client";

import { PROGRAMS, PAYMENT_METHODS } from "@/lib/constants";
import { useLang, t, UI } from "@/lib/i18n";
import { getInstallmentPlan, REGISTRATION_FEE } from "@/lib/pricing";
import Link from "next/link";

export default function TarifsPage() {
  const { lang } = useLang();
  const activeCourses = PROGRAMS.filter((p) => !p.comingSoon);

  return (
    <div className="bg-navy min-h-screen pt-32 pb-20 px-7">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-[4px] uppercase text-gold mb-2.5">{t(UI["tarifs.label"], lang)}</p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-white mb-4">
            {t(UI["tarifs.title1"], lang)}<br />{t(UI["tarifs.title2"], lang)} <em className="text-gold italic">{t(UI["tarifs.title3"], lang)}</em>
          </h2>
          <p className="text-[17px] text-white/50 max-w-[500px] mx-auto">{t(UI["tarifs.desc"], lang)}</p>
        </div>

        {/* Courses pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCourses.map((course) => {
            const name = UI[`c.${course.slug}`] ? t(UI[`c.${course.slug}`], lang) : course.name;
            const desc = UI[`cd.${course.slug}`] ? t(UI[`cd.${course.slug}`], lang) : course.description;
            return (
            <div
              key={course.id}
              className="bg-white/[0.044] border border-gold/17 rounded-[28px] p-8 transition-all hover:-translate-y-1 hover:border-gold/44 flex flex-col"
            >
              <div className="text-3xl mb-3">{course.icon}</div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1.5">
                {course.categoryLabel} · 24 semaines
              </div>
              <div className="font-[family-name:var(--font-heading)] text-xl text-white mb-2 leading-[1.3]">
                {name}
              </div>
              <p className="text-[13px] text-white/48 leading-[1.65] mb-6 flex-1">
                {desc}
              </p>

              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[15px] text-white/50">CAD</span>
                <span className="font-[family-name:var(--font-heading)] text-[40px] font-bold text-gold leading-none">
                  {course.price.toLocaleString()}
                </span>
              </div>
              <div className="text-[11.5px] text-white/40 mb-5">
                + {REGISTRATION_FEE}$ inscription · ou 3× ({getInstallmentPlan(course.price).installments[0] + REGISTRATION_FEE}$, 1000$, 1000$)
              </div>

              <ul className="mb-6 space-y-0">
                {[
                  { text: "Formation complète 24 semaines", included: true },
                  { text: "Certificat numérique inclus", included: true },
                  { text: "8 modules progressifs", included: true },
                  { text: "Support multilingue", included: true },
                  { text: "Accès 100% en ligne", included: true },
                ].map((f) => (
                  <li key={f.text} className="flex items-start gap-2 py-[6px] border-b border-white/[0.06] text-[13px] text-white/70">
                    <span className="text-gold text-sm shrink-0 mt-0.5">✓</span>{f.text}
                  </li>
                ))}
              </ul>

              <Link
                href={`/formations/${course.slug}`}
                className="block w-full py-3.5 rounded-[9px] font-bold text-[14.5px] text-center transition-all bg-transparent text-gold border-[1.5px] border-gold/43 hover:bg-gold/10 hover:border-gold"
              >
                {t(UI["form.see"], lang).replace("→", "programme →")}
              </Link>
            </div>
          );
          })}
        </div>

        {/* Enterprise card */}
        <div className="mt-8 bg-gold rounded-[28px] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-block text-[10.5px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-full mb-3 bg-navy/18 text-navy">
              Institutions
            </div>
            <div className="font-[family-name:var(--font-heading)] text-3xl text-navy mb-2">
              Forfait Entreprise
            </div>
            <p className="text-navy/70 text-[15px] max-w-[500px] leading-[1.65]">
              Pour les écoles, entreprises, gouvernements et organismes. Licences multi-utilisateurs, LMS whitelabel, formateurs dédiés et programmes sur mesure.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-navy text-gold font-bold text-[15px] px-10 py-4 rounded-[10px] transition-all hover:bg-navy-mid shrink-0"
          >
            Nous contacter →
          </Link>
        </div>

        {/* Payment methods */}
        <div className="text-center mt-9">
          <p className="text-white/36 text-[13px]">{t(UI["tarifs.payments"], lang)}</p>
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {PAYMENT_METHODS.map((m) => (<span key={m} className="bg-white/[0.055] border border-gold/17 rounded-md px-3 py-[5px] text-xs text-white/52">{m}</span>))}
          </div>
        </div>
      </div>
    </div>
  );
}
