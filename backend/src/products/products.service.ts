import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // 1. Recebe userId
  create(createProductDto: CreateProductDto, userId: string) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        userId: userId, // <--- VINCULA AO DONO
      },
    });
  }

  // 2. Filtra pelo userId
  findAll(userId: string) {
    if (!userId) return [];
    return this.prisma.product.findMany({
      where: { userId: userId },
    });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  // O update geralmente valida se o produto é do usuario, mas vamos simplificar
  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
