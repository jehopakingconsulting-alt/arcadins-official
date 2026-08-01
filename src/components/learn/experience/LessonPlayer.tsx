"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button, ProgressBar, Badge } from "@/components/ui/ds";
import LessonBlock from "./LessonBlock";
import type { LessonPlayerModel, LessonResource } from "@/lib/lesson-runtime/types";
import type { Locale } from "@/lib/program-presentation/types";
import { tr } from "@/lib/program-presentation/types";

/**
 * LessonPlayer — lecteur de leçon UNIVERSEL & GÉNÉRIQUE. Layout : liste des leçons
 * (sidebar) · contenu piloté par métadonnées · ressources/notes · progression · leçon
 * suivante. Mobile : navigation basse collante + reprise. i18n FR/EN/ES, accessible
 * (landmarks, aria, clavier, focus), reduced-motion via CSS. Réutilisé par tout produit.
 * Aucune logique métier dupliquée : consomme le modèle de présentation (projection).
 */
function toLocale(lang: string): Locale {
  return lang === "en" ? "en" : lang === "es" ? "es" : "fr";
}
const RES_ICON: Record<string, string> = { pdf: "📄", download: "⬇️", link: "🔗", video: "🎬", audio: "🎧" };

const T: Record<string, Record<Locale, string>> = {
  objectives: { fr: "Objectifs", en: "Objectives", es: "Objetivos" },
  lessons: { fr: "Leçons du module", en: "Module lessons", es: "Lecciones del módulo" },
  resources: { fr: "Ressources", en: "Resources", es: "Recursos" },
  notes: { fr: "Notes", en: "Notes", es: "Notas" },
  notePlaceholder: { fr: "Prenez des notes…", en: "Take notes…", es: "Tome notas…" },
  markDone: { fr: "Marquer comme terminé", en: "Mark complete", es: "Marcar completado" },
  prev: { fr: "Précédent", en: "Previous", es: "Anterior" },
  next: { fr: "Leçon suivante", en: "Next lesson", es: "Siguiente lección" },
  resume: { fr: "Reprendre", en: "Resume", es: "Reanudar" },
  progress: { fr: "Progression du cours", en: "Course progress", es: "Progreso del curso" },
  locked: { fr: "Verrouillé", en: "Locked", es: "Bloqueado" },
};

function ResourceRow({ r }: { r: LessonResource }) {
  return (
    <li>
      <a href={r.href ?? "#"} className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 hover:bg-gold/8 transition-colors" aria-disabled={!r.href || undefined}>
        <span aria-hidden="true" className="text-lg">{RES_ICON[r.kind] ?? "📎"}</span>
        <span className="text-[13.5px] text-navy">{r.label}</span>
      </a>
    </li>
  );
}

