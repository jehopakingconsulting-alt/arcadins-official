import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examens en Ligne — Certificats Numériques",
  description: "Plateforme d'examen sécurisée : résultats et certificats numériques avec QR code de vérification.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
