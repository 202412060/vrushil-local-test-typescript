import { roundCents } from "./money";

// Percentage discount, capped so an invoice never goes below zero.
export function applyDiscount(total: number, percent: number): number {
  const bounded = Math.min(Math.max(percent, 0), 100);
  return roundCents(total * (1 - bounded / 100));
}
