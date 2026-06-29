import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Examens en Ligne — Certificats Numériques",
  description: "Plateforme LMS sécurisée avec proctoring IA, résultats instantanés et certificats numériques avec QR code.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
