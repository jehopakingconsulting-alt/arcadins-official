import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Témoignages",
  description: "Les avis et retours de notre communauté d'apprenants. Les témoignages sont publiés avec le consentement des personnes concernées.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
