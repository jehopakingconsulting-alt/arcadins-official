"use client";
import type { ExamTimerViewModel } from "@/lib/runtime/ui/exam/exam-view-models";
import { examT } from "@/lib/runtime/ui/exam/exam-i18n";

/**
 * Affichage du chronomètre AUTORITAIRE (Sprint K3B). Purement présentation : le temps provient du timer
 * recalculé par le moteur (horloge serveur), jamais du navigateur. Annonce accessible (aria-live) des
 * avertissements et de l'expiration.
 */
function fmt(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function AuthoritativeTimerDisplay({ timer }: { timer: ExamTimerViewModel | null }) {
  if (!timer) return null;
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${timer.warning ? "border-amber-600 text-amber-700" : "border-[color:var(--border-gold)] text-[color:var(--color-navy)]"}`}
      role="timer"
      aria-live={timer.warning || timer.expired ? "assertive" : "off"}
    >
      <span className="text-xs font-normal text-[#5a6a82]">{examT("exam.time_remaining")} : </span>
      {timer.expired ? (
        <span data-testid="exam-expired">{examT("exam.expired")}</span>
      ) : (
        <span data-testid="exam-time-remaining">{fmt(timer.remainingSeconds)}</span>
      )}
      {timer.warning && !timer.expired && <span className="ml-2 text-xs">{examT("exam.time_warning")}</span>}
    </div>
  );
}
