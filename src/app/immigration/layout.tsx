import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Immigration Canada — Accompagnement Complet",
  description: "De la préparation linguistique à l'installation au Québec, Manitoba ou Ontario. Partenaire IRCC.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
