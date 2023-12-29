import { FindCarByCategoryCommand } from './findCarByCategory.command';

import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarDoa } from '../../../db/doa/car.doa';
import { RecodedNotFoundExceptionError } from '../../../db/error/record-not-found.access.exception';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import { NotFoundApplicationException } from '../../../error/recoder-not-found.application.exception';
import { UnknownApplicationException } from '../../../error/unknow-application-exception';
import { CarDto } from 'apps/category/src/dto/car.dto';

@CommandHandler(FindCarByCategoryCommand)
export class FindCarByCategoryCommandHandler
  implements ICommandHandler<FindCarByCategoryCommand>
{
  constructor(
    private readonly doa: CarDoa,
    private readonly modelMapper: ModelMapperServiceCar,
  ) {}

  async execute(command: FindCarByCategoryCommand): Promise<CarDto[]> {
    try {
      Logger.log({ coo: command.category });
      const result = await this.doa.find({
        category: command.category,
      });

      Logger.log('res', { result });

      return result.map(this.modelMapper.modelCarToDto);
    } catch (err) {
      if (err instanceof RecodedNotFoundExceptionError) {
        Logger.log('error here in service', err);
        throw new NotFoundApplicationException('not found');
      }
      console.log('err', err);

      throw new UnknownApplicationException(err);
    }
  }
}
