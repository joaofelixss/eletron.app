// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso faz o Prisma ficar disponível no app todo sem precisar importar toda hora
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
