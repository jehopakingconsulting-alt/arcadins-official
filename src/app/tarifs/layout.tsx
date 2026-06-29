import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs & Forfaits — Plans adaptés à chaque parcours",
  description: "Plans Starter, Professionnel et Entreprise. Paiements CAD, USD, EUR et mobile money.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
