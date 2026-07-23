export const REGISTRATION_FEE = 100;
export const PAYMENT_DEADLINE_DAYS = 30;

export interface InstallmentPlan {
  installments: [number, number, number];
  total: number;
}

/**
 * Splits a course price into 3 monthly installments as evenly as possible.
 * Recurring installments are rounded down; the first installment absorbs any
 * remainder so the three always sum exactly to `price`. The $100 registration
 * fee is paid separately, upfront, before this plan begins.
 */
export function getInstallmentPlan(price: number): InstallmentPlan {
  const recurring = Math.floor(price / 3);
  const first = price - 2 * recurring;
  return {
    installments: [first, recurring, recurring],
    total: price,
  };
}

export function getFullPaymentTotal(price: number): number {
  return price;
}
