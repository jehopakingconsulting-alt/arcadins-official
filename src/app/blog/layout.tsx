import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — TEF/TCF, immigration au Canada et formation professionnelle",
  description: "Articles et guides ARCADINS : préparation au TEF/TCF Canada, démarches d'immigration (Entrée express, PEQ), et conseils de formation professionnelle et de carrière au Canada.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
