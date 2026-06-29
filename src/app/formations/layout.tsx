import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations Certifiées — 28 Programmes Québec & Canada",
  description: "Leadership, Finance, Tech, Santé, Immigration — 28 formations certifiées reconnues au Québec et à l'international.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
