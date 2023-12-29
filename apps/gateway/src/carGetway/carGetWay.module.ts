import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Partitioners } from 'kafkajs';
import { KafkaErrorMapperService } from 'y/shared/error/error.service';
import { Jwt } from '../shared/jwt.service';
import { CarGetWayController } from './carGetWay.controller';
import { CarGetWayService } from './carGetWay.service';
import { CategoryGetWayController } from './category.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_MICROSERVICE',

        transport: Transport.KAFKA,
        options: {
          producer: { createPartitioner: Partitioners.LegacyPartitioner },
          // producerOnlyMode: true,

          client: {
            clientId: 'category',
            brokers: ['kafka:9092'],
          },
          consumer: {
            allowAutoTopicCreation: true,
            groupId: 'prod.id',
          },
        },
      },
    ]),
  ],
  providers: [CarGetWayService, JwtService, Jwt, KafkaErrorMapperService],
  controllers: [CarGetWayController, CategoryGetWayController],
})
export class ProductGetWayModule {}
