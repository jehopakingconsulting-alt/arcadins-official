/**
 * Runtime — UI : garde de sécurité des view models (Sprint J).
 *
 * Vérifie qu'aucun view model / prop sérialisé ne contient de donnée privée : bonne réponse, barème, état privé,
 * secret, clé de service. C'est la preuve, à la source, qu'« aucune bonne réponse n'atteint le DOM » : les
 * composants ne rendent que des view models validés par cette garde.
 */
export const FORBIDDEN_UI_KEYS = [
  "correct",
  "correctAnswer",
  "correctAnswers",
  "correctOptionId",
  "correctOptionIds",
  "grading",
  "gradingRule",
  "answerKey",
  "scoringKey",
  "privateExplanation",
  "privateState",
  "privateStateJson",
  "secret",
  "privateKey",
  "serviceRoleKey",
  "signatureValue",
  "reviewerNotes",
  "privateReasonCode",
  "payloadHash",
] as const;

export function containsForbiddenUiKeys(value: unknown): boolean {
  const forbidden = new Set<string>(FORBIDDEN_UI_KEYS as readonly string[]);
  const seen = new Set<unknown>();
  const walk = (v: unknown): boolean => {
    if (v === null || typeof v !== "object" || seen.has(v)) return false;
    seen.add(v);
    if (Array.isArray(v)) return v.some(walk);
    for (const k of Object.keys(v as Record<string, unknown>)) {
      if (forbidden.has(k)) return true;
      if (walk((v as Record<string, unknown>)[k])) return true;
    }
    return false;
  };
  return walk(value);
}

export interface UiValidationReport {
  ok: boolean;
  issues: string[];
}

/** Valide un view model destiné au rendu React (aucune fuite de donnée privée). */
export function validateViewModel(vm: unknown): UiValidationReport {
  const issues: string[] = [];
  if (containsForbiddenUiKeys(vm)) issues.push("PRIVATE_KEY_LEAK");
  // Détection de valeurs suspectes évidentes (chaînes de clé/secret).
  const blob = safeStringify(vm);
  if (/BEGIN [A-Z ]*PRIVATE KEY/.test(blob)) issues.push("PRIVATE_KEY_MATERIAL");
  if (/service_role/i.test(blob)) issues.push("SERVICE_ROLE_REFERENCE");
  return { ok: issues.length === 0, issues };
}

/** Étiquette une réponse de données comme démonstration (jamais réelle en preview). */
export function assertDemoOnly<T>(result: { demo: boolean; data: T | null }): void {
  if (!result.demo) throw new Error("REAL_DATA_FORBIDDEN_IN_PREVIEW");
}

function safeStringify(v: unknown): string {
  try {
    return JSON.stringify(v) ?? "";
  } catch {
    return "";
  }
}
