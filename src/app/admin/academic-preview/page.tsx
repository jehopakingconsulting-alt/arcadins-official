import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ACADEMIC_PREVIEW_ENABLED } from "@/lib/academic/preview-config";
import { marketingDigitalV2 } from "@/lib/academic/marketing-digital-v2";
import { marketingDigitalV2Bank } from "@/lib/academic/question-bank/marketing-digital-v2";
import { validateCurriculum } from "@/lib/academic/validate";

export const metadata: Metadata = {
  title: "Aperçu cursus v2 (interne) — ARCADINS",
  robots: { index: false, follow: false },
};

/**
 * Aperçu INTERNE et NON PUBLIC du cursus Marketing Digital v2.
 * Double garde : flag ACADEMIC_PREVIEW_ENABLED + zone /admin (RBAC déjà appliqué par le layout admin).
 * Rend uniquement la structure et l'état de rédaction ; ne modifie aucune donnée.
 */
export default function AcademicPreviewPage() {
  if (!ACADEMIC_PREVIEW_ENABLED) notFound();

  const c = marketingDigitalV2;
  const report = validateCurriculum(c, marketingDigitalV2Bank);
  const authored = c.modules.flatMap((m) => m.lessons).filter((l) => l.authored).length;
  const totalLessons = c.modules.flatMap((m) => m.lessons).length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="mb-2 inline-block rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
        APERÇU INTERNE — NON PUBLIC — v2 (pilote)
      </p>
      <h1 className="text-2xl font-bold">{c.title} — cursus académique v2</h1>
      <p className="mt-1 text-sm text-gray-600">
        {c.totalWeeks} semaines · {c.modules.length} modules · note de passage {c.passingScore}% ·{" "}
        {authored}/{totalLessons} leçons rédigées
      </p>

      <div className="mt-4 rounded border p-4 text-sm">
        <strong>Validation :</strong> {report.ok ? "✅ aucun blocage" : "❌ erreurs"} · banque{" "}
        {report.stats.bankQuestions} questions · pondération {report.stats.weightsSum}%
        {report.warnings.length > 0 && (
          <ul className="mt-2 list-disc pl-5 text-amber-700">
            {report.warnings.map((wng) => (
              <li key={wng.code + wng.message}>{wng.message}</li>
            ))}
          </ul>
        )}
      </div>

      <ol className="mt-6 space-y-4">
        {c.modules.map((m) => (
          <li key={m.index} className="rounded border p-4">
            <div className="flex items-baseline justify-between">
              <h2 className="font-semibold">
                Module {m.index} — {m.title}
              </h2>
              <span className="text-xs text-gray-500">semaines {m.weeks.join(", ")}</span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{m.summary}</p>
            <p className="mt-1 text-xs text-gray-500">
              {m.lessons.length} leçons · {m.weeklyQuizzes?.length ?? 0} quiz hebdo ·{" "}
              {m.assessments.length} évaluations
              {m.rubric ? ` · rubrique ${m.rubric.totalPoints} pts` : ""}
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              {m.lessons.map((l) => (
                <li key={l.id} className="flex items-center gap-2">
                  <span>{l.authored ? "✅" : "⏳"}</span>
                  <span>
                    {l.week ? `S${l.week} · ` : ""}
                    {l.title}
                  </span>
                  {(l.interactiveActivities?.length ?? 0) > 0 && (
                    <span className="text-xs text-gray-400">
                      ({l.interactiveActivities!.length} activité(s))
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
