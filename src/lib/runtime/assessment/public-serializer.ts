/**
 * Runtime — Assessment : public-serializer (Sprint F).
 *
 * SÉCURITÉ ABSOLUE : convertit une PrivateQuestion en PublicQuestion en retirant TOUTE donnée de correction
 * (grading, réponses, explications privées). Même esprit que `toPublicQuestion` de la banque académique.
 */
import type { PrivateQuestion, PublicQuestion } from "./types.ts";

/** Champs strictement interdits dans un objet public. */
export const FORBIDDEN_PUBLIC_KEYS = [
  "grading",
  "correct",
  "correctOptionId",
  "correctOptionIds",
  "correctAnswer",
  "correctAnswers",
  "answerKey",
  "scoringKey",
  "privateExplanation",
  "explanation",
  "feedbackOnError",
  "hiddenRubric",
  "acceptedPatterns",
  "accepted",
] as const;

/** Sérialise une question privée en question publique (sans aucune réponse). */
export function toPublicQuestion(q: PrivateQuestion): PublicQuestion {
  return {
    id: q.id,
    version: q.version,
    type: q.type,
    difficulty: q.difficulty,
    prompt: q.prompt,
    options: q.options ? q.options.map((o) => ({ id: o.id, label: o.label })) : undefined,
    points: q.points,
    tags: q.tags ? [...q.tags] : undefined,
  };
}

export function toPublicQuestions(questions: PrivateQuestion[]): PublicQuestion[] {
  return questions.map(toPublicQuestion);
}

/** Vérifie qu'un objet ne contient AUCUNE clé interdite (défense en profondeur, testable). */
export function containsForbiddenKeys(value: unknown): boolean {
  const seen = new Set<unknown>();
  const walk = (v: unknown): boolean => {
    if (v === null || typeof v !== "object" || seen.has(v)) return false;
    seen.add(v);
    if (Array.isArray(v)) return v.some(walk);
    for (const k of Object.keys(v as Record<string, unknown>)) {
      if ((FORBIDDEN_PUBLIC_KEYS as readonly string[]).includes(k)) return true;
      if (walk((v as Record<string, unknown>)[k])) return true;
    }
    return false;
  };
  return walk(value);
}
