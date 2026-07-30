/**
 * Runtime — Learning Player : DeepSpecs & validation (Sprint C).
 */
import type { MediaAdapters } from "./media.ts";
import type { LessonView, PlayerIssue, PlayerValidationReport } from "./types.ts";

/** Spécification vivante du Player (couverte par les tests). */
export const PLAYER_DEEP_SPECS: { id: string; description: string }[] = [
  { id: "PL1", description: "Le Player consomme le Runtime (A) et la Persistence (B) ; aucune logique métier dupliquée." },
  { id: "PL2", description: "Les lecteurs PDF/Vidéo/Audio et le gestionnaire de téléchargements sont INJECTABLES (interfaces)." },
  { id: "PL3", description: "Aucune dépendance à une librairie spécifique ; défauts « no-op » sûrs (aucun téléchargement réel)." },
  { id: "PL4", description: "Le renderer transforme le contenu en blocs ; il ne divulgue AUCUNE bonne réponse (quiz seulement référencé)." },
  { id: "PL5", description: "Ouvrir une leçon verrouillée est refusé ; naviguer saute les leçons inaccessibles." },
  { id: "PL6", description: "« Continuer où j'étais » ouvre la dernière leçon consultée accessible." },
  { id: "PL7", description: "« Marquer terminé » n'est possible que sur une leçon accessible et délègue au Runtime." },
  { id: "PL8", description: "Le heartbeat accumule le temps et dispatche STUDY_TIME par paliers ; le flush vide le reste au changement de leçon." },
  { id: "PL9", description: "Notes et favoris passent par des commandes (événements) dispatchées au store." },
  { id: "PL10", description: "L'autosave (optionnel) sauvegarde via la Persistence quand il est dû ; la révision s'incrémente." },
];

/** Vérifie qu'une vue de leçon ne fuit aucune bonne réponse et reste cohérente. */
export function validateLessonView(view: LessonView): PlayerValidationReport {
  const errors: PlayerIssue[] = [];
  const warnings: PlayerIssue[] = [];
  const err = (code: string, message: string) => errors.push({ level: "error", code, message });

  for (const b of view.blocks) {
    // Le seul bloc lié au quiz doit être une simple référence (id + nombre de questions).
    if (b.type === "quizRef" && ("correct" in b || "explanation" in b || "answers" in b)) {
      err("QUIZ_LEAK", "Un bloc quiz expose des données de correction (interdit).");
    }
  }
  for (const r of view.resources) if (!r.id) err("RESOURCE_ID", "Ressource sans identifiant.");
  for (const d of view.downloads) if (!d.src) err("DOWNLOAD_SRC", "Téléchargement sans source.");

  return { ok: errors.length === 0, errors, warnings };
}

/** Vérifie la cohérence des adaptateurs média injectés. */
export function validateMediaAdapters(media: MediaAdapters): PlayerValidationReport {
  const errors: PlayerIssue[] = [];
  const warnings: PlayerIssue[] = [];
  if (media.video && media.video.kind !== "video") errors.push({ level: "error", code: "VIDEO_KIND", message: "Adaptateur vidéo invalide." });
  if (media.audio && media.audio.kind !== "audio") errors.push({ level: "error", code: "AUDIO_KIND", message: "Adaptateur audio invalide." });
  return { ok: errors.length === 0, errors, warnings };
}
