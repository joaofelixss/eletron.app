// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module'; // <--- IMPORTAR
import { ProductsModule } from './products/products.module';
import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
    AuthModule,
  ], // <--- ADICIONAR AQUI
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
