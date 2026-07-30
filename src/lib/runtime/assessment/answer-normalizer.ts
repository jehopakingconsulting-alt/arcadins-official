/**
 * Runtime — Assessment : AnswerNormalizer (Sprint F).
 *
 * Normalise les réponses selon leur type (espaces, doublons, formats, ordre non significatif, valeurs vides,
 * réponses mal formées). PUR. La comparaison sémantique (casse/accents) reste au GradingEngine.
 */
import type { NormalizedResponse, PrivateQuestion, StudentResponse } from "./types.ts";

export const AnswerNormalizer = {
  normalize(question: PrivateQuestion, response: StudentResponse | undefined): NormalizedResponse {
    const base = { questionId: question.id, type: question.type };
    const raw = response?.value;

    switch (question.type) {
      case "single":
      case "true_false": {
        const v = coerceString(raw);
        return { ...base, value: v, empty: v === "", malformed: raw != null && typeof raw !== "string" && typeof raw !== "boolean" };
      }
      case "short_answer":
      case "structured_text":
      case "file_reference": {
        const v = coerceString(raw).trim();
        return { ...base, value: v, empty: v === "", malformed: raw != null && typeof raw !== "string" };
      }
      case "numeric": {
        if (raw == null || raw === "") return { ...base, value: null, empty: true, malformed: false };
        const n = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
        return { ...base, value: Number.isNaN(n) ? null : n, empty: false, malformed: Number.isNaN(n) };
      }
      case "multiple": {
        if (!Array.isArray(raw)) return { ...base, value: [], empty: raw == null, malformed: raw != null && !Array.isArray(raw) };
        const arr = [...new Set(raw.map(coerceString).filter((s) => s !== ""))].sort();
        return { ...base, value: arr, empty: arr.length === 0, malformed: false };
      }
      case "ordering": {
        if (!Array.isArray(raw)) return { ...base, value: [], empty: raw == null, malformed: raw != null && !Array.isArray(raw) };
        const arr = raw.map(coerceString);
        return { ...base, value: arr, empty: arr.length === 0, malformed: arr.some((s) => s === "") };
      }
      case "matching": {
        if (!Array.isArray(raw)) return { ...base, value: [], empty: raw == null, malformed: raw != null && !Array.isArray(raw) };
        const pairs: [string, string][] = [];
        let malformed = false;
        for (const p of raw) {
          if (Array.isArray(p) && p.length === 2) pairs.push([coerceString(p[0]), coerceString(p[1])]);
          else malformed = true;
        }
        pairs.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
        return { ...base, value: pairs, empty: pairs.length === 0, malformed };
      }
      default:
        return { ...base, value: null, empty: true, malformed: true };
    }
  },
};

function coerceString(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "boolean") return v ? "true" : "false";
  return String(v);
}
