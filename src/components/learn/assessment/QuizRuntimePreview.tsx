"use client";
/**
 * Wrapper de PREVIEW du quiz runtime (Sprint K3A, durci K3-S).
 *
 * FRONTIÈRE CLIENT SÛRE : ne reçoit qu'une projection PUBLIQUE et STRUCTURELLE du curriculum (identités/labels,
 * AUCUN contenu privé) et n'importe AUCUNE banque privée. L'interactivité utilise un contrôleur DÉTERMINISTE
 * dont les bonnes réponses restent dans la CLÔTURE (jamais DOM/props/session/__NEXT_DATA__/bundle). La banque
 * réelle et sa correction relèvent du serveur (Sprint L). Monte le `RuntimeProvider` (K2A) et câble la
 * progression `QUIZ_SUBMITTED`. Données FICTIVES, horloge fixe, aucune API, aucune donnée réelle.
 */
import { useCallback, useMemo } from "react";
import type { ProgramCurriculumV2 } from "@/lib/academic/types";
import type { PrivateQuestion } from "@/lib/runtime/assessment/types";
import { InMemoryQuestionBank } from "@/lib/runtime/assessment/question-bank";
import { RuntimeProvider, useRuntimeContext } from "@/lib/runtime/ui/runtime/RuntimeProvider";
import { createStudentRuntime } from "@/lib/runtime/ui/runtime/student-runtime";
import { makeFormativeQuizPolicy } from "@/lib/runtime/ui/assessment/quiz-config";
import type { QuizControllerOptions } from "@/lib/runtime/ui/assessment/quiz-controller";
import { quizT } from "@/lib/runtime/ui/assessment/quiz-i18n";
import { QuizRuntimePlayer } from "./QuizRuntimePlayer";

const FIXED_NOW = new Date("2026-12-02T09:00:00Z");
const MODULE_ID = "1";
const QUIZ_ID = "quiz-m1-demo";

/**
 * Banque DÉTERMINISTE synthétique (bonne réponse connue = 1re option "o0"). Réservée à la preview/test, gatée,
 * inaccessible en production. Les réponses attendues vivent dans la clôture du contrôleur — jamais exposées.
 */
function buildDeterministicBank(): InMemoryQuestionBank {
  const items: PrivateQuestion[] = Array.from({ length: 3 }, (_, i) => ({
    id: `det${i}`,
    version: 1,
    type: "single",
    difficulty: "easy",
    prompt: `Question déterministe ${i + 1}`,
    options: [{ id: "o0", label: "Bonne réponse" }, { id: "o1", label: "Autre réponse" }],
    points: 1,
    grading: { kind: "single", correctOptionId: "o0" },
    competencyId: `C${i}`,
    moduleId: MODULE_ID,
    status: "active",
  }));
  return new InMemoryQuestionBank(items);
}

/** `curriculum` reçu = projection PUBLIQUE structurelle (voir `toPublicCurriculum`), jamais le curriculum privé. */
export function QuizRuntimePreview({ curriculum }: { curriculum: ProgramCurriculumV2 }) {
  const runtime = useMemo(() => createStudentRuntime(curriculum, { now: () => FIXED_NOW }), [curriculum]);
  const lessonRef = useMemo(() => curriculum.modules[0]?.lessons?.[0]?.id ?? "", [curriculum]);

  const makeOptions = useCallback(
    (): QuizControllerOptions => ({
      definition: { id: "quiz-det", programId: curriculum.slug, moduleId: MODULE_ID, version: 1, selection: { count: 3, moduleId: MODULE_ID }, lessonId: lessonRef },
      bank: buildDeterministicBank(),
      learnerRef: "demo-learner", // SERVEUR-AUTORITAIRE en réel (Sprint L) ; fixe en démo.
      lessonRef,
      quizId: QUIZ_ID,
      now: () => FIXED_NOW,
      seed: 42,
      policy: makeFormativeQuizPolicy(),
      onProgress: (event) => runtime.dispatch(event),
    }),
    [runtime, curriculum.slug, lessonRef],
  );

  return (
    <div id="quiz-runtime-preview" className="min-h-screen bg-[color:var(--color-off-white)] px-4 py-8">
      <RuntimeProvider runtime={runtime}>
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="rounded-lg bg-[color:var(--color-navy)]/5 px-3 py-2 text-center text-xs font-medium text-[#5a6a82]">
            Quiz de démonstration — données fictives, correction serveur (moteur), aucune donnée réelle.
          </p>
          <QuizProgressReadout lessonRef={lessonRef} />
          <QuizRuntimePlayer makeOptions={makeOptions} />
        </div>
      </RuntimeProvider>
    </div>
  );
}

/** Lecture READ-ONLY de la progression : reflète l'effet réel du quiz sur le runtime après soumission. */
function QuizProgressReadout({ lessonRef }: { lessonRef: string }) {
  const { state, derived } = useRuntimeContext();
  const lesson = state.lessons[lessonRef];
  const score = typeof lesson?.quizScore === "number" ? lesson.quizScore : null;
  return (
    <section id="quiz-progress-readout" aria-label="Progression après quiz" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-[color:var(--color-navy)]">{quizT("quiz.competencies")}</span>
        <span className="text-[#5a6a82]">Avancement global : {derived.program.percent}%</span>
      </div>
      <p className="mt-2 text-sm text-[color:var(--color-body)]" role="status" aria-live="polite">
        {score === null
          ? "Leçon cible : quiz non encore soumis."
          : `Leçon cible : score ${score}% — ${lesson?.state === "passed" ? quizT("quiz.passed") : quizT("quiz.failed")}.`}
      </p>
    </section>
  );
}
