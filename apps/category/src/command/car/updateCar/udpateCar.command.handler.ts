import { HttpService } from '@nestjs/axios';
import { HttpServer, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { lastValueFrom } from 'rxjs';
import { CarDoa } from '../../../db/doa/car.doa';
import { UpdateCarEntityDto } from '../../../db/dto/updateCarEntity.doa';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import { UpdateCarCommand } from './updateCar.command';

@CommandHandler(UpdateCarCommand)
export class UpdateCarCommandHandler
  implements ICommandHandler<UpdateCarCommand>
{
  constructor(
    private readonly doa: CarDoa,
    private readonly http: HttpService,
  ) {}

  async execute(command: UpdateCarCommand): Promise<boolean> {
    try {
      Logger.log('name', { command });
      const dataUpdate = {
        year: command.year,
        cylinders: command.cylinders,
        make: command.make,
        carColor: command.carColor,
        price: command.price,
        name: command.name,
        sell: command.sell,
        transmission: command.transmission,
        type: command.type,
        category: command.category,
      };

      return await this.doa.update(command.id, dataUpdate);
    } catch (err) {
      Logger.log('Erro herre', err);
    }
  }
}
