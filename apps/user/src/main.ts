import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.create(UserModule);
//   app.enableCors({ allowedHeaders: '*', origin: '*' });
//   await app.listen(4001);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
      },
    },
  });
  await app.listen();
}
bootstrap();
