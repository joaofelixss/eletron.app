export class CreateOrderDto {
  clientId?: string; // Opcional (Consumidor Final)
  total: number;
  paymentType?: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'SPLIT';

  items: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
}
