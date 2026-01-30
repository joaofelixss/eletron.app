// backend/src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'; // <--- Adicione NotFoundException
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  // --- AQUI ESTÁ A CORREÇÃO ---
  async findOne(id: string) {
    // 1. Verifica se o ID tem cara de MongoDB (24 caracteres hexadecimais)
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);

    if (!isMongoId) {
      // Se o ID for "1", "abc", ou qualquer coisa inválida, lança erro 404 direto
      // Isso impede que o Prisma tente consultar e quebre o servidor
      throw new NotFoundException(`ID inválido: ${id}`);
    }

    // 2. Se o formato for válido, tenta buscar
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto não encontrado.`);
    }

    return product;
  }
  // -----------------------------

  async update(id: string, updateProductDto: UpdateProductDto) {
    // Mesma validação aqui para prevenir erro no Update
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
    if (!isMongoId) throw new NotFoundException(`ID inválido.`);

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    // Mesma validação aqui
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(id);
    if (!isMongoId) throw new NotFoundException(`ID inválido.`);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
