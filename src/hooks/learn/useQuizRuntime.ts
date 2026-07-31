"use client";
/**
 * Hook React du quiz formatif (Sprint K3A).
 *
 * Enveloppe un `QuizController` (façade pure). La tentative PRIVÉE reste dans la clôture du contrôleur ;
 * React ne conserve que des vues PUBLIQUES (session sans réponses, résultat corrigé serveur) + des index
 * d'affichage LOCAUX. Aucune correction, aucun score, aucune règle de réussite calculés ici.
 */
import { useCallback, useMemo, useRef, useState } from "react";
import type { AssessmentViewModel } from "@/lib/runtime/ui/view-models";
import { createQuizController, type PublicQuizResult, type QuizController, type QuizControllerOptions, type QuizPhase } from "@/lib/runtime/ui/assessment/quiz-controller";

export interface UseQuizRuntime {
  phase: QuizPhase;
  session: AssessmentViewModel | null;
  result: PublicQuizResult | null;
  index: number;
  answers: Record<string, boolean>; // marque LOCALE « répondue » (jamais la valeur/bonne réponse)
  retryReason: string | null;
  start: () => void;
  answer: (questionId: string, value: unknown) => void;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  submit: () => void;
  retry: () => void;
}

export function useQuizRuntime(makeOptions: () => QuizControllerOptions): UseQuizRuntime {
  const controllerRef = useRef<QuizController | null>(null);
  if (controllerRef.current === null) controllerRef.current = createQuizController(makeOptions());
  const controller = controllerRef.current;

  const [phase, setPhase] = useState<QuizPhase>("ready");
  const [session, setSession] = useState<AssessmentViewModel | null>(null);
  const [result, setResult] = useState<PublicQuizResult | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [retryReason, setRetryReason] = useState<string | null>(null);

  const start = useCallback(() => {
    const s = controller.startQuiz();
    setSession(s);
    setResult(null);
    setIndex(0);
    setAnswers({});
    setRetryReason(null);
    setPhase("in_progress");
  }, [controller]);

  const answer = useCallback((questionId: string, value: unknown) => {
    const s = controller.selectAnswer(questionId, value);
    setSession(s);
    const answered = Array.isArray(value) ? value.length > 0 : value !== undefined && value !== "" && value !== null;
    setAnswers((a) => ({ ...a, [questionId]: answered }));
  }, [controller]);

  const total = session?.questions.length ?? 0;
  const goTo = useCallback((i: number) => setIndex(() => Math.min(Math.max(0, i), Math.max(0, total - 1))), [total]);
  const next = useCallback(() => setIndex((i) => Math.min(i + 1, Math.max(0, total - 1))), [total]);
  const previous = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  const submit = useCallback(() => {
    setPhase("submitting");
    const { session: s, result: r } = controller.submitQuiz();
    setSession(s);
    setResult(r);
    setPhase("submitted");
  }, [controller]);

  const retry = useCallback(() => {
    const outcome = controller.retryQuiz();
    if (outcome.ok) {
      setSession(outcome.session);
      setResult(null);
      setIndex(0);
      setAnswers({});
      setRetryReason(null);
      setPhase("in_progress");
    } else {
      setRetryReason(outcome.reasonCode);
    }
  }, [controller]);

  return useMemo(
    () => ({ phase, session, result, index, answers, retryReason, start, answer, goTo, next, previous, submit, retry }),
    [phase, session, result, index, answers, retryReason, start, answer, goTo, next, previous, submit, retry],
  );
}
