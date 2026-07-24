import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demander un tutorat TEF / TCF",
  description:
    "Demandez un accompagnement de tutorat adapté à vos compétences et à votre niveau pour préparer le TEF ou le TCF. ARCADINS prépare aux tests, elle ne les administre pas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
