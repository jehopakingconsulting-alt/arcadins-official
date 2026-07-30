"use client";
import { useState } from "react";
import type { AssessmentResultViewModel, AssessmentViewModel } from "@/lib/runtime/ui/view-models";
import { QuestionRenderer } from "./QuestionRenderer";
import { AssessmentNavigation } from "./AssessmentNavigation";
import { AssessmentSubmitDialog } from "./AssessmentSubmitDialog";
import { AssessmentResult } from "./AssessmentResult";

/**
 * Lecteur de quiz formatif (Sprint J). Suit les réponses LOCALES ; la soumission déclenche une correction
 * SERVEUR (simulée en preview via un résultat fourni). Aucune bonne réponse n'est présente dans ce composant.
 */
export function AssessmentPlayer({ model, demoResult }: { model: AssessmentViewModel; demoResult: AssessmentResultViewModel }) {
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState(false);
  const [result, setResult] = useState<AssessmentResultViewModel | null>(null);

  if (result) return <AssessmentResult model={result} />;

  const question = model.questions[index];
  const answered = Object.keys(answers).length;

  return (
    <section aria-labelledby="assessment-player-title" className="mx-auto max-w-2xl space-y-6">
      <h1 id="assessment-player-title" className="sr-only">Quiz formatif</h1>
      <div className="rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
        <QuestionRenderer question={question} value={answers[question.questionId]} onChange={(v) => setAnswers((a) => ({ ...a, [question.questionId]: v }))} />
      </div>
      <AssessmentNavigation
        index={index}
        total={model.questions.length}
        answered={answered}
        onPrev={() => setIndex((i) => Math.max(0, i - 1))}
        onNext={() => setIndex((i) => Math.min(model.questions.length - 1, i + 1))}
        onSubmit={() => setDialog(true)}
        canSubmit={answered > 0}
      />
      <AssessmentSubmitDialog
        open={dialog}
        answered={answered}
        total={model.questions.length}
        onCancel={() => setDialog(false)}
        onConfirm={() => { setDialog(false); setResult(demoResult); /* résultat CORRIGÉ SERVEUR (simulé en démo) */ }}
      />
    </section>
  );
}
