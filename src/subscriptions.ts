import { applyDiscount } from "./discounts";

export interface Plan {
  name: string;
  monthlyPrice: number; // dollars
}

// Monthly price after the customer's loyalty discount (a percentage, e.g. 10 for 10%).
export function renewalPrice(plan: Plan, loyaltyPercent: number): number {
  return applyDiscount(plan.monthlyPrice, loyaltyPercent);
}

// Paying a year up front always gets 15% off.
export function annualPrice(plan: Plan): number {
  return applyDiscount(plan.monthlyPrice * 12, 15);
}
