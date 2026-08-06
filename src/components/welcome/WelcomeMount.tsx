"use client";

import dynamic from "next/dynamic";

/**
 * Monte la Welcome Experience en CLIENT UNIQUEMENT (`ssr: false`) et en lazy :
 * - jamais rendue côté serveur → aucun impact SEO, aucun CLS (hors flux du document) ;
 * - chargée à la demande → n'alourdit pas le bundle initial des pages.
 * La logique d'éligibilité (1re visite / 30 jours) vit dans WelcomeExperience.
 */
const WelcomeExperience = dynamic(() => import("./WelcomeExperience"), { ssr: false });

export default function WelcomeMount() {
  return <WelcomeExperience />;
}
