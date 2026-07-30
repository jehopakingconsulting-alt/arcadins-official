"use client";
import type { PublicQuestionViewModel } from "@/lib/runtime/ui/view-models";

/**
 * Rendu d'une question PUBLIQUE (Sprint J). Ne reçoit JAMAIS de bonne réponse : uniquement l'énoncé et les
 * options. La sélection est locale ; la correction reste serveur.
 */
export function QuestionRenderer({ question, value, onChange }: { question: PublicQuestionViewModel; value: unknown; onChange: (v: unknown) => void }) {
  const name = `q-${question.questionId}`;
  const opts = question.options ?? [];

  if (question.kind === "multiple") {
    const arr = Array.isArray(value) ? (value as string[]) : [];
    return (
      <fieldset>
        <legend className="text-base font-medium text-[color:var(--color-navy)]">{question.prompt}</legend>
        <div className="mt-3 space-y-2">
          {opts.map((o) => (
            <label key={o.id} className="flex items-center gap-2 rounded-lg border border-[color:var(--border-gold)] p-3 text-sm">
              <input type="checkbox" checked={arr.includes(o.id)} onChange={(e) => onChange(e.target.checked ? [...arr, o.id] : arr.filter((x) => x !== o.id))} className="h-4 w-4" />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (question.kind === "short_answer" || question.kind === "case") {
    return (
      <div>
        <label htmlFor={name} className="block text-base font-medium text-[color:var(--color-navy)]">{question.prompt}</label>
        <textarea id={name} value={typeof value === "string" ? value : ""} onChange={(e) => onChange(e.target.value)} rows={4} className="mt-3 w-full rounded-lg border border-[color:var(--border-gold)] p-3 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-gold)]" />
      </div>
    );
  }

  // single / true_false : choix unique.
  return (
    <fieldset>
      <legend className="text-base font-medium text-[color:var(--color-navy)]">{question.prompt}</legend>
      <div className="mt-3 space-y-2">
        {opts.map((o) => (
          <label key={o.id} className="flex items-center gap-2 rounded-lg border border-[color:var(--border-gold)] p-3 text-sm">
            <input type="radio" name={name} checked={value === o.id} onChange={() => onChange(o.id)} className="h-4 w-4" />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
