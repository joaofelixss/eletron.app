// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // 1. Criar Produto
  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // 2. Listar Todos
  async findAll() {
    return this.prisma.product.findMany();
  }

  // 3. Buscar um pelo ID
  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // 4. Atualizar
  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // 5. Deletar
  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
