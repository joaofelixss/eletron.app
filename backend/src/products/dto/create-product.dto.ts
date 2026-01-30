// src/products/dto/create-product.dto.ts
export class CreateProductDto {
  name: string;
  description?: string;
  sku?: string;
  imageUrl?: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock?: number;
  category?: string;
  brand?: string;
}
