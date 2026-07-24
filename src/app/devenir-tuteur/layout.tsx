import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devenir tuteur TEF / TCF chez ARCADINS",
  description:
    "Rejoignez le réseau de tuteurs d'ARCADINS Training Center et accompagnez des apprenants vers la réussite au TEF et au TCF. Déposez votre candidature en ligne.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
