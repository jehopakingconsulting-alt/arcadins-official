import type { Testimonial, VideoItem, SlideData } from "@/types";

export const SLIDES: SlideData[] = [
  { image: "/assets/hero-canada.jpg", fallbackColor: "#0a1628", labelIcon: "🍁", labelText: "Canada · Votre destination" },
  { image: "/assets/hero-immigration-family.jpg", fallbackColor: "#0d1e10", labelIcon: "👨‍👩‍👧", labelText: "Familles · Nouveaux arrivants" },
  { image: "/assets/hero-pab.jpg", fallbackColor: "#0a1628", labelIcon: "🩺", labelText: "Métiers du soin et des services" },
  { image: "/assets/hero-classroom.jpg", fallbackColor: "#10101a", labelIcon: "🎓", labelText: "Formations professionnelles" },
  { image: "/assets/hero-students.jpg", fallbackColor: "#0f1820", labelIcon: "📚", labelText: "Apprentissage en 7 langues" },
];

// Aucun témoignage n'est affiché tant qu'aucun avis réel et vérifiable n'a été
// recueilli avec le consentement de la personne. Les témoignages inventés ont
// été retirés (conformité — publicité non trompeuse).
export const TESTIMONIALS: Testimonial[] = [];

export const VIDEOS: VideoItem[] = [
  { id: "kj6WkZFr-MY", chip: "⭐ Recommandé", title: "TEF vs TCF Canada : Lequel choisir pour l'immigration 2026 ?", desc: "Comparaison complète TEF Canada / TCF Canada pour choisir le bon test selon votre profil.", thumb: "https://img.youtube.com/vi/kj6WkZFr-MY/hqdefault.jpg" },
  { id: "5evAnxEm9fQ", chip: "📋 TEF/TCF 2024", title: "TEF, TCF, TEFAQ — Nouveau format 2024 pour l'immigration Canada", desc: "Analyse complète du nouveau format des examens TEF et TCF Canada 2024.", thumb: "https://img.youtube.com/vi/5evAnxEm9fQ/hqdefault.jpg" },
  { id: "ewinNomlrtU", chip: "🎓 Structure TEF", title: "Structure complète de l'examen TEF Canada 2025 — Guide mis à jour", desc: "De zéro au CLB 7 en moins de 12 mois : tout sur la structure du TEF Canada 2025.", thumb: "https://img.youtube.com/vi/ewinNomlrtU/hqdefault.jpg" },
  { id: "Sp_xEMrgd3c", chip: "✍️ Expression Écrite", title: "TEF Canada 2025 — Modèle Expression Écrite C1/C2 corrigé", desc: "Modèle complet d'examen officiel TEF Canada avec corrigé détaillé.", thumb: "https://img.youtube.com/vi/Sp_xEMrgd3c/hqdefault.jpg" },
  { id: "upK5cKYXbS4", chip: "🍁 Immigration 2025", title: "Projections immigration Canada 2025 — Entrée Express, PNP et plus", desc: "Analyse des objectifs d'immigration Canada 2025 : Entrée Express et programmes provinciaux.", thumb: "https://img.youtube.com/vi/upK5cKYXbS4/hqdefault.jpg" },
  { id: "MwKgBqpWt-g", chip: "📰 Actualités IRCC", title: "Immigration Canada 2024 — 3 mises à jour essentielles", desc: "Les trois changements majeurs de la politique d'immigration canadienne en 2024.", thumb: "https://img.youtube.com/vi/MwKgBqpWt-g/hqdefault.jpg" },
];
