import type { Metadata } from "next";
import NotFoundContent from "@/components/layout/NotFoundContent";

export const metadata: Metadata = {
  title: "Page introuvable (404)",
  robots: { index: false, follow: true },
};

/**
 * 404 de marque ARCADINS Training Center. Reste un SERVER component pour pouvoir
 * exporter `metadata` et renvoyer un vrai statut 404 ; le contenu visible est
 * délégué à `NotFoundContent` (client) afin d'être traduit en 7 langues.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
