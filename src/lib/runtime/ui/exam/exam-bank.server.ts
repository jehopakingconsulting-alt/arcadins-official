/**
 * Runtime — UI/Exam : construction de la banque RÉELLE (SERVEUR uniquement) — Sprint K3-S.
 *
 * Importe la banque privée du programme (`marketingDigitalV2Bank`, bonnes réponses incluses). Ne doit JAMAIS
 * être importé par un composant client : convention `.server.ts` + scan de bundle garantissent qu'il reste
 * hors des chunks navigateur. Réservé au serveur / Sprint L.
 */
import { InMemoryQuestionBank, fromBankQuestions } from "@/lib/runtime/assessment/question-bank";
import { marketingDigitalV2Bank } from "@/lib/academic/question-bank/marketing-digital-v2";

/** Banque de questions RÉELLE du programme pilote (bonnes réponses privées, restent côté serveur/moteur). */
export function buildExamBank(): InMemoryQuestionBank {
  return new InMemoryQuestionBank(fromBankQuestions(marketingDigitalV2Bank));
}
