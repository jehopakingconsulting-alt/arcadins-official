import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Témoignages — Ce que disent nos diplômés",
  description: "Plus de 12 400 apprenants de 47 pays formés. Témoignages en français, anglais, espagnol, créole.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
