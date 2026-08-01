import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide d'utilisation — Bien démarrer sur ARCADINS Training Center",
  description: "Guide pratique pour créer votre compte, choisir une formation ou une préparation TEF/TCF, suivre votre progression et obtenir votre attestation sur ARCADINS Training Center.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
