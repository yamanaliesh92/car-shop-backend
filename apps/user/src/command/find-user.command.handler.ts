import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../db/doa/user.doa';
import { ModelMapperService } from '../db/services/modelmapper.service';

export class FindUserCommand {}

@CommandHandler(FindUserCommand)
export class FindUserCommandHandler
  implements ICommandHandler<FindUserCommand>
{
  constructor(
    private readonly userdao: UserDoa,
    private readonly modelmapper: ModelMapperService,
  ) {}

  async execute(command: FindUserCommand): Promise<any> {
    try {
      const result = await this.userdao.find();
      Logger.log('res', result);
      return result.map(this.modelmapper.modelToDto);
    } catch (Err) {
      Logger.log('error occureder in command', Err);
    }
  }
}
