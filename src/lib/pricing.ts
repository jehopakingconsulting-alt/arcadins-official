export const REGISTRATION_FEE = 50;

export interface InstallmentPlan {
  registrationFee: number;
  installments: [number, number, number];
  total: number;
}

/**
 * Splits a course price into 3 installments: the last two are always $1000,
 * the first absorbs the remainder. A $50 registration fee is added to the
 * first installment.
 */
export function getInstallmentPlan(price: number): InstallmentPlan {
  const recurring = 1000;
  const first = price - 2 * recurring;
  return {
    registrationFee: REGISTRATION_FEE,
    installments: [first, recurring, recurring],
    total: price + REGISTRATION_FEE,
  };
}

export function getFullPaymentTotal(price: number): number {
  return price + REGISTRATION_FEE;
}
