import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentType } from '@prisma/client'; // Importa o Enum do Prisma

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    // 1. Gerar Código do Pedido
    const totalOrders = await this.prisma.order.count();
    const nextCode = totalOrders + 1;

    // 2. Mapear o tipo de pagamento
    // CORREÇÃO AQUI: Adicionamos ": PaymentType" para o TypeScript entender
    let paymentEnum: PaymentType = PaymentType.PIX;

    if (dto.paymentType === 'CREDIT_CARD')
      paymentEnum = PaymentType.CREDIT_CARD;
    if (dto.paymentType === 'DEBIT_CARD') paymentEnum = PaymentType.DEBIT_CARD;
    if (dto.paymentType === 'CASH') paymentEnum = PaymentType.CASH;
    if (dto.paymentType === 'SPLIT') paymentEnum = PaymentType.SPLIT;

    // 3. Criar o Pedido no Banco
    const order = await this.prisma.order.create({
      data: {
        code: nextCode,
        total: dto.total,
        status: 'PAID',
        paymentType: paymentEnum,
        clientId: dto.clientId || null,

        // Criar Itens
        items: {
          create: dto.items.map((item) => ({
            productId: item.productId,
            name: item.name,
            quantity: item.quantity,
            price: item.unitPrice,
          })),
        },
      },
    });

    // 4. DAR BAIXA NO ESTOQUE
    for (const item of dto.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
      throw new NotFoundException('ID Inválido');

    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true, client: true },
    });

    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }

  // CORREÇÃO AQUI: Coloquei "_" antes do nome para o ESLint não reclamar que não está sendo usado
  update(id: string, _updateOrderDto: UpdateOrderDto) {
    return `Funcionalidade de editar pedido #${id} em construção`;
  }

  async remove(id: string) {
    if (!/^[0-9a-fA-F]{24}$/.test(id))
      throw new NotFoundException('ID Inválido');

    // 1. Busca o pedido para ter certeza que existe e pegar os itens
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true }, // Traz os itens junto
    });

    if (!order) throw new NotFoundException('Pedido não encontrado');

    // 2. DEVOLVER ESTOQUE (Regra de Negócio Importante!)
    // Se cancelou o pedido, o produto tem que voltar pra prateleira
    for (const item of order.items) {
      await this.prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: { increment: item.quantity }, // Aumenta o estoque
        },
      });
    }

    // 3. APAGAR OS ITENS (Correção do Erro P2014)
    // Removemos todos os itens vinculados a este ID de pedido
    await this.prisma.orderItem.deleteMany({
      where: { orderId: id },
    });

    // 4. AGORA SIM, APAGA O PEDIDO
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
