import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DeleteCarCommand } from './command/car/deleteCar/deleteCar.command';
import { FindCarCommand } from './command/car/findAllCar/find-car.coomand';
import { FindOneCarCommand } from './command/car/findCarById/find-one-car.command';
import { FindCarByCategoryCommand } from './command/car/findCarByCategory/findCarByCategory.command';

import { NotFoundApplicationException } from './error/recoder-not-found.application.exception';
import { CreateCarCommand } from './command/car/createCar/createCar.command';

import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindCarByUserIdCommand } from './command/car/findAllCarByUserId/findAllCarByUserId.coomand';
import { UpdateCarCommand } from './command/car/updateCar/updateCar.command';
import { KafkaErrorCode } from 'y/shared/error/error.code';
import { UpdateImgCommand } from './command/car/update-img/update.img.command';

@Controller('car')
export class CarController {
  constructor(private readonly commanbus: CommandBus) {}

  @MessagePattern('car.get.all')
  async findAll(@Payload(ValidationPipe) page: number) {
    try {
      return await this.commanbus.execute(new FindCarCommand());
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('user.get.cars')
  async GetByUserId(@Payload(ValidationPipe) userId: number) {
    try {
      return await this.commanbus.execute(
        new FindCarByUserIdCommand({ userId: userId }),
      );
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('car.get.by.category')
  async getAll(@Payload(ValidationPipe) category: string) {
    try {
      return await this.commanbus.execute(
        new FindCarByCategoryCommand({ category: category }),
      );
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('car.get.one')
  async FindOne(@Payload(ValidationPipe) id: number) {
    try {
      return await this.commanbus.execute(new FindOneCarCommand({ id }));
    } catch (err) {
      if (err instanceof NotFoundApplicationException) {
        return { err: KafkaErrorCode.CAR_NOT_FOUND };
      }

      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('car.delete')
  async DeleteOneCar(@Payload(ValidationPipe) id: number) {
    try {
      Logger.log('Del', id);
      return await this.commanbus.execute(new DeleteCarCommand({ id: id }));
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('car.update')
  async updateCar(@Payload(ValidationPipe) body: UpdateCarCommand) {
    try {
      Logger.log('update', body);
      return await this.commanbus.execute(
        new UpdateCarCommand({
          id: body.id,
          carColor: body.carColor,
          category: body.category,
          type: body.type,
          price: body.price,
          sell: body.sell,
          transmission: body.transmission,
          make: body.make,
          name: body.name,
          year: body.year,
          cylinders: body.cylinders,
        }),
      );
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('car.update.img')
  async updateImg(@Payload(ValidationPipe) body: UpdateImgCommand) {
    try {
      Logger.log('updateImg', { img: body.img });
      return await this.commanbus.execute(
        new UpdateImgCommand({
          id: body.id,
          img: body.img,
        }),
      );
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  @MessagePattern('car.create')
  async create(@Body() body: CreateCarCommand) {
    Logger.log('here idddddddddddddddddddddn try', { body });

    try {
      return await this.commanbus.execute(
        new CreateCarCommand({
          userId: body.userId,
          cylinders: body.cylinders,
          year: body.year,
          make: body.make,
          category: body.category,
          transmission: body.transmission,
          carColor: body.carColor,
          type: body.type,
          sell: body.sell,
          img: body.img,
          price: body.price,
          name: body.name,
        }),
      );
    } catch (err) {
      Logger.log('error in controller', { err });
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }
}
