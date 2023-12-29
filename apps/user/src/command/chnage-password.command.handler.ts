import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../db/doa/user.doa';
import { Bcrypt } from '../shared/bc.service';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly userdoa: UserDoa, private readonly bc: Bcrypt) {}

  async execute(command: ChangePasswordCommand): Promise<boolean> {
    try {
      const newPassword = await this.bc.hashPassword(command.password);
      return await this.userdoa.update(
        { email: command.email },
        { password: newPassword },
      );
    } catch (err) {
      Logger.log('erro in command', err);
    }
  }
}
