import { LineItem, invoiceTotal } from "../invoice";
import { PaymentGateway } from "./gateway";

export interface CheckoutRequest {
  items: LineItem[];
  discountPercent: number;
  cardToken: string;
}

// Charge the customer's card for the invoice and return the charge id.
export async function checkout(gateway: PaymentGateway, request: CheckoutRequest): Promise<string> {
  const total = invoiceTotal(request.items, request.discountPercent);
  return gateway.charge(total, request.cardToken);
}
