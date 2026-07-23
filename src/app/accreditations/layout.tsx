import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accréditations & reconnaissances — Transparence",
  description: "Notre position en toute transparence : nous n'affichons que des reconnaissances officielles réelles et vérifiables. ARCADINS est un organisme privé de formation, non gouvernemental et non centre d'examen officiel.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
