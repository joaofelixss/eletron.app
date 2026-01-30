import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: string) {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
      throw new NotFoundException('ID Inválido');

    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) throw new NotFoundException('Cliente não encontrado');
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
      throw new NotFoundException('ID Inválido');

    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: string) {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
      throw new NotFoundException('ID Inválido');

    return this.prisma.client.delete({
      where: { id },
    });
  }
}
