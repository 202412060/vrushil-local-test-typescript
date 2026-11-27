export interface HttpClient {
  post(path: string, body: unknown): Promise<{ id: string }>;
}

// Thin client for the card processor.
export class PaymentGateway {
  constructor(private readonly http: HttpClient) {}

  // amount is in the smallest currency unit (cents): 1999 charges $19.99.
  async charge(amount: number, cardToken: string): Promise<string> {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error(`charge amount must be a positive whole number of cents, got ${amount}`);
    }
    const result = await this.http.post("/v1/charges", { amount, currency: "usd", source: cardToken });
    return result.id;
  }

  async refund(chargeId: string, amount: number): Promise<string> {
    const result = await this.http.post("/v1/refunds", { charge: chargeId, amount });
    return result.id;
  }
}
