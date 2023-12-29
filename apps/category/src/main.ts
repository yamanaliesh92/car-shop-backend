// import { NestFactory } from '@nestjs/core';
// import { CategoryModule } from './category.module';

// async function bootstrap() {
//   const app = await NestFactory.create(CategoryModule);
//   app.enableCors({ allowedHeaders: '*', origin: '*' });
//   await app.listen(5000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';

// async function bootstrap() {
//   const app = await NestFactory.create(ProductModule);
//   await app.listen(7000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(CategoryModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'category',
        brokers: ['kafka:9092'],
      },
    },
  });
  await app.listen();
}
bootstrap();
