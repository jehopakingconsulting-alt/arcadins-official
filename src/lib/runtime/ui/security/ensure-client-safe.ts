/**
 * Runtime — UI/Security : garde de FRONTIÈRE serveur → client (Sprint K3-S).
 *
 * Toute valeur qui traverse la frontière Server Component → Client Component (prop, seed, view model) est
 * sérialisée dans le RSC Flight Payload / HTML / __NEXT_DATA__. Cette garde vérifie, AVANT la frontière,
 * qu'aucune clé privée connue n'est présente (défense en profondeur), en évitant les faux positifs sur des
 * champs publics légitimes. Elle lève une erreur GÉNÉRIQUE qui ne recopie JAMAIS la valeur privée.
 *
 * PUR / node-testable. Imports RELATIFS uniquement.
 */

/** Clés strictement interdites côté client (liste blanche par exclusion précise). */
export const FORBIDDEN_CLIENT_KEYS: readonly string[] = [
  "answerKey",
  "answerKeys",
  "correctOptionId",
  "correctOptionIds",
  "correctAnswer",
  "correctAnswers",
  "privateExplanation",
  "privateFeedback",
  "feedbackOnError",
  "gradingRule",
  "gradingRules",
  "gradingVersion",
  "rubric",
  "rubricItems",
  "evaluatorNotes",
  "reviewerNotes",
  "manualReviewNotes",
  "internalDecisionReason",
  "privateScore",
  "privateScoreBreakdown",
  "antiFraudSignals",
  "integritySignals",
  "signer",
  "signingKey",
  "signingSecret",
  "checksumSecret",
  "certificatePrivateId",
  "privateQuestion",
  "privateQuestions",
  "bankQuestions",
  "questionBank",
  // Champ « correct » PRIVÉ des BankQuestion (index des bonnes réponses).
  "correct",
];

/**
 * Champs PUBLICS légitimes qui ne doivent JAMAIS être considérés comme interdits, même s'ils contiennent une
 * sous-chaîne proche. La détection se fait par égalité EXACTE de clé (insensible à la casse), pas par
 * sous-chaîne — cette liste documente les faux positifs volontairement autorisés.
 */
export const ALLOWED_PUBLIC_KEYS: readonly string[] = [
  "gradingStatus",
  "publicScore",
  "scorePercent",
  "percentage",
  "resultStatus",
  "progress",
  "correctCount", // agrégat public (nombre de bonnes réponses), jamais LA bonne réponse
  "reviewStatus",
  "certificateEligibility",
];

const FORBIDDEN_LOWER = new Set(FORBIDDEN_CLIENT_KEYS.map((k) => k.toLowerCase()));
const ALLOWED_LOWER = new Set(ALLOWED_PUBLIC_KEYS.map((k) => k.toLowerCase()));

const MAX_DEPTH = 64;

export interface ClientSafeReport {
  safe: boolean;
  /** Chemins (clés) fautifs — clés uniquement, jamais les valeurs privées. */
  offendingKeys: string[];
}

/** Analyse (sans lever) : renvoie les clés interdites rencontrées. Ne recopie aucune valeur. */
export function inspectClientSafe(value: unknown): ClientSafeReport {
  const offending = new Set<string>();
  const seen = new WeakSet<object>();

  const walk = (v: unknown, depth: number): void => {
    if (depth > MAX_DEPTH) throw new Error("CLIENT_SAFE_MAX_DEPTH_EXCEEDED");
    if (v === null || typeof v !== "object") return;
    if (seen.has(v as object)) return; // cycle : traité proprement, sans fuite
    seen.add(v as object);
    if (Array.isArray(v)) {
      for (const item of v) walk(item, depth + 1);
      return;
    }
    for (const key of Object.keys(v as Record<string, unknown>)) {
      const lower = key.toLowerCase();
      if (FORBIDDEN_LOWER.has(lower) && !ALLOWED_LOWER.has(lower)) offending.add(key);
      walk((v as Record<string, unknown>)[key], depth + 1);
    }
  };

  walk(value, 0);
  return { safe: offending.size === 0, offendingKeys: [...offending].sort() };
}

/**
 * Garantit qu'une valeur est sûre à transmettre à un composant client. Lève une erreur GÉNÉRIQUE (sans la
 * valeur) si une clé interdite est présente. Renvoie la valeur inchangée si elle est sûre.
 */
export function ensureClientSafePayload<T>(value: T, context = "payload"): T {
  const report = inspectClientSafe(value);
  if (!report.safe) {
    // N'expose JAMAIS la valeur : seulement les NOMS des clés fautives.
    throw new Error(`UNSAFE_CLIENT_${context.toUpperCase()}: forbidden keys [${report.offendingKeys.join(", ")}]`);
  }
  return value;
}
