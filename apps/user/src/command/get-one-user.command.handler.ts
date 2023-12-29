import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../db/doa/user.doa';
import { UserNotFoundDataAccessException } from '../db/error/user-not-found-data-access-exception';
import { ModelMapperService } from '../db/services/modelmapper.service';
import { UserDto } from '../dto/userDto';
import { UnknownApplicationException } from '../error/unknown.application';
import { UserNotFoundApplicationException } from '../error/user-not-found.application.exception';
import { GetOneUserCommand } from './get-one-user.command';

@CommandHandler(GetOneUserCommand)
export class GetOneUserCommandHandler
  implements ICommandHandler<GetOneUserCommand>
{
  constructor(
    private readonly userDoa: UserDoa,
    private readonly modelmapper: ModelMapperService,
  ) {}

  async execute(command: GetOneUserCommand): Promise<UserDto | null> {
    try {
      const model = await this.userDoa.findOne({ id: command.id });
      const result = this.modelmapper.modelToDto(model);
      return Object.assign({}, result);
    } catch (err) {
      if (err instanceof UserNotFoundDataAccessException) {
        throw new UserNotFoundApplicationException();
      }
      throw new UnknownApplicationException(err);
    }
  }
}
