"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types/lesson";
import { PASSING_SCORE } from "@/types/lesson";

interface Props {
  quiz: QuizQuestion[];
  onPass: () => void;
  saving: boolean;
}

export default function QuizView({ quiz, onPass, saving }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a !== null);
  const correctCount = answers.reduce<number>((acc, a, i) => acc + (a === quiz[i].correctIndex ? 1 : 0), 0);
  const scorePct = quiz.length > 0 ? Math.round((correctCount / quiz.length) * 100) : 0;
  const passed = scorePct >= PASSING_SCORE;

  function selectAnswer(qIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optionIndex;
      return next;
    });
  }

  function submit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function retry() {
    setAnswers(Array(quiz.length).fill(null));
    setSubmitted(false);
  }

  return (
    <div className="mt-8 pt-8 border-t border-off-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="text-xl">📝</div>
        <h3 className="font-[family-name:var(--font-heading)] text-xl text-navy">Test de compréhension</h3>
      </div>
      <p className="text-[13.5px] text-muted mb-6">
        Répondez aux {quiz.length} questions ci-dessous. Note de passage : {PASSING_SCORE}%.
      </p>

      {submitted && (
        <div
          className={`rounded-xl p-5 mb-6 flex items-center gap-4 flex-wrap ${
            passed ? "bg-gold/12 border border-gold/30" : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="text-3xl">{passed ? "🎉" : "✗"}</div>
          <div className="flex-1 min-w-[200px]">
            <div className="font-bold text-navy">
              {passed ? "Félicitations, vous avez réussi !" : "Score insuffisant"}
            </div>
            <div className="text-[13.5px] text-body">
              {correctCount} / {quiz.length} bonnes réponses ({scorePct}%)
              {!passed && ` — minimum requis : ${PASSING_SCORE}%`}
            </div>
          </div>
          {passed ? (
            <button
              onClick={onPass}
              disabled={saving}
              className="bg-gold text-navy font-bold text-sm px-6 py-3 rounded-xl hover:bg-gold-light transition-all shrink-0"
            >
              {saving ? "Enregistrement..." : "✓ Marquer le module complété"}
            </button>
          ) : (
            <button
              onClick={retry}
              className="bg-navy text-gold font-bold text-sm px-6 py-3 rounded-xl shrink-0"
            >
              ↺ Réessayer le test
            </button>
          )}
        </div>
      )}

      <div className="space-y-6">
        {quiz.map((q, qIndex) => {
          const userAnswer = answers[qIndex];
          return (
            <div key={qIndex} className="bg-off-white rounded-xl p-5">
              <div className="text-[14px] font-semibold text-navy mb-3">
                {qIndex + 1}. {q.question}
              </div>
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const isSelected = userAnswer === optIndex;
                  const isCorrect = optIndex === q.correctIndex;
                  let style = "bg-white border border-gold/15 text-body hover:border-gold/40";
                  if (submitted) {
                    if (isCorrect) style = "bg-green-50 border border-green-400 text-navy font-medium";
                    else if (isSelected && !isCorrect) style = "bg-red-50 border border-red-300 text-navy";
                    else style = "bg-white border border-gold/10 text-muted";
                  } else if (isSelected) {
                    style = "bg-gold/15 border border-gold text-navy font-medium";
                  }
                  return (
                    <button
                      key={optIndex}
                      onClick={() => selectAnswer(qIndex, optIndex)}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-[13.5px] transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <div className="mt-3 text-[12.5px] text-muted bg-white rounded-lg p-3 border border-gold/10">
                  💡 {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={submit}
          disabled={!allAnswered}
          className="mt-6 w-full bg-navy text-gold font-bold text-sm px-6 py-3.5 rounded-xl disabled:opacity-30 transition-all"
        >
          Soumettre le test ({answers.filter((a) => a !== null).length} / {quiz.length} répondu)
        </button>
      )}
    </div>
  );
}
