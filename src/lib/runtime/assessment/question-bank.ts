/**
 * Runtime — Assessment : QuestionBank (Sprint F).
 *
 * Interface générique de banque de questions + implémentation en mémoire + adaptateur depuis la banque
 * académique (`BankQuestion`). Filtrage par programme/module/leçon/compétence/difficulté/type, exclusions,
 * contrôle d'unicité et distinction active/archivée/invalide.
 */
import type { BankQuestion } from "@/lib/academic/types";
import type { GradingRule, PrivateQuestion, QuestionDifficulty, QuestionType } from "./types.ts";

export interface QuestionFilter {
  programId?: string;
  moduleId?: string;
  lessonId?: string;
  competencyIds?: string[];
  difficulty?: QuestionDifficulty;
  type?: QuestionType;
  excludeIds?: string[];
  includeArchived?: boolean;
}

export interface QuestionBank {
  all(): PrivateQuestion[];
  find(filter: QuestionFilter): PrivateQuestion[];
  get(id: string): PrivateQuestion | undefined;
  /** Contrôle d'intégrité : identifiants uniques, statut, barème présent. */
  integrity(): { ok: boolean; issues: string[] };
}

/** Banque en mémoire (aucune I/O). */
export class InMemoryQuestionBank implements QuestionBank {
  private items: PrivateQuestion[];
  constructor(items: PrivateQuestion[]) {
    this.items = items;
  }
  all(): PrivateQuestion[] {
    return this.items.filter((q) => q.status === "active");
  }
  find(filter: QuestionFilter): PrivateQuestion[] {
    const exclude = new Set(filter.excludeIds ?? []);
    return this.items.filter((q) => {
      if (!filter.includeArchived && q.status !== "active") return false;
      if (filter.includeArchived && q.status === "invalid") return false;
      if (exclude.has(q.id)) return false;
      if (filter.moduleId && q.moduleId !== filter.moduleId) return false;
      if (filter.lessonId && q.lessonId !== filter.lessonId) return false;
      if (filter.difficulty && q.difficulty !== filter.difficulty) return false;
      if (filter.type && q.type !== filter.type) return false;
      if (filter.competencyIds && filter.competencyIds.length > 0 && !(q.competencyId && filter.competencyIds.includes(q.competencyId)))
        return false;
      return true;
    });
  }
  get(id: string): PrivateQuestion | undefined {
    return this.items.find((q) => q.id === id);
  }
  integrity(): { ok: boolean; issues: string[] } {
    const issues: string[] = [];
    const ids = new Set<string>();
    for (const q of this.items) {
      if (ids.has(q.id)) issues.push(`Identifiant dupliqué : ${q.id}`);
      ids.add(q.id);
      if (q.points <= 0 && q.grading.kind !== "manual") issues.push(`${q.id} : points invalides`);
      if (!q.grading) issues.push(`${q.id} : barème manquant`);
    }
    return { ok: issues.length === 0, issues };
  }
}

/** Convertit une question de la banque académique en question privée du moteur (générique). */
export function fromBankQuestion(q: BankQuestion, opts: { moduleId?: string; lessonId?: string; points?: number } = {}): PrivateQuestion {
  const options = q.options.map((label, i) => ({ id: `o${i}`, label }));
  const type = mapType(q.type);
  return {
    id: q.id,
    version: 1,
    type,
    difficulty: q.difficulty,
    prompt: q.prompt,
    options,
    points: opts.points ?? 1,
    grading: mapGrading(type, q.correct),
    competencyId: q.objectiveRef,
    moduleId: opts.moduleId ?? String(q.module),
    lessonId: opts.lessonId,
    tags: q.tags,
    status: q.editorialStatus === "approved" ? "active" : "archived",
    privateExplanation: q.explanation,
    feedbackOnError: q.feedbackOnError,
  };
}

export function fromBankQuestions(bank: BankQuestion[]): PrivateQuestion[] {
  return bank.map((q) => fromBankQuestion(q));
}

function mapType(t: BankQuestion["type"]): QuestionType {
  switch (t) {
    case "multi":
      return "multiple";
    case "truefalse":
      return "true_false";
    case "ranking":
      return "ordering";
    case "association":
      return "matching";
    default:
      return "single"; // mcq, scenario, calc, interpret, analysis
  }
}

function mapGrading(type: QuestionType, correct: number[]): GradingRule {
  if (type === "multiple") return { kind: "multiple", correctOptionIds: correct.map((i) => `o${i}`), partial: true };
  if (type === "true_false") return { kind: "boolean", correct: correct[0] === 0 };
  if (type === "ordering") return { kind: "ordering", order: correct.map((i) => `o${i}`), partial: true };
  if (type === "matching") return { kind: "matching", pairs: correct.map((i) => [`o${i}`, `o${i}`] as [string, string]), partial: true };
  return { kind: "single", correctOptionId: `o${correct[0]}` };
}
