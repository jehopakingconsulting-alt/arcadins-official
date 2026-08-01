import type { BankQuestion } from "@/lib/academic/types";

/**
 * Vue PUBLIQUE d'une question : tout ce qui peut être envoyé au client d'un étudiant
 * AVANT soumission. La bonne réponse (`correct`) et la justification (`explanation`)
 * sont retirées — la correction se fait côté serveur.
 */
export interface PublicQuestion {
  id: string;
  module: number;
  week: number;
  objectiveRef: string;
  difficulty: BankQuestion["difficulty"];
  type: BankQuestion["type"];
  prompt: string;
  options: string[];
  tags: string[];
}

/** Retire `correct`, `explanation` et `feedbackOnError` d'une question. */
export function toPublicQuestion(q: BankQuestion): PublicQuestion {
  return {
    id: q.id,
    module: q.module,
    week: q.week,
    objectiveRef: q.objectiveRef,
    difficulty: q.difficulty,
    type: q.type,
    prompt: q.prompt,
    options: q.options,
    tags: q.tags,
  };
}

export function toPublicQuestions(questions: BankQuestion[]): PublicQuestion[] {
  return questions.map(toPublicQuestion);
}
