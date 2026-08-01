"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Card, Badge, ProgressBar, Button, EmptyState } from "@/components/ui/ds";
import { DASHBOARD_SECTIONS, findSection } from "@/lib/dashboard-shell/nav";
import type { Locale } from "@/lib/program-presentation/types";
import { tr } from "@/lib/program-presentation/types";

/**
 * DashboardShell — espace apprenant CANONIQUE & GÉNÉRIQUE (12 sections). Réutilisé
 * par tous les produits. i18n FR/EN/ES, accessible (nav landmark, aria-current, focus),
 * responsive (sidebar desktop / menu mobile). Présente les view-models du runtime ;
 * la logique métier réelle est branchée par les sprints suivants (persistance/flags).
 */
function toLocale(lang: string): Locale {
  return lang === "en" ? "en" : lang === "es" ? "es" : "fr";
}

// Démonstration de view-model (structure réelle ; données injectées en S+). Générique.
export interface DashboardDemo {
  displayName: string;
  continueCourse: { title: string; moduleTitle: string; percent: number; href: string } | null;
  overallPercent: number;
  streakDays: number;
  studyMinutes: number;
  competencies: { code: string; label: string; percent: number }[];
}

const DEMO: DashboardDemo = {
  displayName: "Jean Herbith",
  continueCourse: { title: "TEF Canada", moduleTitle: "Module 4 · Expression écrite", percent: 62, href: "#" },
  overallPercent: 62,
  streakDays: 5,
  studyMinutes: 1840,
  competencies: [
    { code: "CO", label: "Compréhension orale", percent: 78 },
    { code: "CE", label: "Compréhension écrite", percent: 66 },
    { code: "EO", label: "Expression orale", percent: 54 },
    { code: "EE", label: "Expression écrite", percent: 48 },
  ],
};

const UI: Record<string, Record<Locale, string>> = {
  welcome: { fr: "Bon retour", en: "Welcome back", es: "Bienvenido de nuevo" },
  continueLearning: { fr: "Reprendre", en: "Continue learning", es: "Continuar" },
  resume: { fr: "Reprendre le cours", en: "Resume course", es: "Reanudar" },
  overall: { fr: "Progression globale", en: "Overall progress", es: "Progreso global" },
  streak: { fr: "jours de suite", en: "day streak", es: "días seguidos" },
  studyTime: { fr: "Temps d'étude", en: "Study time", es: "Tiempo de estudio" },
  competencies: { fr: "Compétences (NCLC)", en: "Competencies (NCLC)", es: "Competencias (NCLC)" },
  hours: { fr: "h", en: "h", es: "h" },
  comingSoon: { fr: "Bientôt disponible", en: "Coming soon", es: "Próximamente" },
  sectionEmpty: { fr: "Cette section sera activée prochainement pour votre espace.", en: "This section will be enabled soon for your space.", es: "Esta sección se activará pronto en su espacio." },
  menu: { fr: "Menu de l'espace", en: "Dashboard menu", es: "Menú del espacio" },
};

export default function DashboardShell({ data = DEMO }: { data?: DashboardDemo }) {
  const { lang } = useLang();
  const l = toLocale(lang);
  const [active, setActive] = useState("accueil");
  const [mobileOpen, setMobileOpen] = useState(false);
  const section = findSection(active);
  const t = (k: string) => tr(UI[k], l);

  const NavList = (
    <nav aria-label={t("menu")} className="flex flex-col gap-1">
      {DASHBOARD_SECTIONS.map((s, i) => {
        const isActive = s.id === active;
        const divider = i > 0 && DASHBOARD_SECTIONS[i - 1].group !== s.group;
        return (
          <div key={s.id}>
            {divider && <div className="my-2 border-t border-white/8" />}
            <button
              onClick={() => { setActive(s.id); setMobileOpen(false); }}
              aria-current={isActive ? "page" : undefined}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] text-[14px] transition-colors text-left ${isActive ? "bg-gold/15 text-gold font-semibold" : "text-white/65 hover:bg-white/5 hover:text-white"}`}
            >
              <span aria-hidden="true" className="text-[16px]">{s.icon}</span>
              {tr(s.label, l)}
            </button>
          </div>
        );
      })}
    </nav>
  );

  return (
    <div className="bg-off-white min-h-screen pt-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[260px_1fr] gap-6 pb-16">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="bg-navy rounded-[20px] p-4 sticky top-24">{NavList}</div>
        </aside>

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="dash-mobile-nav"
            className="w-full flex items-center justify-between bg-navy text-white rounded-[14px] px-5 py-3.5"
          >
            <span className="flex items-center gap-2 font-semibold"><span aria-hidden="true">{section.icon}</span>{tr(section.label, l)}</span>
            <span aria-hidden="true">{mobileOpen ? "✕" : "☰"}</span>
          </button>
          {mobileOpen && <div id="dash-mobile-nav" className="bg-navy rounded-[16px] p-3 mt-2">{NavList}</div>}
        </div>

        {/* Content */}
        <main id="main" className="min-w-0">
          <h1 className="font-[family-name:var(--font-heading)] text-[26px] text-navy mb-1 flex items-center gap-2">
            <span aria-hidden="true">{section.icon}</span>{tr(section.label, l)}
          </h1>

          {active === "accueil" ? (
            <div className="ds-animate-fade-up">
              <p className="text-muted text-[15px] mb-6">{t("welcome")}, <strong className="text-navy">{data.displayName}</strong> 👋</p>

              {data.continueCourse && (
                <Card className="p-6 mb-6" tone="light">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <Badge variant="gold">{t("continueLearning")}</Badge>
                      <h2 className="font-[family-name:var(--font-heading)] text-[20px] text-navy mt-2">{data.continueCourse.title}</h2>
                      <p className="text-[13.5px] text-muted mb-3">{data.continueCourse.moduleTitle}</p>
                      <ProgressBar value={data.continueCourse.percent} />
                    </div>
                    <Button href={data.continueCourse.href} variant="primary" size="md">{t("resume")}</Button>
                  </div>
                </Card>
              )}

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <Card className="p-5"><div className="text-[12.5px] text-muted mb-1">{t("overall")}</div><div className="font-[family-name:var(--font-heading)] text-[28px] text-navy">{data.overallPercent}%</div></Card>
                <Card className="p-5"><div className="text-[12.5px] text-muted mb-1">🔥 {data.streakDays} {t("streak")}</div><div className="font-[family-name:var(--font-heading)] text-[28px] text-navy">{data.streakDays}</div></Card>
                <Card className="p-5"><div className="text-[12.5px] text-muted mb-1">{t("studyTime")}</div><div className="font-[family-name:var(--font-heading)] text-[28px] text-navy">{Math.round(data.studyMinutes / 60)}{t("hours")}</div></Card>
              </div>

              <Card className="p-6">
                <h2 className="font-[family-name:var(--font-heading)] text-[18px] text-navy mb-4">{t("competencies")}</h2>
                <div className="flex flex-col gap-4">
                  {data.competencies.map((c) => (
                    <ProgressBar key={c.code} value={c.percent} label={`${c.code} · ${c.label}`} />
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-4 ds-animate-fade-up">
              <EmptyState icon={section.icon} title={t("comingSoon")} body={t("sectionEmpty")} />
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
