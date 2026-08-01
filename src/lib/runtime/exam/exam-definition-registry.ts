/**
 * Runtime — Exam : ExamDefinitionRegistry (Sprint G).
 *
 * Registre en mémoire des définitions d'examen VERSIONNÉES (aucune I/O, aucune base). Permet de retrouver
 * une définition par (examId, version) et de résoudre la version active à une date donnée. Une session doit
 * TOUJOURS figer la version exacte utilisée — une modification future ne change jamais une tentative passée.
 */
import type { FinalExamDefinition, FinalExamVersion } from "./types.ts";

function versionKey(v: FinalExamVersion): string {
  return [v.examVersion, v.questionsVersion, v.bankVersion, v.rubricsVersion, v.gradingVersion, v.eligibilityVersion, v.navigationVersion, v.accommodationVersion, v.passThresholdVersion].join(".");
}

export class ExamDefinitionRegistry {
  private byExam: Map<string, FinalExamDefinition[]>;
  constructor(definitions: FinalExamDefinition[] = []) {
    this.byExam = new Map();
    for (const def of definitions) this.register(def);
  }

  register(def: FinalExamDefinition): void {
    const list = this.byExam.get(def.examId) ?? [];
    const key = versionKey(def.version);
    const existingIdx = list.findIndex((d) => versionKey(d.version) === key);
    // Copie profonde figée : le registre ne partage pas de référence mutable avec l'appelant.
    const frozen = structuredClone(def);
    if (existingIdx >= 0) list[existingIdx] = frozen;
    else list.push(frozen);
    this.byExam.set(def.examId, list);
  }

  /** Retourne une définition figée pour la version demandée (copie profonde). */
  get(examId: string, version: FinalExamVersion): FinalExamDefinition | undefined {
    const list = this.byExam.get(examId);
    if (!list) return undefined;
    const key = versionKey(version);
    const found = list.find((d) => versionKey(d.version) === key);
    return found ? structuredClone(found) : undefined;
  }

  /** Version active de l'examen à la date `at` (status active + fenêtre activated/retired). */
  resolveActive(examId: string, at: Date): FinalExamDefinition | undefined {
    const list = this.byExam.get(examId);
    if (!list) return undefined;
    const atMs = at.getTime();
    const candidates = list.filter((d) => {
      if (d.status !== "active") return false;
      if (d.activatedAt && new Date(d.activatedAt).getTime() > atMs) return false;
      if (d.retiredAt && new Date(d.retiredAt).getTime() <= atMs) return false;
      return true;
    });
    if (candidates.length === 0) return undefined;
    // La plus récente (examVersion la plus élevée) fait foi.
    const latest = candidates.reduce((a, b) => (b.version.examVersion > a.version.examVersion ? b : a));
    return structuredClone(latest);
  }

  all(examId: string): FinalExamDefinition[] {
    return (this.byExam.get(examId) ?? []).map((d) => structuredClone(d));
  }
}

export { versionKey };
