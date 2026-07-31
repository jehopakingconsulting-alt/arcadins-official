"use client";
/**
 * Wrapper de PREVIEW de l'examen final (Sprint K3B). Câble le contrôleur d'examen + la tranche de progression
 * dédiée (ExamRuntimeStore) et rend la coquille. Données FICTIVES, aucune API, aucune donnée réelle, aucun
 * certificat/badge. Variantes de test : `real` (banque réelle), `det` (banque déterministe pour réussite/échec
 * navigateur), `blocked` (non admissible), `timeout` (chronomètre court pour l'expiration).
 */
import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  buildDeterministicExamBank,
  buildDeterministicExamDefinition,
  demoEligibilityContext,
} from "@/lib/runtime/ui/exam/exam-config";
import type { ExamControllerOptions } from "@/lib/runtime/ui/exam/exam-controller";
import { createExamRuntimeStore } from "@/lib/runtime/ui/exam/exam-runtime-store";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";
import { FinalExamShell } from "./FinalExamShell";

export type ExamPreviewVariant = "real" | "det" | "blocked" | "timeout";

/**
 * FRONTIÈRE CLIENT SÛRE (K3-S) : ne reçoit que le SLUG public (chaîne) et n'importe AUCUNE banque privée.
 * L'interactivité utilise un contrôleur DÉTERMINISTE synthétique dont les réponses restent dans la clôture
 * (jamais DOM/props/session/__NEXT_DATA__/bundle). La banque réelle et sa correction relèvent du serveur
 * (`exam-bank.server.ts`, Sprint L). Le curriculum académique privé ne traverse jamais la frontière client.
 */
export function FinalExamPreview({ programSlug, variant = "real" }: { programSlug: string; variant?: ExamPreviewVariant }) {
  const store = useMemo(() => createExamRuntimeStore(), []);

  const makeOptions = useCallback((): ExamControllerOptions => {
    const baseDef = buildDeterministicExamDefinition({ programSlug });
    const definition = variant === "timeout" ? { ...baseDef, durationLimitSeconds: 2 } : baseDef;
    return {
      definition,
      bank: buildDeterministicExamBank(),
      learnerRef: "demo-learner", // SERVEUR-AUTORITAIRE en réel (Sprint L) ; fixe en démo.
      attemptNumber: 1,
      eligibilityContext: variant === "blocked" ? demoEligibilityContext({ enrollmentActive: false }) : demoEligibilityContext(),
      now: () => new Date(), // horloge réelle en preview (l'autorité RESTE l'horloge injectée du moteur)
      seed: 42,
      onExamEvent: (event) => store.dispatch(event),
    };
  }, [programSlug, variant, store]);

  return (
    <div id="final-exam-preview" className="min-h-screen bg-[color:var(--color-off-white)] px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="rounded-lg bg-[color:var(--color-navy)]/5 px-3 py-2 text-center text-xs font-medium text-[#5a6a82]">
          Examen de démonstration — données fictives, correction serveur (moteur), aucun certificat émis.
        </p>
        <ExamProgressReadout store={store} />
        <FinalExamShell makeOptions={makeOptions} />
      </div>
    </div>
  );
}

/** Lecture READ-ONLY de la progression d'examen (tranche dédiée) : reflète l'effet réel après soumission. */
function ExamProgressReadout({ store }: { store: ReturnType<typeof createExamRuntimeStore> }) {
  const state = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  return (
    <section id="exam-progress-readout" aria-label="Progression de l'examen" className="rounded-xl border border-[color:var(--border-gold)] bg-white p-4">
      <p className="text-sm text-[color:var(--color-body)]" role="status" aria-live="polite">
        {state.status === "not_submitted"
          ? "Examen non soumis."
          : state.status === "passed"
            ? `Décision : réussi (${state.publicScorePercent}%) — ${state.certificateEligibility ? examT("exam.next.certificate_available") : examT("exam.next.passed")}`
            : state.status === "failed"
              ? `Décision : non réussi (${state.publicScorePercent}%).`
              : state.status === "pending_manual_review"
                ? "Examen soumis — en attente de révision manuelle."
                : `Examen soumis — résultat provisoire ${state.publicScorePercent}%.`}
      </p>
    </section>
  );
}
