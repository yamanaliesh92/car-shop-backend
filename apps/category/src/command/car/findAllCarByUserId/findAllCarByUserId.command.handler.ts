import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarDoa } from '../../../db/doa/car.doa';
import { RecodedNotFoundExceptionError } from '../../../db/error/record-not-found.access.exception';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import { NotFoundApplicationException } from '../../../error/recoder-not-found.application.exception';
import { UnknownApplicationException } from '../../../error/unknow-application-exception';
import { FindCarByUserIdCommand } from './findAllCarByUserId.coomand';

@CommandHandler(FindCarByUserIdCommand)
export class FindCarByUserIdCommandHandler
  implements ICommandHandler<FindCarByUserIdCommand>
{
  constructor(
    private readonly doa: CarDoa,
    private readonly modelMapper: ModelMapperServiceCar,
  ) {}

  async execute(command: FindCarByUserIdCommand) {
    try {
      const result = await this.doa.find({ userId: command.userId });

      const count = await this.doa.count({ userId: command.userId });

      const cars = result.map(this.modelMapper.modelCarToDto);
      return { cars, number: count };
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
