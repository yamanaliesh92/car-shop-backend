import { Module } from '@nestjs/common';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaErrorMapperService } from 'y/shared/error/error.service';
import { Jwt } from '../shared/jwt.service';
import { AuthController } from './auth.controller';
import { Partitioners } from 'kafkajs';

import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,

        options: {
          producer: { createPartitioner: Partitioners.LegacyPartitioner },

          client: {
            clientId: 'auth',
            brokers: ['kafka:9092'],
          },
          consumer: {
            allowAutoTopicCreation: true,

            groupId: 'auth.id',
          },
        },
      },
    ]),
  ],
  providers: [AuthService, JwtService, Jwt, KafkaErrorMapperService],
  controllers: [AuthController],
  exports: [AuthService, Jwt, KafkaErrorMapperService],
})
export class AuthModule {}
