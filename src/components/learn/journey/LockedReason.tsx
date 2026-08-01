import { LockedState } from "@/components/learn/LockedState";

/** Affiche la raison de verrouillage (Sprint J). Toujours fournie par le moteur (prop). */
export function LockedReason({ reasonCode }: { reasonCode: string | null }) {
  return <LockedState reasonCode={reasonCode} />;
}
