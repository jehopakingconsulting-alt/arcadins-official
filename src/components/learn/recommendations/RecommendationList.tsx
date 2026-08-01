"use client";

import { useLang } from "@/lib/i18n";
import { Card } from "@/components/ui/ds";
import type { RecommendationViewModel } from "@/lib/runtime/ui/view-models";
import type { Locale, Localized } from "@/lib/program-presentation/types";
import { tr } from "@/lib/program-presentation/types";

/**
 * RecommendationList — surface UI GÉNÉRIQUE des recommandations (issues de
 * RecommendationEngine via le mapper pur). Consomme RecommendationViewModel[] : aucune
 * logique de recommandation ici. i18n FR/EN/ES, accessible, réutilisable (dashboard,
 * lecteur de leçon), tenant/white-label/API-ready. `reason` fourni tel quel (déjà public).
 */
function toLocale(lang: string): Locale { return lang === "en" ? "en" : lang === "es" ? "es" : "fr"; }

type Kind = RecommendationViewModel["kind"];
const KIND_META: Record<Kind, { icon: string; label: Localized }> = {
  continue_lesson: { icon: "▶️", label: { fr: "Reprendre la leçon", en: "Continue lesson", es: "Continuar lección" } },
  review_competency: { icon: "🔁", label: { fr: "Réviser une compétence", en: "Review competency", es: "Repasar competencia" } },
  redo_exercise: { icon: "✍️", label: { fr: "Refaire un exercice", en: "Redo exercise", es: "Rehacer ejercicio" } },
  retry_quiz: { icon: "🎯", label: { fr: "Préparer l'évaluation", en: "Prepare assessment", es: "Preparar evaluación" } },
  view_resource: { icon: "📎", label: { fr: "Consulter une ressource", en: "View resource", es: "Ver recurso" } },
  next_module: { icon: "➡️", label: { fr: "Passer au module suivant", en: "Next module", es: "Siguiente módulo" } },
  contact_tutor: { icon: "💬", label: { fr: "Contacter un tuteur", en: "Contact a tutor", es: "Contactar un tutor" } },
  prepare_project: { icon: "🏆", label: { fr: "Préparer le projet", en: "Prepare project", es: "Preparar proyecto" } },
};

const HEADING: Localized = { fr: "Recommandé pour vous", en: "Recommended for you", es: "Recomendado para ti" };
const EMPTY: Localized = { fr: "Aucune recommandation pour le moment.", en: "No recommendations yet.", es: "Sin recomendaciones por ahora." };

export default function RecommendationList({
  recommendations, reasons = {}, heading = true, hrefFor,
}: {
  recommendations: RecommendationViewModel[];
  /** Résolution optionnelle d'une raison lisible par reasonKey (sinon la clé n'est pas affichée). */
  reasons?: Record<string, Localized>;
  heading?: boolean;
  hrefFor?: (r: RecommendationViewModel) => string;
}) {
  const { lang } = useLang();
  const l = toLocale(lang);

  return (
    <section aria-label={tr(HEADING, l)}>
      {heading && <h2 className="font-[family-name:var(--font-heading)] text-[18px] text-navy mb-4">{tr(HEADING, l)}</h2>}
      {recommendations.length === 0 ? (
        <p className="text-[14px] text-muted">{tr(EMPTY, l)}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {recommendations.map((r) => {
            const meta = KIND_META[r.kind] ?? KIND_META.view_resource;
            const reason = reasons[r.reasonKey];
            return (
              <li key={r.id}>
                <a href={hrefFor ? hrefFor(r) : "#"} className="block group focus-visible:outline-2">
                  <Card interactive className="p-4 flex items-center gap-4">
                    <span aria-hidden="true" className="shrink-0 w-11 h-11 rounded-full bg-gold/12 flex items-center justify-center text-xl">{meta.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold text-navy">{tr(meta.label, l)}</span>
                      {reason && <span className="block text-[13px] text-muted mt-0.5">{tr(reason, l)}</span>}
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-gold transition-transform group-hover:translate-x-1">→</span>
                  </Card>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
