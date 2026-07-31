"use client";
/**
 * Coquille de l'examen final RUNTIME (Sprint K3B). Orchestration des phases (admissibilité → instructions →
 * examen → soumission → provisoire → décision) autour de `useFinalExamRuntime` + `ExamController`. Consomme
 * UNIQUEMENT des vues publiques. Le chronomètre autoritaire est rafraîchi par un tick d'affichage ; l'autorité
 * temporelle reste l'horloge injectée du moteur.
 */
import { useEffect, useState } from "react";
import type { ExamControllerOptions } from "@/lib/runtime/ui/exam/exam-controller";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";
import { useFinalExamRuntime } from "@/hooks/learn/useFinalExamRuntime";
import { QuestionRenderer } from "@/components/learn/assessment/QuestionRenderer";
import { AuthoritativeTimerDisplay } from "./AuthoritativeTimerDisplay";
import { FinalExamEligibilityPanel } from "./FinalExamEligibilityPanel";
import { FinalExamInstructions } from "./FinalExamInstructions";
import { ExamSectionNavigator } from "./ExamSectionNavigator";
import { ExamSubmitConfirmation } from "./ExamSubmitConfirmation";
import { ProvisionalExamResult } from "./ProvisionalExamResult";
import { FinalDecisionStatus } from "./FinalDecisionStatus";

export function FinalExamShell({ makeOptions }: { makeOptions: () => ExamControllerOptions }) {
  const exam = useFinalExamRuntime(makeOptions);
  const [dialog, setDialog] = useState(false);

  const { checkEligibility, tick, phase } = exam;

  // Vérification d'admissibilité au montage (callback stable).
  useEffect(() => { checkEligibility(); }, [checkEligibility]);

  // Tick d'affichage du chronomètre autoritaire pendant l'examen (déclenche l'auto-soumission à expiration).
  useEffect(() => {
    if (phase !== "in_progress" && phase !== "expired") return;
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, [phase, tick]);

  return (
    <section id="final-exam" aria-labelledby="final-exam-title" className="mx-auto max-w-2xl space-y-6 p-1">
      <h1 id="final-exam-title" className="text-xl font-bold text-[color:var(--color-navy)]">{examT("exam.title")}</h1>

      {exam.phase === "eligibility_checking" && <p role="status">{examT("exam.loading_eligibility")}</p>}

      {exam.phase === "not_eligible" && exam.eligibility && <FinalExamEligibilityPanel eligibility={exam.eligibility} />}

      {exam.phase === "eligible" && exam.eligibility && (
        <>
          <FinalExamEligibilityPanel eligibility={exam.eligibility} />
          <FinalExamInstructions acknowledged={exam.acknowledged} onAcknowledge={exam.setAcknowledged} onStart={exam.start} />
        </>
      )}

      {(exam.phase === "in_progress" || exam.phase === "submitting") && exam.session && (
        <div aria-busy={exam.phase === "submitting"} className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <AuthoritativeTimerDisplay timer={exam.timer} />
            <span className="text-xs text-[#5a6a82]" role="status" aria-live="polite">
              {exam.saveStatus === "saved" ? examT("exam.saved") : ""}
            </span>
          </div>

          <ExamSectionNavigator
            sections={exam.session.sections}
            currentSectionId={exam.currentSectionId}
            onNavigate={exam.navigate}
            navReason={exam.navReason}
          />

          {exam.session.sections
            .filter((s) => s.id === (exam.currentSectionId ?? exam.session!.sections[0]?.id))
            .map((s) => (
              <div key={s.id} className="space-y-4">
                {s.questions.map((q) => (
                  <div key={q.questionId} className="rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
                    <QuestionRenderer question={q} value={exam.answerValues[q.questionId]} onChange={(v) => exam.answer(q.questionId, v)} />
                    <label className="mt-3 flex items-center gap-2 text-xs text-[#5a6a82]">
                      <input type="checkbox" checked={exam.flagged.includes(q.questionId)} onChange={(e) => exam.flag(q.questionId, e.target.checked)} className="h-4 w-4" />
                      <span>{examT("exam.flag")}</span>
                    </label>
                  </div>
                ))}
              </div>
            ))}

          <div className="flex items-center justify-between">
            <button type="button" onClick={exam.save} className="inline-flex min-h-11 items-center rounded-lg border border-[color:var(--border-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">
              {examT("exam.save")}
            </button>
            <button type="button" onClick={() => setDialog(true)} disabled={exam.phase === "submitting"} className="inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-gold)] px-5 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)] disabled:opacity-50">
              {examT("exam.submit")}
            </button>
          </div>

          <ExamSubmitConfirmation
            open={dialog}
            answered={exam.session.answered}
            total={exam.session.total}
            onCancel={() => setDialog(false)}
            onConfirm={() => { setDialog(false); exam.submit(); }}
          />
        </div>
      )}

      {(exam.phase === "provisional_result" || exam.phase === "manual_review_required" || exam.phase === "expired") && exam.result && (
        <ProvisionalExamResult
          result={exam.result}
          review={exam.review}
          canFinalize={exam.phase === "provisional_result"}
          onFinalize={exam.finalize}
        />
      )}

      {exam.phase === "decision_final" && exam.decision && (
        <>
          {exam.result && <ProvisionalExamResult result={exam.result} review={exam.review} canFinalize={false} onFinalize={exam.finalize} />}
          <FinalDecisionStatus decision={exam.decision} />
          <button type="button" className="inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-navy)] px-5 py-2 text-sm font-semibold text-[color:var(--color-off-white)]">
            {examT("exam.continue")}
          </button>
        </>
      )}
    </section>
  );
}
