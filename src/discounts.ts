import { roundCents } from "./money";

// Discount given as a rate (0.1 = 10%), capped so an invoice never goes below zero.
export function applyDiscount(total: number, rate: number): number {
  const bounded = Math.min(Math.max(rate, 0), 1);
  return roundCents(total * (1 - bounded));
}
