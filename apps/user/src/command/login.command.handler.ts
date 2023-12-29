import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDoa } from '../db/doa/user.doa';

import { UserNotFoundDataAccessException } from '../db/error/user-not-found-data-access-exception';

import { PasswordIsNotCorrectApplicationException } from '../error/password-not-correct-application.exception';
import { UnknownApplicationException } from '../error/unknown.application';
import { UserNotFoundApplicationException } from '../error/user-not-found.application.exception';
import { Bcrypt } from '../shared/bc.service';
import { Jwt, PayloadTokenData } from '../shared/jwt.service';
import { LoginCommand } from './login.command';

const EXPIR_TIME = 20 * 1000;

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly doa: UserDoa,
    private readonly bc: Bcrypt,
    private readonly jwt: Jwt,
  ) {}

  async execute(command: LoginCommand) {
    try {
      const user = await this.doa.findOne({ email: command.email });

      const correctPassword = await this.bc.comparePassword(
        command.password,
        user.password,
      );

      if (!correctPassword) {
        Logger.log('correct password', { correctPassword });
        throw new InternalServerErrorException(
          'email or password is not correct try again',
        );
      }

      const payload: PayloadTokenData = {
        id: user.id,
      };
      const token = await this.jwt.sign(payload);

      // const expireIn = new Date().setTime(new Date().getTime() + EXPIR_TIME);

      const refreshToken = await this.jwt.refresh(payload);

      // return {
      //   user: find,
      //   backendToken: { signToken, refreshToken },
      //   expire: expireIn,
      // };
      // return Object.assign({}, token);
      return Object.assign(
        {},
        { accessToken: token, refreshToken: refreshToken },
      );
    } catch (err) {
      if (err instanceof UserNotFoundDataAccessException) {
        throw new UserNotFoundApplicationException();
      }
      throw new UnknownApplicationException(err);
    }
  }
}
