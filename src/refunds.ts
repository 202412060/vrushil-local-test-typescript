import { formatAmount } from "./money";

export function refundNotice(orderId: string, amount: number): string {
  return `Refund of ${formatAmount(amount)} issued for order ${orderId}.`;
}
