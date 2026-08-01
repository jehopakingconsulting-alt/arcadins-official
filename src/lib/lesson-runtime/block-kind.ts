/**
 * ARCADINS — Classification PURE des blocs de contenu (contrat métadonnées).
 * Regroupe les types de bloc en FAMILLES de rendu — base du dispatch du lecteur ET
 * de l'analytique (drop-off média vs texte). Déterministe, tolérant aux types inconnus
 * (SCORM/H5P/Live → 'unknown', jamais de crash). Imports RELATIFS (node-testable).
 */
export type BlockFamily = "text" | "list" | "media" | "table" | "code" | "interactive" | "callout" | "resource" | "unknown";

const MAP: Record<string, BlockFamily> = {
  heading: "text", paragraph: "text", summary: "text", quote: "text", reflection: "text",
  list: "list", checklist: "list",
  image: "media", video: "media", audio: "media", pdf: "media",
  table: "table",
  code: "code", formula: "code",
  interactiveActivity: "interactive",
  callout: "callout", keyTakeaway: "callout", definition: "callout", warning: "callout", example: "callout", caseStudy: "callout",
  resource: "resource", assignment: "resource",
};

/** Famille de rendu d'un type de bloc (fallback 'unknown' pour tout type futur). */
export function blockRenderKind(type: string): BlockFamily {
  return MAP[type] ?? "unknown";
}

/** Un bloc média nécessite-t-il un lecteur (télémétrie temps de lecture) ? */
export function isMediaBlock(type: string): boolean {
  return blockRenderKind(type) === "media";
}

/** Position de reprise sûre : bornée à l'index des blocs. Déterministe. */
export function clampResumeIndex(resumeIndex: number, blockCount: number): number {
  if (!Number.isFinite(resumeIndex) || resumeIndex < 0) return 0;
  return Math.min(Math.floor(resumeIndex), Math.max(0, blockCount - 1));
}
