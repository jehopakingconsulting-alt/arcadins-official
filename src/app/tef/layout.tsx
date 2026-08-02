import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TEF Canada — Programme de préparation pour l'immigration",
  description: "Programme de préparation au TEF Canada : 4 compétences, 4 niveaux (NCLC 1–12), tutorat encadré, simulations et coaching. ARCADINS prépare à l'examen, elle ne l'administre pas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
