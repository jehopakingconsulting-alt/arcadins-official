import type { Metadata } from "next";

// Métadonnées SEO PROPRES au TCF Canada (aucune réutilisation du titre/description TEF).
// Les canonicals + hreflang sont émis par le root layout (localeAlternates).
export const metadata: Metadata = {
  title: "TCF Canada — Préparation au Test de Connaissance du Français",
  description:
    "Préparation au TCF Canada pour l'immigration au Canada et au Québec (PEQ/MIFI) : 4 épreuves (CO, CE, EE, EO), tutorat encadré, préparation Québec et simulations. ARCADINS prépare à l'examen, elle ne l'administre pas.",
  keywords: ["TCF Canada", "Test de Connaissance du Français", "immigration Canada", "PEQ", "MIFI", "NCLC", "CECRL", "Entrée express"],
  openGraph: {
    type: "website",
    title: "TCF Canada — Préparation au Test de Connaissance du Français | ARCADINS",
    description:
      "Programme structuré de préparation au TCF Canada : 4 épreuves, tutorat encadré, préparation PEQ/MIFI et simulations. Reconnu IRCC et MIFI.",
    siteName: "ARCADINS Training Center",
  },
  twitter: {
    card: "summary_large_image",
    title: "TCF Canada — Préparation | ARCADINS Training Center",
    description:
      "Préparation au TCF Canada : 4 épreuves, tutorat encadré, préparation Québec (PEQ/MIFI) et simulations indicatives.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
