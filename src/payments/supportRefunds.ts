import { RefundService } from "./refundService";

export interface SupportTicket {
  id: string;
  orderId: string;
  amountCents: number;
  agent: string;
}

// Refund what the support agent approved on the ticket.
export async function refundFromTicket(service: RefundService, ticket: SupportTicket): Promise<string> {
  const refundId = await service.refund(ticket.orderId, ticket.amountCents);
  return `Ticket ${ticket.id}: refund ${refundId} issued by ${ticket.agent}`;
}
