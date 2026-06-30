export const REGISTRATION_FEE = 50;
export const PAYMENT_DEADLINE_DAYS = 30;

export interface InstallmentPlan {
  installments: [number, number, number];
  total: number;
}

/**
 * Splits a course price into 3 installments paid monthly: the last two are
 * always $1000, the first absorbs the remainder. The $50 registration fee
 * is paid separately, upfront, before this plan begins.
 */
export function getInstallmentPlan(price: number): InstallmentPlan {
  const recurring = 1000;
  const first = price - 2 * recurring;
  return {
    installments: [first, recurring, recurring],
    total: price,
  };
}

export function getFullPaymentTotal(price: number): number {
  return price;
}
