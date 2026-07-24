// Parrainage multigénérationnel — configuration.
//
// ⚠️ DÉSACTIVÉ PAR DÉFAUT. Le programme reste invisible tant que :
//   1. le plan de rémunération n'a pas été validé juridiquement, et
//   2. les migrations de base (0003) n'ont pas été appliquées.
//
// Le plan ci-dessous est un PARAMÈTRE, pas un engagement : il ne s'applique
// qu'aux ventes réelles et payées, et uniquement si REFERRAL_ENABLED = true.

/** Interrupteur maître. Laisser à `false` tant que la validation n'est pas faite. */
export const REFERRAL_ENABLED = false;

export interface GenerationTier {
  /** 1 = parrain direct, 2 = grand-parrain, … */
  generation: number;
  /** Part de la vente reversée en commission, en pourcentage (0–100). */
  ratePercent: number;
  label: string;
}

/**
 * Plan multigénérationnel paramétrable. Les taux sont indicatifs et devront
 * être confirmés par la validation juridique/financière avant activation.
 */
export const REFERRAL_PLAN: GenerationTier[] = [
  { generation: 1, ratePercent: 10, label: "Parrain direct" },
  { generation: 2, ratePercent: 5, label: "2ᵉ génération" },
  { generation: 3, ratePercent: 2, label: "3ᵉ génération" },
];

/** Nombre de générations rémunérées (profondeur de la chaîne). */
export const MAX_GENERATIONS = REFERRAL_PLAN.length;

export function tierForGeneration(generation: number): GenerationTier | undefined {
  return REFERRAL_PLAN.find((t) => t.generation === generation);
}
