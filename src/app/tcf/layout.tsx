import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TCF Canada — Préparation au test de connaissance du français",
  description: "Préparation au TCF Canada : compréhension et expression orales et écrites, simulations en conditions d'examen et coaching. ARCADINS prépare aux tests, elle ne les administre pas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
