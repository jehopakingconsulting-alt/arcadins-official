import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programmes d'immigration disponibles au Canada",
  description: "Information générale et éducative sur les programmes d'immigration au Canada, et préparation linguistique. Ne constitue pas un avis juridique en immigration.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
