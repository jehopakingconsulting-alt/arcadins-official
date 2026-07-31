"use client";
import { useEffect, useRef } from "react";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Confirmation AVANT soumission définitive de l'examen (Sprint K3B). Accessible (role dialog, focus initial,
 * Échap pour annuler). La soumission est irréversible : le libellé l'indique clairement.
 */
export function ExamSubmitConfirmation({ open, answered, total, onConfirm, onCancel }: { open: boolean; answered: number; total: number; onConfirm: () => void; onCancel: () => void }) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) confirmRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[color:var(--color-navy)]/50 p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="exam-submit-title" aria-describedby="exam-submit-desc" className="w-full max-w-sm rounded-xl bg-white p-6">
        <h2 id="exam-submit-title" className="text-lg font-bold text-[color:var(--color-navy)]">{examT("exam.submit_confirm_title")}</h2>
        <p id="exam-submit-desc" className="mt-2 text-sm text-[color:var(--color-body)]">
          {examT("exam.submit_confirm_body")} ({answered}/{total})
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="min-h-11 rounded-lg border border-[color:var(--border-gold)] px-4 py-2 text-sm font-semibold text-[color:var(--color-navy)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">{examT("exam.cancel")}</button>
          <button ref={confirmRef} type="button" onClick={onConfirm} className="min-h-11 rounded-lg bg-[color:var(--color-navy)] px-4 py-2 text-sm font-semibold text-[color:var(--color-off-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">{examT("exam.confirm")}</button>
        </div>
      </div>
    </div>
  );
}
