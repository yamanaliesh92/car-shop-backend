import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CarController } from './car.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCarCommandHandler } from './command/car/createCar/createCar.coomand.handler';
import { DeleteCarCommandHandler } from './command/car/deleteCar/deleteCar.command.handler';
import { FindCarCommandHandler } from './command/car/findAllCar/find-car.command.handler';
import { FindOneCarCommandHandler } from './command/car/findCarById/find-one-car.command.handler';
import { FindCarByCategoryCommandHandler } from './command/car/findCarByCategory/findCarByCategory.command.handler';
import { UpdateCarCommandHandler } from './command/car/updateCar/udpateCar.command.handler';

import { DbCaTegoryModule } from './db/db.module';
import { HttpModule } from '@nestjs/axios';
import { FindCarByUserIdCommandHandler } from './command/car/findAllCarByUserId/findAllCarByUserId.command.handler';
import { Partitioners } from 'kafkajs';
import { UpdateImgCommandHandler } from './command/car/update-img/update-img.command.handler';

@Module({
  imports: [
    DbCaTegoryModule,
    CqrsModule,
    HttpModule,
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          producer: { createPartitioner: Partitioners.LegacyPartitioner },
          client: {
            clientId: 'user',
            brokers: ['kafka:9092'],
          },
          consumer: {
            allowAutoTopicCreation: true,

            groupId: 'auth_id121',
          },
        },
      },
    ]),
  ],
  controllers: [CarController],
  providers: [
    CategoryService,
    FindCarCommandHandler,
    FindCarByCategoryCommandHandler,
    FindCarByUserIdCommandHandler,
    UpdateImgCommandHandler,
    UpdateCarCommandHandler,
    DeleteCarCommandHandler,
    FindOneCarCommandHandler,
    CreateCarCommandHandler,
  ],
})
export class CategoryModule {}
