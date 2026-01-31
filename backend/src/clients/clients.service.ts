import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  // 1. Adicionado userId
  create(createClientDto: CreateClientDto, userId: string) {
    return this.prisma.client.create({
      data: {
        ...createClientDto,
        userId: userId, // <--- VINCULA AO DONO
      },
    });
  }

  // 2. Filtra pelo userId
  findAll(userId: string) {
    return this.prisma.client.findMany({
      where: { userId: userId },
    });
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({ where: { id } });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  remove(id: string) {
    return this.prisma.client.delete({ where: { id } });
  }
}
