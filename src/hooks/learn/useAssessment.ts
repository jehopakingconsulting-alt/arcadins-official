"use client";
/**
 * Hook — quiz formatif (Sprint J). Charge un AssessmentViewModel PUBLIC (sans barème) et suit les réponses
 * LOCALES de l'élève. La correction et le score restent SERVEUR : ce hook ne calcule aucun résultat officiel.
 */
import { useEffect, useState, useCallback } from "react";
import type { DataResult } from "@/lib/runtime/ui/types";
import type { AssessmentViewModel } from "@/lib/runtime/ui/view-models";
import type { AssessmentProvider } from "@/lib/runtime/ui/providers";

export function useAssessment(provider: AssessmentProvider, assessmentId: string) {
  const [result, setResult] = useState<DataResult<AssessmentViewModel>>({ state: "loading", data: null, demo: true });
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    provider.getAttempt(assessmentId).then((r) => alive && setResult(r)).catch(() => alive && setResult({ state: "error", data: null, demo: true, errorCode: "LOAD_FAILED" }));
    return () => { alive = false; };
  }, [provider, assessmentId]);

  const setAnswer = useCallback((questionId: string, value: unknown) => setAnswers((a) => ({ ...a, [questionId]: value })), []);
  const total = result.data?.questions.length ?? 0;
  return { result, answers, setAnswer, index, setIndex, total, answeredCount: Object.keys(answers).length };
}
