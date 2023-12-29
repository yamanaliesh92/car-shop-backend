import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../db/doa/user.doa';
import { Bcrypt } from '../shared/bc.service';

import { UpdateUserCommand } from './update.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(private readonly userdoa: UserDoa, private readonly bc: Bcrypt) {}

  async execute(command: UpdateUserCommand): Promise<boolean> {
    try {
      return await this.userdoa.update(
        { id: command.id },
        { number: command.number, username: command.username },
      );
    } catch (err) {
      Logger.log('erro in command', err);
    }
  }
}
