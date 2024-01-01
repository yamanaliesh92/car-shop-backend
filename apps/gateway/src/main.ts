import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GetWayModule } from './gateway.module';
import { ResponseInterceptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(GetWayModule);

  app.enableCors({ allowedHeaders: '*', origin: '*', exposedHeaders: '*' });

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(8001);
  Logger.log('Listening on port ');
}
bootstrap();
