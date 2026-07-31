/**
 * État verrouillé (Sprint J). La raison de verrouillage PROVIENT du moteur (prop) — jamais calculée ici.
 */
const REASON_LABELS: Record<string, string> = {
  PREREQUISITE_MODULE_INCOMPLETE: "Terminez le module précédent pour débloquer ce contenu.",
  PREREQUISITE_LESSON_INCOMPLETE: "Terminez la leçon précédente pour continuer.",
  QUIZ_NOT_PASSED: "Réussissez le quiz requis pour débloquer la suite.",
  ACCESS_EXPIRED: "Votre accès a expiré.",
  ENROLLMENT_SUSPENDED: "Votre inscription est suspendue.",
};

export function LockedState({ reasonCode }: { reasonCode: string | null }) {
  const label = (reasonCode && REASON_LABELS[reasonCode]) ?? "Ce contenu est verrouillé.";
  return (
    <div role="status" className="flex items-center gap-2 rounded-lg border border-[color:var(--border-gold)] bg-[color:var(--color-off-white)] px-3 py-2 text-xs text-[#5a6a82]">
      <span aria-hidden="true">🔒</span>
      <span>{label}</span>
    </div>
  );
}
