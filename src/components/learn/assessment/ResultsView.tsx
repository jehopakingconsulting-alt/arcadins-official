"use client";

import { useLang } from "@/lib/i18n";
import { Button, Badge, ProgressBar } from "@/components/ui/ds";
import type { AssessmentResultViewModel } from "@/lib/runtime/ui/view-models";
import type { Locale } from "@/lib/program-presentation/types";
import { tr } from "@/lib/program-presentation/types";

/**
 * ResultsView — rendu du résultat PUBLIC d'une évaluation (corrigé serveur).
 * Aucune bonne réponse ni barème : uniquement score/passed/feedback/forces/à-revoir.
 * i18n FR/EN/ES, accessible. Réutilisable par quiz, test de module, examen blanc.
 */
function toLocale(lang: string): Locale { return lang === "en" ? "en" : lang === "es" ? "es" : "fr"; }

const T: Record<string, Record<Locale, string>> = {
  passed: { fr: "Réussi", en: "Passed", es: "Aprobado" },
  failed: { fr: "À retravailler", en: "Keep practicing", es: "A seguir practicando" },
  score: { fr: "Votre score", en: "Your score", es: "Su puntuación" },
  correct: { fr: "bonnes réponses", en: "correct", es: "correctas" },
  strengths: { fr: "Points forts", en: "Strengths", es: "Fortalezas" },
  toReview: { fr: "À revoir", en: "To review", es: "Para repasar" },
  retry: { fr: "Reprendre le quiz", en: "Retake quiz", es: "Repetir cuestionario" },
  continue: { fr: "Continuer", en: "Continue", es: "Continuar" },
};

export default function ResultsView({ result, onRetry }: { result: AssessmentResultViewModel; onRetry?: () => void }) {
  const { lang } = useLang();
  const l = toLocale(lang);
  const t = (k: string) => tr(T[k], l);

  return (
    <div className="max-w-[560px] mx-auto text-center ds-animate-scale-in" role="status" aria-live="polite">
      <div className="text-5xl mb-3" aria-hidden="true">{result.passed ? "🎉" : "💪"}</div>
      <Badge variant={result.passed ? "success" : "neutral"}>{result.passed ? t("passed") : t("failed")}</Badge>
      <div className="my-6">
        <div className="text-[13px] text-muted mb-2">{t("score")}</div>
        <div className="font-[family-name:var(--font-heading)] text-[52px] text-navy leading-none">{result.scorePercent}%</div>
        {result.correctCount != null && result.totalQuestions != null && (
          <div className="text-[13.5px] text-muted mt-1">{result.correctCount}/{result.totalQuestions} {t("correct")}</div>
        )}
        <div className="max-w-[300px] mx-auto mt-4"><ProgressBar value={result.scorePercent} /></div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-left mb-7">
        {result.strengths.length > 0 && (
          <div className="rounded-[14px] bg-emerald-500/6 border border-emerald-500/20 p-4">
            <div className="text-[12px] font-bold uppercase tracking-wide text-emerald-700 mb-2">✓ {t("strengths")}</div>
            <ul className="flex flex-col gap-1 text-[14px] text-body">{result.strengths.map((s) => <li key={s}>• {s}</li>)}</ul>
          </div>
        )}
        {result.toReview.length > 0 && (
          <div className="rounded-[14px] bg-gold/8 border border-gold/25 p-4">
            <div className="text-[12px] font-bold uppercase tracking-wide text-gold mb-2">↺ {t("toReview")}</div>
            <ul className="flex flex-col gap-1 text-[14px] text-body">{result.toReview.map((s) => <li key={s}>• {s}</li>)}</ul>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {result.retryAvailable && onRetry && <Button variant="outline" size="md" onClick={onRetry}>{t("retry")}</Button>}
        <Button href="#" variant="primary" size="md">{t("continue")} →</Button>
      </div>
    </div>
  );
}
