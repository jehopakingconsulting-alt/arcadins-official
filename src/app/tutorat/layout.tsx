import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plateforme de tutorat TEF & TCF — 4 compétences, 4 niveaux",
  description:
    "Tutorat encadré de préparation au TEF et au TCF, structuré par les 4 compétences de l'examen (compréhension écrite et orale, expression écrite et orale) et 4 niveaux, du débutant au supérieur. ARCADINS prépare aux tests, elle ne les administre pas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
