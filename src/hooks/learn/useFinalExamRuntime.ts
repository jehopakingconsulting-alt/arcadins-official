"use client";
/**
 * Hook React de l'examen final (Sprint K3B).
 *
 * Enveloppe un `ExamController` (façade pure). La tentative PRIVÉE reste dans la clôture du contrôleur ;
 * React ne conserve que des vues PUBLIQUES (admissibilité, session sans réponses, timer autoritaire, résultat
 * provisoire, décision finale). Aucune correction/score/réussite calculés ici. Le chronomètre affiché provient
 * du timer AUTORITAIRE recalculé par le moteur ; le tick ne fait que rafraîchir l'affichage et déclencher la
 * soumission automatique à expiration.
 */
import { useCallback, useMemo, useRef, useState } from "react";
import {
  createExamController,
  type ExamController,
  type ExamControllerOptions,
  type NavigationOutcome,
} from "@/lib/runtime/ui/exam/exam-controller";
import type {
  ExamEligibilityViewModel,
  ExamFinalDecisionViewModel,
  ExamProvisionalResultViewModel,
  ExamReviewStatusViewModel,
  ExamRuntimePhase,
  ExamSessionViewModel,
  ExamTimerViewModel,
} from "@/lib/runtime/ui/exam/exam-view-models";

export interface UseFinalExamRuntime {
  phase: ExamRuntimePhase;
  eligibility: ExamEligibilityViewModel | null;
  session: ExamSessionViewModel | null;
  timer: ExamTimerViewModel | null;
  result: ExamProvisionalResultViewModel | null;
  decision: ExamFinalDecisionViewModel | null;
  review: ExamReviewStatusViewModel | null;
  flagged: string[];
  currentSectionId: string | null;
  saveStatus: "idle" | "saved";
  navReason: string | null;
  acknowledged: boolean;
  setAcknowledged: (v: boolean) => void;
  answerValues: Record<string, unknown>;
  checkEligibility: () => void;
  start: () => void;
  answer: (questionId: string, value: unknown) => void;
  navigate: (sectionId: string) => void;
  flag: (questionId: string, on: boolean) => void;
  save: () => void;
  submit: () => void;
  finalize: () => void;
  tick: () => void;
}

export function useFinalExamRuntime(makeOptions: () => ExamControllerOptions): UseFinalExamRuntime {
  const ref = useRef<ExamController | null>(null);
  if (ref.current === null) ref.current = createExamController(makeOptions());
  const c = ref.current;

  const [phase, setPhase] = useState<ExamRuntimePhase>("eligibility_checking");
  const [eligibility, setEligibility] = useState<ExamEligibilityViewModel | null>(null);
  const [session, setSession] = useState<ExamSessionViewModel | null>(null);
  const [timer, setTimer] = useState<ExamTimerViewModel | null>(null);
  const [result, setResult] = useState<ExamProvisionalResultViewModel | null>(null);
  const [decision, setDecision] = useState<ExamFinalDecisionViewModel | null>(null);
  const [review, setReview] = useState<ExamReviewStatusViewModel | null>(null);
  const [flagged, setFlagged] = useState<string[]>([]);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");
  const [navReason, setNavReason] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [answerValues, setAnswerValues] = useState<Record<string, unknown>>({});

  const checkEligibility = useCallback(() => {
    const e = c.checkEligibility();
    setEligibility(e);
    setPhase(e.canStart ? "eligible" : "not_eligible");
  }, [c]);

  const start = useCallback(() => {
    const s = c.startExam();
    setSession(s);
    setCurrentSectionId(s.currentSectionId);
    setTimer(c.getTimer());
    setPhase("in_progress");
  }, [c]);

  const answer = useCallback((questionId: string, value: unknown) => {
    setAnswerValues((a) => ({ ...a, [questionId]: value }));
    setSession(c.selectAnswer(questionId, value));
    setSaveStatus("saved");
  }, [c]);

  const navigate = useCallback((sectionId: string) => {
    const outcome: NavigationOutcome = c.navigateToSection(sectionId);
    if (outcome.ok) {
      setCurrentSectionId(outcome.currentSectionId);
      setNavReason(null);
    } else {
      setNavReason(outcome.reasonCodes[0] ?? "NAVIGATION_FORBIDDEN");
    }
  }, [c]);

  const flag = useCallback((questionId: string, on: boolean) => {
    setFlagged(c.flagQuestionForReview(questionId, on));
  }, [c]);

  const save = useCallback(() => {
    c.saveCheckpoint();
    setSaveStatus("saved");
  }, [c]);

  const submit = useCallback(() => {
    setPhase("submitting");
    const { session: s, result: r } = c.submitExam();
    setSession(s);
    setResult(r);
    setReview(c.getReviewStatus());
    setPhase(c.getPhase());
  }, [c]);

  const finalize = useCallback(() => {
    const d = c.finalize();
    setDecision(d);
    setReview(c.getReviewStatus());
    setPhase(c.getPhase());
  }, [c]);

  const tick = useCallback(() => {
    const t = c.getTimer();
    setTimer(t);
    if (t?.expired && c.getPhase() === "expired") {
      const { expired, result: r } = c.handleExpiration();
      if (expired && r) {
        setResult(r);
        setReview(c.getReviewStatus());
        setSession(c.getPublicSession());
        setPhase(c.getPhase());
      }
    }
  }, [c]);

  return useMemo(
    () => ({ phase, eligibility, session, timer, result, decision, review, flagged, currentSectionId, saveStatus, navReason, acknowledged, setAcknowledged, answerValues, checkEligibility, start, answer, navigate, flag, save, submit, finalize, tick }),
    [phase, eligibility, session, timer, result, decision, review, flagged, currentSectionId, saveStatus, navReason, acknowledged, answerValues, checkEligibility, start, answer, navigate, flag, save, submit, finalize, tick],
  );
}
