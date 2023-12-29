import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CarDoa } from '../../../db/doa/car.doa';
import { DeleteCarCommand } from './deleteCar.command';

@CommandHandler(DeleteCarCommand)
export class DeleteCarCommandHandler
  implements ICommandHandler<DeleteCarCommand>
{
  constructor(private readonly doa: CarDoa) {}

  async execute(command: DeleteCarCommand): Promise<boolean> {
    try {
      return await this.doa.delete({ id: command.id });
    } catch (err) {
      Logger.log('error here', err);
    }
  }
}
