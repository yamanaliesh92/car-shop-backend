import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarDoa } from '../../../db/doa/car.doa';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import { UnknownApplicationException } from '../../../error/unknow-application-exception';
import { FindCarCommand } from './find-car.coomand';

@CommandHandler(FindCarCommand)
export class FindCarCommandHandler implements ICommandHandler<FindCarCommand> {
  constructor(
    private readonly doa: CarDoa,
    private readonly modelMapper: ModelMapperServiceCar,
  ) {}

  async execute(command: FindCarCommand) {
    try {
      const result = await this.doa.find();

      return result.map(this.modelMapper.modelCarToDto);
    } catch (err) {
      throw new UnknownApplicationException(err);
    }
  }
}
