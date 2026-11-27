import { PaymentGateway } from "./gateway";

export interface Order {
  id: string;
  chargeId: string;
  status: "pending" | "captured" | "cancelled";
  capturedCents: number;
  refundedCents: number;
}

export interface OrderStore {
  get(orderId: string): Order | undefined;
  save(order: Order): void;
}

// All refund rules live here so every caller gets the same checks.
export class RefundService {
  constructor(private readonly gateway: PaymentGateway, private readonly orders: OrderStore) {}

  async refund(orderId: string, amountCents: number): Promise<string> {
    const order = this.orders.get(orderId);
    if (!order) {
      throw new Error(`order ${orderId} not found`);
    }
    if (order.status !== "captured") {
      throw new Error(`order ${orderId} is ${order.status}; only captured orders can be refunded`);
    }
    if (!Number.isInteger(amountCents) || amountCents <= 0) {
      throw new Error(`refund amount must be a positive whole number of cents, got ${amountCents}`);
    }
    if (order.refundedCents + amountCents > order.capturedCents) {
      throw new Error(`refund of ${amountCents} would exceed the captured amount of order ${orderId}`);
    }
    const refundId = await this.gateway.refund(order.chargeId, amountCents);
    order.refundedCents += amountCents;
    this.orders.save(order);
    return refundId;
  }
}
