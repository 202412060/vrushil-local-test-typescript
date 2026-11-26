// Money helpers shared by invoices, discounts and refunds.
export const CURRENCY = "USD";

export function roundCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function formatAmount(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  return `${sign}${CURRENCY} ${Math.abs(roundCents(amount)).toFixed(2)}`;
}
