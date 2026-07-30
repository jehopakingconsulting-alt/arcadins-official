/**
 * Runtime étudiant — NoteManager (Sprint A).
 *
 * Gestion PURE des notes personnelles (une note par leçon). Renvoie un nouveau dictionnaire immuable.
 */
import type { StudentNote } from "./types.ts";

export const NoteManager = {
  /** Enregistre (upsert) la note d'une leçon. Une note vide supprime l'entrée. */
  save(notes: Record<string, StudentNote>, lessonRef: string, body: string, at: string): Record<string, StudentNote> {
    const next = { ...notes };
    if (body.trim() === "") {
      delete next[lessonRef];
      return next;
    }
    next[lessonRef] = { lessonRef, body, updatedAt: at };
    return next;
  },

  /** Récupère la note d'une leçon (ou undefined). */
  get(notes: Record<string, StudentNote>, lessonRef: string): StudentNote | undefined {
    return notes[lessonRef];
  },

  /** Toutes les notes, les plus récentes en premier. */
  all(notes: Record<string, StudentNote>): StudentNote[] {
    return Object.values(notes).sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : a.updatedAt < b.updatedAt ? 1 : 0));
  },
};
