import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarDto } from 'apps/category/src/dto/car.dto';
import { CarDoa } from '../../../db/doa/car.doa';
import { RecodedNotFoundExceptionError } from '../../../db/error/record-not-found.access.exception';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import { NotFoundApplicationException } from '../../../error/recoder-not-found.application.exception';
import { UnknownApplicationException } from '../../../error/unknow-application-exception';
import { FindOneCarCommand } from './find-one-car.command';

@CommandHandler(FindOneCarCommand)
export class FindOneCarCommandHandler
  implements ICommandHandler<FindOneCarCommand>
{
  constructor(
    private readonly doa: CarDoa,
    private readonly modelMapper: ModelMapperServiceCar,
  ) {}

  async execute(command: FindOneCarCommand): Promise<CarDto | null> {
    try {
      const model = await this.doa.findOne({ id: command.id });

      const result = this.modelMapper.modelCarToDto(model);
      return Object.assign({}, result);
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
