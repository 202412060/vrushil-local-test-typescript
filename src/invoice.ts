import { formatAmount, roundCents } from "./money";
import { applyDiscount } from "./discounts";

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export function lineTotal(item: LineItem): number {
  return roundCents(item.quantity * item.unitPrice);
}

export function invoiceTotal(items: LineItem[], discountPercent = 0): number {
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);
  return applyDiscount(subtotal, discountPercent);
}

export function renderInvoice(items: LineItem[], discountPercent = 0): string {
  const lines = items.map((item) => `${item.description} x${item.quantity}: ${formatAmount(lineTotal(item))}`);
  lines.push(`Total: ${formatAmount(invoiceTotal(items, discountPercent))}`);
  return lines.join("\n");
}
