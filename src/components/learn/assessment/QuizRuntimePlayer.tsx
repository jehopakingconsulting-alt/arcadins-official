"use client";
/**
 * Lecteur de quiz RUNTIME (Sprint K3A). Branche l'expérience étudiante sur le moteur d'évaluation réel du
 * Sprint F via `useQuizRuntime` + `QuizController`. Réutilise les composants sûrs du Sprint J
 * (QuestionRenderer / AssessmentNavigation / AssessmentSubmitDialog / AssessmentResult). Consomme UNIQUEMENT
 * des vues publiques : aucune bonne réponse, aucune correction, aucun score calculé côté React.
 */
import { useState } from "react";
import type { QuizControllerOptions } from "@/lib/runtime/ui/assessment/quiz-controller";
import { quizT } from "@/lib/runtime/ui/assessment/quiz-i18n";
import { useQuizRuntime } from "@/hooks/learn/useQuizRuntime";
import { QuestionRenderer } from "./QuestionRenderer";
import { AssessmentNavigation } from "./AssessmentNavigation";
import { AssessmentSubmitDialog } from "./AssessmentSubmitDialog";
import { AssessmentResult } from "./AssessmentResult";

export function QuizRuntimePlayer({ makeOptions }: { makeOptions: () => QuizControllerOptions }) {
  const quiz = useQuizRuntime(makeOptions);
  const [dialog, setDialog] = useState(false);
  const [answerValues, setAnswerValues] = useState<Record<string, unknown>>({});

  // ── ready : écran de démarrage ─────────────────────────────────────────
  if (quiz.phase === "ready" || !quiz.session) {
    return (
      <section id="quiz-runtime" aria-labelledby="quiz-title" className="mx-auto max-w-2xl space-y-6 p-1">
        <h1 id="quiz-title" className="text-xl font-bold text-[color:var(--color-navy)]">{quizT("quiz.title")}</h1>
        <button
          type="button"
          onClick={quiz.start}
          className="inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-gold)] px-5 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
        >
          {quizT("quiz.start")}
        </button>
      </section>
    );
  }

  // ── submitted : résultat ───────────────────────────────────────────────
  if (quiz.phase === "submitted" && quiz.result) {
    return (
      <section id="quiz-runtime" className="mx-auto max-w-2xl space-y-4 p-1">
        <AssessmentResult model={quiz.result} />
        {quiz.result.retryAvailable && (
          <div className="mx-auto max-w-xl">
            <button
              type="button"
              onClick={quiz.retry}
              className="inline-flex min-h-11 items-center rounded-lg border border-[color:var(--border-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]"
            >
              {quizT("quiz.retry")}
            </button>
          </div>
        )}
        {quiz.retryReason && (
          <p role="status" className="mx-auto max-w-xl text-center text-sm text-amber-700">{quizT("quiz.retry_blocked")}</p>
        )}
      </section>
    );
  }

  // ── in_progress / submitting : lecture des questions ───────────────────
  const question = quiz.session.questions[quiz.index];
  const total = quiz.session.questions.length;
  const answered = Object.values(quiz.answers).filter(Boolean).length;

  if (!question) {
    return <p id="quiz-runtime" role="status" className="p-6 text-center text-sm text-[color:var(--color-body)]">{quizT("quiz.empty")}</p>;
  }

  return (
    <section id="quiz-runtime" aria-labelledby="quiz-title" aria-busy={quiz.phase === "submitting"} className="mx-auto max-w-2xl space-y-6 p-1">
      <h1 id="quiz-title" className="sr-only">{quizT("quiz.title")}</h1>
      <div className="rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
        <QuestionRenderer
          question={question}
          value={answerValues[question.questionId]}
          onChange={(v) => {
            setAnswerValues((a) => ({ ...a, [question.questionId]: v }));
            quiz.answer(question.questionId, v);
          }}
        />
      </div>
      <AssessmentNavigation
        index={quiz.index}
        total={total}
        answered={answered}
        onPrev={quiz.previous}
        onNext={quiz.next}
        onSubmit={() => setDialog(true)}
        canSubmit={answered > 0 && quiz.phase !== "submitting"}
      />
      <AssessmentSubmitDialog
        open={dialog}
        answered={answered}
        total={total}
        onCancel={() => setDialog(false)}
        onConfirm={() => { setDialog(false); quiz.submit(); }}
      />
    </section>
  );
}
