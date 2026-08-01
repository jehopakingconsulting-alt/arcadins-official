/**
 * Runtime — UI/Assessment : construction de la banque RÉELLE (SERVEUR uniquement) — Sprint K3-S.
 *
 * Ce module importe la banque privée du programme (`marketingDigitalV2Bank`, contient les bonnes réponses).
 * Il ne doit JAMAIS être importé par un composant client (`"use client"`) : la convention `.server.ts` +
 * le scan de bundle (test) garantissent qu'il reste hors des chunks navigateur. Réservé au serveur / Sprint L.
 */
import { InMemoryQuestionBank, fromBankQuestions } from "@/lib/runtime/assessment/question-bank";
import { marketingDigitalV2Bank } from "@/lib/academic/question-bank/marketing-digital-v2";

/** Banque de questions RÉELLE du programme pilote (bonnes réponses privées, restent côté serveur/moteur). */
export function buildQuizBank(): InMemoryQuestionBank {
  return new InMemoryQuestionBank(fromBankQuestions(marketingDigitalV2Bank));
}
