"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { Button, ProgressBar, Badge } from "@/components/ui/ds";
import ResultsView from "./ResultsView";
import {
  createAttempt, setAnswer, toggleAnswer, goTo, nextQuestion, prevQuestion,
  isAnswered, answeredCount, isComplete, progressPercent, toSubmission, type AttemptState,
} from "@/lib/assessment-ui/attempt-state";
import type { DemoAssessment } from "@/lib/assessment-ui/demo";
import type { Locale } from "@/lib/program-presentation/types";
import { tr } from "@/lib/program-presentation/types";

/**
 * QuizPlayer — lecteur d'évaluation UNIVERSEL (quiz / test / examen blanc).
 * Consomme des questions PUBLIQUES (aucune bonne réponse). L'état de tentative est géré
 * par le réducteur PUR ; la SOUMISSION est destinée au moteur serveur (branché en S6).
 * Ici (démo, sans serveur), on affiche le résultat public simulé. i18n FR/EN/ES,
 * accessible (radiogroup/checkbox, aria, clavier, focus). Réutilisable par tout produit.
 */
function toLocale(lang: string): Locale { return lang === "en" ? "en" : lang === "es" ? "es" : "fr"; }

const T: Record<string, Record<Locale, string>> = {
  question: { fr: "Question", en: "Question", es: "Pregunta" },
  of: { fr: "sur", en: "of", es: "de" },
  answered: { fr: "répondues", en: "answered", es: "respondidas" },
  prev: { fr: "Précédent", en: "Previous", es: "Anterior" },
  next: { fr: "Suivant", en: "Next", es: "Siguiente" },
  submit: { fr: "Soumettre", en: "Submit", es: "Enviar" },
  yourAnswer: { fr: "Votre réponse", en: "Your answer", es: "Su respuesta" },
  multiHint: { fr: "Plusieurs réponses possibles", en: "Select all that apply", es: "Varias respuestas posibles" },
};

export default function QuizPlayer({ assessment }: { assessment: DemoAssessment }) {
  const { lang } = useLang();
  const l = toLocale(lang);
  const t = (k: string) => tr(T[k], l);
  const [state, setState] = useState<AttemptState>(() => createAttempt(assessment.questions));
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-off-white min-h-screen pt-28 pb-20 px-4">
        <ResultsView result={assessment.demoResult} onRetry={() => { setState(createAttempt(assessment.questions)); setSubmitted(false); }} />
      </div>
    );
  }

  const q = state.questions[state.currentIndex];
  const isMulti = q.kind === "multiple";
  const selected = state.answers[q.questionId];
  const selectedArr = Array.isArray(selected) ? selected : selected ? [selected] : [];

  function choose(optionId: string) {
    setState((s) => (isMulti ? toggleAnswer(s, q.questionId, optionId) : setAnswer(s, q.questionId, optionId)));
  }

  return (
    <div className="bg-off-white min-h-screen pt-28 pb-20">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-2 text-[13px] text-muted">
          <span>{t("question")} {state.currentIndex + 1} {t("of")} {state.questions.length}</span>
          <span>{answeredCount(state)}/{state.questions.length} {t("answered")}</span>
        </div>
        <ProgressBar value={progressPercent(state)} />

        {/* Question */}
        <div className="bg-white rounded-[20px] border border-gold/15 p-6 sm:p-8 mt-6">
          <h1 className="font-[family-name:var(--font-heading)] text-[22px] text-navy mb-1">{tr(assessment.title, l)}</h1>
          <p className="text-[17px] text-navy font-medium mt-4 mb-5">{q.prompt}</p>
          {isMulti && <Badge variant="neutral">{t("multiHint")}</Badge>}

          {q.options ? (
            <div role={isMulti ? "group" : "radiogroup"} aria-label={q.prompt} className="flex flex-col gap-3 mt-4">
              {q.options.map((opt) => {
                const on = selectedArr.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    role={isMulti ? "checkbox" : "radio"}
                    aria-checked={on}
                    onClick={() => choose(opt.id)}
                    className={`flex items-center gap-3 text-left rounded-[12px] border px-4 py-3.5 transition-all ${on ? "border-gold bg-gold/10" : "border-navy/12 bg-white hover:border-gold/50"}`}
                  >
                    <span aria-hidden="true" className={`shrink-0 w-5 h-5 flex items-center justify-center border ${isMulti ? "rounded-md" : "rounded-full"} ${on ? "bg-gold border-gold text-navy" : "border-navy/25"}`}>{on ? "✓" : ""}</span>
                    <span className="text-[15px] text-navy">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <label className="block mt-4">
              <span className="sr-only">{t("yourAnswer")}</span>
              <input
                type="text"
                value={typeof selected === "string" ? selected : ""}
                onChange={(e) => setState((s) => setAnswer(s, q.questionId, e.target.value))}
                placeholder={t("yourAnswer")}
                className="w-full rounded-[10px] border border-navy/15 px-4 py-3 text-[15px] text-navy focus:outline-none focus-visible:outline-2 focus:border-gold"
              />
            </label>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" size="md" onClick={() => setState((s) => prevQuestion(s))} disabled={state.currentIndex === 0}>← {t("prev")}</Button>
          {state.currentIndex < state.questions.length - 1 ? (
            <Button variant="primary" size="md" onClick={() => setState((s) => nextQuestion(s))}>{t("next")} →</Button>
          ) : (
            <Button variant="secondary" size="md" disabled={!isComplete(state)} onClick={() => { void toSubmission(state); setSubmitted(true); }}>{t("submit")}</Button>
          )}
        </div>

        {/* Question dots */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          {state.questions.map((qq, i) => (
            <button key={qq.questionId} aria-label={`${t("question")} ${i + 1}`} onClick={() => setState((s) => goTo(s, i))}
              className={`w-8 h-8 rounded-full text-[12px] font-semibold transition-colors ${i === state.currentIndex ? "bg-navy text-gold" : isAnswered(state, qq.questionId) ? "bg-gold/20 text-navy" : "bg-white border border-navy/15 text-muted"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
