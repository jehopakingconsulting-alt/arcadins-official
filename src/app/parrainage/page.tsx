import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { REFERRAL_ENABLED } from "@/lib/data/referral-config";
import ParrainageView from "./ParrainageView";

export const metadata: Metadata = {
  title: "Programme de parrainage — ARCADINS",
  description:
    "Parrainez vos proches vers la réussite au TEF/TCF. Les commissions sont générées uniquement sur des ventes réelles et payées.",
};

export default function ParrainagePage() {
  // Programme invisible tant qu'il n'est pas activé (validation juridique + migration).
  if (!REFERRAL_ENABLED) notFound();
  return <ParrainageView />;
}