export default function LessonPlayer({ model }: { model: LessonPlayerModel }) {
  const { lang } = useLang();
  const l = toLocale(lang);
  const t = (k: string) => tr(T[k], l);
  const [tab, setTab] = useState<"resources" | "notes">("resources");
  const [note, setNote] = useState("");

  const SidePanel = (
    <div className="bg-white rounded-[16px] border border-gold/15 overflow-hidden">
      <div role="tablist" aria-label={t("resources") + " / " + t("notes")} className="flex border-b border-gold/12">
        {(["resources", "notes"] as const).map((k) => (
          <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`flex-1 px-4 py-3 text-[13px] font-semibold transition-colors ${tab === k ? "text-gold border-b-2 border-gold" : "text-muted hover:text-navy"}`}>
            {t(k)}
          </button>
        ))}
      </div>
      <div className="p-3">
        {tab === "resources" ? (
          <ul className="flex flex-col gap-0.5">{model.resources.map((r) => <ResourceRow key={r.id} r={r} />)}</ul>
        ) : (
          <label className="block">
            <span className="sr-only">{t("notes")}</span>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("notePlaceholder")} rows={8}
              className="w-full rounded-[10px] border border-navy/15 p-3 text-[13.5px] text-navy resize-y focus:outline-none focus-visible:outline-2 focus:border-gold" />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-off-white min-h-screen pt-24 pb-28 lg:pb-16">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[248px_1fr_280px] gap-6">
        {/* Sidebar — lesson list */}
        <aside className="hidden lg:block" aria-label={t("lessons")}>
          <div className="bg-white rounded-[16px] border border-gold/15 p-4 sticky top-24">
            <div className="text-[11px] font-bold uppercase tracking-[2px] text-gold mb-3">{t("lessons")}</div>
            <ol className="flex flex-col gap-1">
              {model.moduleLessons.map((ln) => (
                <li key={ln.id}>
                  <a href="#" aria-current={ln.current ? "page" : undefined} aria-disabled={ln.locked || undefined}
                    className={`flex items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-[13.5px] transition-colors ${ln.current ? "bg-gold/12 text-navy font-semibold" : ln.locked ? "text-muted/60 pointer-events-none" : "text-body hover:bg-navy/5"}`}>
                    <span aria-hidden="true" className="shrink-0">{ln.completed ? "✅" : ln.locked ? "🔒" : ln.current ? "▶️" : "⚪"}</span>
                    <span className="truncate">{ln.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            <div className="mt-4 pt-4 border-t border-navy/8"><ProgressBar value={model.progressPercent} label={t("progress")} /></div>
          </div>
        </aside>

        {/* Lesson body */}
        <main id="main" className="min-w-0">
          <div className="mb-2 text-[12.5px] font-semibold text-gold uppercase tracking-wide">{model.moduleTitle}</div>
          <h1 className="font-[family-name:var(--font-heading)] text-[clamp(1.6rem,3.5vw,2rem)] text-navy mb-3">{model.title}</h1>
          <div className="flex flex-wrap gap-2 mb-5">{model.competencies.map((c) => <Badge key={c.code} variant="neutral">{c.code} · {tr(c.label, l)}</Badge>)}</div>

          <section aria-labelledby="obj-h" className="mb-6 rounded-[14px] bg-navy text-white/85 p-5">
            <h2 id="obj-h" className="text-[12px] font-bold uppercase tracking-[2px] text-gold mb-2">{t("objectives")}</h2>
            <ul className="flex flex-col gap-1.5">
              {model.objectives.map((o, i) => <li key={i} className="flex items-start gap-2 text-[14px] leading-[1.6]"><span className="text-gold shrink-0" aria-hidden="true">✓</span>{o}</li>)}
            </ul>
          </section>

          <article className="max-w-[720px]">
            {model.blocks.map((b) => <LessonBlock key={b.id} block={b} />)}
          </article>

          {/* Desktop prev/next */}
          <div className="hidden lg:flex items-center justify-between mt-10 pt-6 border-t border-navy/10">
            <Button href="#" variant="ghost" size="md" aria-disabled={!model.previousLessonId || undefined}>← {t("prev")}</Button>
            <Button variant="secondary" size="md">{t("markDone")}</Button>
            <Button href="#" variant="primary" size="md" aria-disabled={!model.nextLessonId || undefined}>{t("next")} →</Button>
          </div>

          {/* Resources/notes on mobile (below content) */}
          <div className="lg:hidden mt-8">{SidePanel}</div>
        </main>

        {/* Right panel — resources / notes (desktop) */}
        <aside className="hidden lg:block"><div className="sticky top-24">{SidePanel}</div></aside>
      </div>

      {/* Mobile bottom navigation (sticky continue) */}
      <nav aria-label={t("lessons")} className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-navy border-t border-gold/20 px-4 py-3 flex items-center gap-3">
        <a href="#" aria-label={t("prev")} className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-gold bg-white/8 ${!model.previousLessonId ? "opacity-40 pointer-events-none" : ""}`}>←</a>
        <div className="flex-1 min-w-0"><ProgressBar value={model.progressPercent} tone="navy" /></div>
        <a href="#" className="shrink-0 bg-gold text-navy font-bold text-[13.5px] px-5 py-2.5 rounded-full">{t("resume")} →</a>
      </nav>
    </div>
  );
}
