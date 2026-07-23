import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutorat TEF / TCF — Préparation aux tests de français",
  description: "Préparation au TEF Canada et au TCF Canada : cours, exercices, simulations en conditions d'examen et coaching oral. ARCADINS prépare aux tests, elle ne les administre pas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
