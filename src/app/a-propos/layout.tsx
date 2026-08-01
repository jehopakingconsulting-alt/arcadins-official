import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — ARCADINS Training Center",
  description: "ARCADINS Training Center : organisme privé de formation professionnelle et de préparation linguistique (TEF/TCF Canada), au service des nouveaux arrivants, étudiants et professionnels.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
