export class CreateOrderDto {
  clientId?: string; // Opcional (Consumidor Final)
  total: number;
  discount?: number; // Adicionado (pois o service usa)
  paymentType?: 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'SPLIT';

  userId: string; // <--- Novo campo: ID do Vendedor

  items: {
    productId: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
}
