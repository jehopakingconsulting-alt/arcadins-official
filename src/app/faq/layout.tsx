import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur les formations, le TEF/TCF et l'immigration",
  description: "Réponses aux questions fréquentes sur les formations professionnelles ARCADINS, la préparation au TEF/TCF Canada, les tarifs, l'inscription et l'immigration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
