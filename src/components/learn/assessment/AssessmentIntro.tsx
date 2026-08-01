"use client";
import type { AssessmentIntroViewModel } from "@/lib/runtime/ui/view-models";

/** Introduction d'un quiz formatif (Sprint J). */
export function AssessmentIntro({ model, onStart }: { model: AssessmentIntroViewModel; onStart?: () => void }) {
  return (
    <section aria-labelledby="assessment-intro-title" className="mx-auto max-w-xl rounded-xl border border-[color:var(--border-gold)] bg-white p-6">
      <h1 id="assessment-intro-title" className="text-xl font-bold text-[color:var(--color-navy)]">{model.titleKey}</h1>
      <p className="mt-2 text-sm text-[color:var(--color-body)]">{model.instructionsKey}</p>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div><dt className="text-xs text-[#5a6a82]">Questions</dt><dd className="font-semibold text-[color:var(--color-navy)]">{model.questionCount}</dd></div>
        <div><dt className="text-xs text-[#5a6a82]">Durée indicative</dt><dd className="font-semibold text-[color:var(--color-navy)]">{model.indicativeMinutes} min</dd></div>
        <div><dt className="text-xs text-[#5a6a82]">Difficulté</dt><dd className="font-semibold text-[color:var(--color-navy)]">{model.difficultyKey}</dd></div>
        <div><dt className="text-xs text-[#5a6a82]">Tentative</dt><dd className="font-semibold text-[color:var(--color-navy)]">{model.attemptNumber} / {model.maxAttempts}</dd></div>
      </dl>
      <button type="button" onClick={onStart} className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[color:var(--color-navy)] px-5 py-2 text-sm font-semibold text-[color:var(--color-off-white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]">Commencer</button>
    </section>
  );
}
