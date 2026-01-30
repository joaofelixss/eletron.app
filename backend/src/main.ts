// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Libera o acesso para qualquer dispositivo (Celular, Web, etc)
  app.enableCors();

  // 2. O '0.0.0.0' faz o servidor escutar na rede Wi-Fi, não só no localhost
  await app.listen(3000, '0.0.0.0');

  console.log(`🚀 Server rodando! Acesse: http://localhost:3000/products`);
}
bootstrap();
