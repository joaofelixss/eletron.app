import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // 1. CHECAR TELEFONE
  async checkPhone(phone: string) {
    const cleanPhone = phone.replace(/\D/g, '');
    const user = await this.prisma.user.findUnique({
      where: { phone: cleanPhone },
    });

    if (user) {
      // RETORNA O USUÁRIO COMPLETO (sem a senha)
      const { password, ...result } = user;
      return { exists: true, ...result };
    } else {
      return { exists: false };
    }
  }

  // 2. ENVIAR CÓDIGO (OTP)
  async sendOtp(phone: string) {
    // Gera código de 4 dígitos
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5); // Expira em 5 min

    // Salva ou atualiza no banco
    await this.prisma.verificationCode.upsert({
      where: { phone },
      update: { code, expiresAt },
      create: { phone, code, expiresAt },
    });

    // --- AQUI VAI A LÓGICA DE ENVIO (WHATSAPP) ---
    console.log(`\n📲 [WHATSAPP MOCK] Para: ${phone} | Código: ${code} \n`);

    // TODO: Para produção, use Twilio ou Waha aqui. Exemplo Twilio:
    // await this.twilioClient.messages.create({
    //   body: `Seu código Eletron é: ${code}`,
    //   from: 'whatsapp:+14155238886',
    //   to: `whatsapp:+55${phone}`
    // });

    return { success: true };
  }

  // 3. VALIDAR CÓDIGO
  async validateOtp(phone: string, code: string) {
    const record = await this.prisma.verificationCode.findUnique({
      where: { phone },
    });

    if (!record)
      throw new BadRequestException('Código não encontrado ou expirado.');

    if (new Date() > record.expiresAt) {
      throw new BadRequestException('Código expirado. Peça um novo.');
    }

    if (record.code !== code) {
      throw new BadRequestException('Código incorreto.');
    }

    // Se passou, deleta o código para não usar de novo
    await this.prisma.verificationCode.delete({ where: { phone } });

    return { valid: true };
  }

  // Adicione dentro da classe AuthService

  async register(data: any) {
    // 1. Verifica se já existe (segurança extra)
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [{ phone: data.phone }, { email: data.email }],
      },
    });

    if (existing) {
      throw new BadRequestException(
        'Usuário já cadastrado com este telefone ou e-mail.',
      );
    }

    // 2. Cria o Usuário
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password, // Ideal: bcrypt.hash(data.password, 10)
        storeName: data.storeName,
        category: data.category,
        assistantName: data.assistantName,
        assistantStyle: data.assistantStyle,
        assistantPersonality: data.assistantPersonality,
        role: 'OWNER',
      },
    });

    return user;
  }
}
