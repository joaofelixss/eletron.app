// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // <--- IMPORTAR
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [PrismaModule, ProductsModule, ClientsModule], // <--- ADICIONAR AQUI
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
