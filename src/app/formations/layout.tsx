import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formations professionnelles — Marketing, Finance, Tech, RH et plus",
  description: "Formations professionnelles avec attestation de complétion : Marketing digital, Finance, Informatique, RH, Tourisme, Français des affaires et plus, en 7 langues.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
