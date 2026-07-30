"use client";
import { useState } from "react";
import type { BookmarkViewModel, LessonPlayerViewModel, NoteViewModel } from "@/lib/runtime/ui/view-models";
import { LessonHeader } from "./LessonHeader";
import { LessonProgress } from "./LessonProgress";
import { LessonRenderer } from "./LessonRenderer";
import { LessonControls } from "./LessonControls";
import { LessonSidebar } from "./LessonSidebar";

/**
 * Lecteur de leçon (Sprint J). Mode concentration + taille de texte + contraste renforcé. Aucun vrai
 * téléchargement, aucune écriture réelle. La complétion reste décidée par le serveur (via le view model).
 */
export function LessonPlayer({ model, notes, bookmarks, onNavigate }: { model: LessonPlayerViewModel; notes: NoteViewModel[]; bookmarks: BookmarkViewModel[]; onNavigate?: (lessonId: string) => void }) {
  const [focusMode, setFocusMode] = useState(false);
  const [large, setLarge] = useState(false);

  return (
    <div className={large ? "text-[1.075rem]" : ""}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button type="button" aria-pressed={focusMode} onClick={() => setFocusMode((v) => !v)} className="min-h-9 rounded-lg border border-[color:var(--border-gold)] px-3 py-1 text-xs font-medium text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">
          {focusMode ? "Quitter le mode concentration" : "Mode concentration"}
        </button>
        <button type="button" aria-pressed={large} onClick={() => setLarge((v) => !v)} className="min-h-9 rounded-lg border border-[color:var(--border-gold)] px-3 py-1 text-xs font-medium text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">
          Texte {large ? "normal" : "agrandi"}
        </button>
        <span className="ml-auto"><LessonProgress percent={model.progressPercent} /></span>
      </div>

      <div className={`grid gap-6 ${focusMode ? "" : "lg:grid-cols-[1fr_20rem]"}`}>
        <article className="rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
          <LessonHeader model={model} />
          <div className="mt-6"><LessonRenderer blocks={model.blocks} /></div>
          <div className="mt-6"><LessonControls model={model} onPrev={() => model.previousLessonId && onNavigate?.(model.previousLessonId)} onNext={() => model.nextLessonId && onNavigate?.(model.nextLessonId)} /></div>
        </article>
        {!focusMode && <LessonSidebar model={model} notes={notes} bookmarks={bookmarks} onOpenLesson={onNavigate} />}
      </div>
    </div>
  );
}
