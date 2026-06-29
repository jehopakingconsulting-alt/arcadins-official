import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TEF / TCF Canada — Préparation aux tests de français",
  description: "Préparation complète TEF Canada et TCF Canada pour l'immigration. Taux de réussite 96%. Cours, simulations, coaching oral.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
