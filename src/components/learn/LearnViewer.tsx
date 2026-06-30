"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lesson } from "@/types/lesson";

interface Props {
  courseSlug: string;
  courseName: string;
  courseIcon: string;
  lessons: Lesson[];
  completedIndexes: number[];
}

export default function LearnViewer({ courseSlug, courseName, courseIcon, lessons, completedIndexes }: Props) {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set(completedIndexes));
  const [saving, setSaving] = useState(false);

  const lesson = lessons[active];
  const progressPct = lessons.length > 0 ? Math.round((completed.size / lessons.length) * 100) : 0;

  async function toggleComplete() {
    setSaving(true);
    const isCompleted = completed.has(active);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug, lessonIndex: active, completed: !isCompleted }),
      });
      setCompleted((prev) => {
        const next = new Set(prev);
        if (isCompleted) next.delete(active);
        else next.add(active);
        return next;
      });
    } finally {
      setSaving(false);
    }
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center pt-32">
        <div className="text-center text-white">
          <div className="text-5xl mb-4">📚</div>
          <p>Contenu en préparation pour cette formation.</p>
          <Link href={`/formations/${courseSlug}`} className="text-gold hover:underline mt-4 inline-block">
            ← Retour à la formation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-off-white min-h-screen pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-7">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="text-3xl">{courseIcon}</div>
          <div className="flex-1">
            <div className="text-[11px] font-bold tracking-[2px] uppercase text-gold">Espace de formation</div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl text-navy">{courseName}</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-muted hover:text-gold transition-all shrink-0">
            ← Mon tableau de bord
          </Link>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-gold/15 p-4 mb-6 flex items-center gap-4">
          <div className="flex-1 h-2.5 bg-off-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="text-sm font-semibold text-navy shrink-0">{progressPct}% complété</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar module list */}
          <div className="bg-white rounded-2xl border border-gold/15 p-3 h-fit lg:sticky lg:top-32">
            {lessons.map((l, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl transition-all mb-1 ${
                  active === i ? "bg-gold/12 text-navy" : "hover:bg-off-white text-body"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 ${
                  completed.has(i) ? "bg-gold text-navy" : active === i ? "bg-navy text-gold" : "bg-off-white text-muted"
                }`}>
                  {completed.has(i) ? "✓" : i + 1}
                </div>
                <span className="text-[13px] leading-[1.4] font-medium">{l.title}</span>
              </button>
            ))}
          </div>

          {/* Lesson content */}
          <div className="bg-white rounded-[28px] border border-gold/15 p-8 md:p-10">
            <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-2">
              Module {active + 1} / {lessons.length}
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-navy mb-6">
              {lesson.title}
            </h2>

            <div className="bg-off-white rounded-xl p-5 mb-6">
              <div className="text-xs font-bold tracking-[1px] uppercase text-gold mb-3">Objectifs d&apos;apprentissage</div>
              <ul className="space-y-1.5">
                {lesson.objectives.map((o, i) => (
                  <li key={i} className="text-[14px] text-body flex items-start gap-2">
                    <span className="text-gold shrink-0">→</span>{o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 mb-6">
              {lesson.content.map((p, i) => (
                <p key={i} className="text-[15px] text-body leading-[1.8]">{p}</p>
              ))}
            </div>

            <div className="bg-gold/8 border border-gold/20 rounded-xl p-5 mb-6">
              <div className="text-xs font-bold tracking-[1px] uppercase text-gold mb-3">Points clés à retenir</div>
              <ul className="space-y-1.5">
                {lesson.keyTakeaways.map((k, i) => (
                  <li key={i} className="text-[14px] text-navy font-medium flex items-start gap-2">
                    <span className="text-gold shrink-0">✓</span>{k}
                  </li>
                ))}
              </ul>
            </div>

            {lesson.resources.length > 0 && (
              <div className="mb-8">
                <div className="text-xs font-bold tracking-[1px] uppercase text-muted mb-3">Ressources complémentaires</div>
                <div className="flex flex-col gap-2">
                  {lesson.resources.map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-navy hover:text-gold transition-all inline-flex items-center gap-2">
                      🔗 {r.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation + complete */}
            <div className="flex items-center justify-between gap-3 pt-6 border-t border-off-white flex-wrap">
              <button
                onClick={() => setActive(Math.max(0, active - 1))}
                disabled={active === 0}
                className="text-sm font-semibold text-navy disabled:opacity-30 hover:text-gold transition-all"
              >
                ← Module précédent
              </button>

              <button
                onClick={toggleComplete}
                disabled={saving}
                className={`px-6 py-3 rounded-[10px] font-bold text-sm transition-all ${
                  completed.has(active) ? "bg-off-white text-navy border border-gold/30" : "bg-gold text-navy hover:bg-gold-light"
                }`}
              >
                {completed.has(active) ? "✓ Module complété" : "Marquer comme complété"}
              </button>

              <button
                onClick={() => setActive(Math.min(lessons.length - 1, active + 1))}
                disabled={active === lessons.length - 1}
                className="text-sm font-semibold text-navy disabled:opacity-30 hover:text-gold transition-all"
              >
                Module suivant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
