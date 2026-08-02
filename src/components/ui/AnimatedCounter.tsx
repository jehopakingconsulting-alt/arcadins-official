interface Props {
  target: number;
  suffix?: string;
  /** Conservé pour compatibilité d'API ; non utilisé (rendu statique). */
  duration?: number;
}

/**
 * Affiche un chiffre-clé. Rendu STATIQUE et correct partout (SSR, sans JS, crawlers,
 * réseaux sociaux) — aucun « 0 » transitoire ni compteur inachevé visible. Choix de
 * lancement : fiabilité et impression finie plutôt qu'animation.
 */
export default function AnimatedCounter({ target, suffix = "" }: Props) {
  return (
    <span>
      {target.toLocaleString()}{suffix}
    </span>
  );
}
