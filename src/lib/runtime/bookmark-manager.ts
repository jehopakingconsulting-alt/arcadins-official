/**
 * Runtime étudiant — BookmarkManager (Sprint A).
 *
 * Gestion PURE des favoris et de l'historique. Renvoie une nouvelle liste immuable.
 */
import type { Bookmark } from "./types.ts";

export const BookmarkManager = {
  /** Un favori/historique existe-t-il pour cette leçon ? */
  has(bookmarks: Bookmark[], lessonRef: string, kind: Bookmark["kind"]): boolean {
    return bookmarks.some((b) => b.lessonRef === lessonRef && b.kind === kind);
  },

  /** Active/désactive un favori ou une entrée d'historique. */
  toggle(bookmarks: Bookmark[], lessonRef: string, kind: Bookmark["kind"], on: boolean, at: string): Bookmark[] {
    const without = bookmarks.filter((b) => !(b.lessonRef === lessonRef && b.kind === kind));
    return on ? [...without, { lessonRef, kind, at }] : without;
  },

  /** Ajoute (ou remonte) une entrée d'historique — la plus récente en dernier. */
  pushHistory(bookmarks: Bookmark[], lessonRef: string, at: string): Bookmark[] {
    return BookmarkManager.toggle(bookmarks, lessonRef, "history", true, at);
  },

  /** Liste des favoris (lessonRefs), dans l'ordre d'ajout. */
  favorites(bookmarks: Bookmark[]): string[] {
    return bookmarks.filter((b) => b.kind === "favorite").map((b) => b.lessonRef);
  },

  /** Historique le plus récent en premier. */
  history(bookmarks: Bookmark[]): Bookmark[] {
    return bookmarks
      .filter((b) => b.kind === "history")
      .slice()
      .sort((a, b) => (a.at > b.at ? -1 : a.at < b.at ? 1 : 0));
  },
};
