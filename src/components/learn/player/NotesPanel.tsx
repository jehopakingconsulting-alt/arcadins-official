"use client";
import { useState } from "react";
import type { NoteViewModel } from "@/lib/runtime/ui/view-models";
import { EmptyState } from "@/components/learn/EmptyState";

/**
 * Panneau de notes (Sprint J). En preview, purement local (repository mémoire simulé). Édition/suppression
 * simulées, aucune écriture réelle. Recherche/filtrage inclus.
 */
export function NotesPanel({ initialNotes, lessonId }: { initialNotes: NoteViewModel[]; lessonId: string }) {
  const [notes, setNotes] = useState<NoteViewModel[]>(initialNotes);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");

  const add = () => {
    if (!draft.trim()) return;
    setNotes((n) => [{ id: `local-${n.length + 1}`, lessonId, body: draft.trim(), updatedAt: "2026-12-01T09:00:00Z" }, ...n]);
    setDraft("");
  };
  const remove = (id: string) => setNotes((n) => n.filter((x) => x.id !== id));
  const filtered = notes.filter((n) => n.body.toLowerCase().includes(query.toLowerCase()));

  return (
    <section aria-labelledby="notes-title">
      <h2 id="notes-title" className="text-sm font-semibold text-[color:var(--color-navy)]">Mes notes</h2>
      <div className="mt-2 space-y-2">
        <label className="block">
          <span className="sr-only">Nouvelle note</span>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={2} placeholder="Écrire une note…" className="w-full rounded-lg border border-[color:var(--border-gold)] p-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]" />
        </label>
        <button type="button" onClick={add} className="inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-navy)] px-3 py-2 text-sm font-semibold text-[color:var(--color-off-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">Ajouter (démo)</button>
        <label className="block">
          <span className="sr-only">Rechercher dans les notes</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher…" className="w-full rounded-lg border border-[color:var(--border-gold)] p-2 text-sm" />
        </label>
      </div>
      {filtered.length === 0 ? (
        <div className="mt-3"><EmptyState title="Aucune note" /></div>
      ) : (
        <ul className="mt-3 space-y-2">
          {filtered.map((n) => (
            <li key={n.id} className="flex items-start justify-between gap-2 rounded-lg border border-[color:var(--border-gold)] p-2 text-sm">
              <span className="text-[color:var(--color-body)]">{n.body}</span>
              <button type="button" onClick={() => remove(n.id)} aria-label="Supprimer la note (démo)" className="min-h-9 rounded px-2 text-xs text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">Suppr.</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
