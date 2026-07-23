import type { Accreditation } from "@/types";

/**
 * Accréditations / reconnaissances officielles VÉRIFIABLES.
 *
 * CONFORMITÉ — à lire avant toute modification :
 * Cette liste ne doit contenir QUE des accréditations réelles, vérifiées et
 * accompagnées d'une preuve publique (`proofUrl`). Tant qu'aucune accréditation
 * officielle n'a été obtenue et prouvée, la liste reste VIDE et la page
 * /accreditations affiche un état honnête (« en cours »). Ne jamais inventer
 * d'accréditation, de partenariat ou d'agrément gouvernemental.
 */
export const ACCREDITATIONS: Accreditation[] = [];
