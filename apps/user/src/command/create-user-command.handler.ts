import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../db/doa/user.doa';
import { CreateUserEntityDto } from '../db/dto/createUserEntity.dto';
import { UniqueConstraintViolationDataAccessException } from '../db/error/unique-constraint-violation.data.access.exception';
import { ModelMapperService } from '../db/services/modelmapper.service';
import { UserDto } from '../dto/userDto';
import { UnknownApplicationException } from '../error/unknown.application';
import { UserAlreadyExistApplicationException } from '../error/user-already-exist.application';
import { Bcrypt } from '../shared/bc.service';

import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userDoa: UserDoa,
    private readonly modelmapper: ModelMapperService,
    private readonly bc: Bcrypt,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserDto> {
    try {
      const data: CreateUserEntityDto = {
        email: command.email,
        password: await this.bc.hashPassword(command.password),
        number: command.number,
        username: command.username,
      };
      const model = await this.userDoa.save(data);

      const result = this.modelmapper.modelToDto(model);
      return Object.assign({}, result);
    } catch (err) {
      if (err instanceof UniqueConstraintViolationDataAccessException) {
        throw new UserAlreadyExistApplicationException();
      }
      throw new UnknownApplicationException(err);
    }
  }
}
