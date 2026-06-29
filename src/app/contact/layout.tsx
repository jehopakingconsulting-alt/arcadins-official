import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Parlons de votre projet",
  description: "Contactez notre équipe multilingue pour une consultation gratuite. Réponse garantie sous 24h.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
