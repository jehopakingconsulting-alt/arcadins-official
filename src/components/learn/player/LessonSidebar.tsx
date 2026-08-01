"use client";
import { useState } from "react";
import type { BookmarkViewModel, LessonPlayerViewModel, NoteViewModel } from "@/lib/runtime/ui/view-models";
import { ResourcesPanel } from "./ResourcesPanel";
import { NotesPanel } from "./NotesPanel";
import { BookmarksPanel } from "./BookmarksPanel";

type Tab = "toc" | "resources" | "notes" | "bookmarks";

/** Barre latérale du lecteur (table des matières, ressources, notes, favoris) (Sprint J). */
export function LessonSidebar({ model, notes, bookmarks, onOpenLesson }: { model: LessonPlayerViewModel; notes: NoteViewModel[]; bookmarks: BookmarkViewModel[]; onOpenLesson?: (id: string) => void }) {
  const [tab, setTab] = useState<Tab>("toc");
  const tabs: { id: Tab; label: string }[] = [
    { id: "toc", label: "Sommaire" },
    { id: "resources", label: "Ressources" },
    { id: "notes", label: "Notes" },
    { id: "bookmarks", label: "Favoris" },
  ];
  return (
    <aside className="rounded-xl border border-[color:var(--border-gold)] bg-white p-4">
      <div role="tablist" aria-label="Panneaux de la leçon" className="flex flex-wrap gap-1">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} type="button" onClick={() => setTab(t.id)}
            className={`min-h-9 rounded px-3 py-1 text-xs font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] ${tab === t.id ? "bg-[color:var(--color-navy)] text-[color:var(--color-off-white)]" : "text-[#5a6a82]"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-4">
        {tab === "toc" && (
          <nav aria-label="Table des matières">
            <ol className="space-y-1 text-sm text-[color:var(--color-body)]">
              {model.blocks.filter((b) => b.type === "heading").map((b) => <li key={b.id}>{b.heading ?? b.text}</li>)}
            </ol>
          </nav>
        )}
        {tab === "resources" && <ResourcesPanel resources={model.resources} />}
        {tab === "notes" && <NotesPanel initialNotes={notes} lessonId={model.lessonId} />}
        {tab === "bookmarks" && <BookmarksPanel bookmarks={bookmarks} onOpen={onOpenLesson} />}
      </div>
    </aside>
  );
}
