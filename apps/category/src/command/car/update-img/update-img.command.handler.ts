import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnknownApplicationException } from 'apps/category/src/error/unknow-application-exception';
import { CarDoa } from '../../../db/doa/car.doa';

import { UpdateImgCommand } from './update.img.command';

@CommandHandler(UpdateImgCommand)
export class UpdateImgCommandHandler
  implements ICommandHandler<UpdateImgCommand>
{
  constructor(private readonly doa: CarDoa) {}

  async execute(command: UpdateImgCommand) {
    try {
      const id = command.id;
      return await this.doa.update(id, { img: command.img });
    } catch (err) {
      throw new UnknownApplicationException(err);
    }
  }
}
