import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModule, getSkill, getLevel, allModuleParams } from "@/lib/data/tutorat";
import ModuleView from "./ModuleView";

export function generateStaticParams() {
  return allModuleParams();
}

export async function generateMetadata(
  { params }: { params: Promise<{ skill: string; level: string }> }
): Promise<Metadata> {
  const { skill, level } = await params;
  const s = getSkill(skill);
  const l = getLevel(level);
  if (!s || !l) return { title: "Tutorat TEF & TCF" };
  return {
    title: `${s.labelFr} — niveau ${l.labelFr} (${l.cefr}) · Tutorat TEF & TCF`,
    description: `Module de tutorat ARCADINS : ${s.labelFr} au niveau ${l.labelFr} (${l.cefr}, ${l.clb}). Objectifs, stratégies et tâche d'entraînement type pour préparer le TEF et le TCF.`,
  };
}

export default async function Page(
  { params }: { params: Promise<{ skill: string; level: string }> }
) {
  const { skill, level } = await params;
  const mod = getModule(skill, level);
  const s = getSkill(skill);
  const l = getLevel(level);
  if (!mod || !s || !l) notFound();

  return <ModuleView skillId={s.id} levelId={l.id} cefr={l.cefr} clb={l.clb} module={mod} />;
}
