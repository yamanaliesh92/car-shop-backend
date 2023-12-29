import {
  BadRequestException,
  NotFoundException,
  Patch,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  Body,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './command/create-user.command';
import { GetOneUserCommand } from './command/get-one-user.command';
import { LoginCommand } from './command/login.command';
import { RefreshTokenCommand } from './command/refershToken.command';
import {
  ClientKafka,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';

import { PasswordIsNotCorrectApplicationException } from './error/password-not-correct-application.exception';
import { UserAlreadyExistApplicationException } from './error/user-already-exist.application';
import { UserNotFoundApplicationException } from './error/user-not-found.application.exception';

import { RefreshAuthGuard } from './guard/refersh.auth.guard';

import { UserDto } from './dto/userDto';

import { KafkaErrorCode } from 'y/shared/error/error.code';
import { FindUserCommand } from './command/find-user.command.handler';
import { ChangePasswordCommand } from './command/change-password.command';

import { UpdateUserCommand } from './command/update.command';

interface I {
  user: {
    id: number;
  };
}
@Controller('user')
export class UserController {
  constructor(private readonly comamnd: CommandBus) {}

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: I) {
    return this.comamnd.execute(new RefreshTokenCommand({ id: req.user.id }));
  }
  // @Get()
  // @UseGuards(AuthGuard)
  @MessagePattern('user.get.one')
  async getMe(@Payload(ValidationPipe) id: number): Promise<UserDto> {
    Logger.log('id in cotttttttttttttroller', id);
    try {
      return await this.comamnd.execute(new GetOneUserCommand({ id: id }));
    } catch (err) {
      Logger.log('error in controller', err);
    }
  }

  @MessagePattern('user.login')
  async login(@Payload(ValidationPipe) body: LoginCommand) {
    try {
      return await this.comamnd.execute(
        new LoginCommand({
          email: body.email,
          password: body.password,
        }),
      );
    } catch (err) {
      if (err instanceof UserNotFoundApplicationException) {
        return { err: KafkaErrorCode.EMAIL_OR_PASSWORD_IS_NOT_CORRECT };
      }

      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('user.create')
  async sign(@Payload(ValidationPipe) body: CreateUserCommand) {
    try {
      Logger.debug(
        `Received new request for sign up ${JSON.stringify({
          body,
          password: '****',
        })}`,
      );

      return await this.comamnd.execute(
        new CreateUserCommand({
          email: body.email,
          number: body.number,
          username: body.username,
          password: body.password,
        }),
      );
    } catch (err) {
      Logger.error(
        `Error occoured while signin up ${JSON.stringify(err)}`,
        this.constructor.name,
      );

      if (err instanceof UserAlreadyExistApplicationException) {
        return { err: KafkaErrorCode.USER_ALREADY_EXIST };
      }

      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('refresh')
  async refreshToken(@Payload(ValidationPipe) body: RefreshTokenCommand) {
    try {
      return await this.comamnd.execute(
        new RefreshTokenCommand({
          id: body.id,
        }),
      );
    } catch (err) {
      Logger.error(
        `Error occoured while signin up ${JSON.stringify(err)}`,
        this.constructor.name,
      );

      if (err instanceof UserAlreadyExistApplicationException) {
        return { err: KafkaErrorCode.USER_ALREADY_EXIST };
      }

      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('user.forgot.password')
  async update(@Payload(ValidationPipe) body: ChangePasswordCommand) {
    try {
      return await this.comamnd.execute(
        new ChangePasswordCommand({
          email: body.email,
          password: body.password,
        }),
      );
    } catch (err) {
      if (err instanceof UserAlreadyExistApplicationException) {
        return { err: KafkaErrorCode.USER_ALREADY_EXIST };
      }

      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('user.update')
  async updateUser(@Payload(ValidationPipe) body: UpdateUserCommand) {
    try {
      return await this.comamnd.execute(
        new UpdateUserCommand({
          id: body.id,
          username: body.username,
          number: body.number,
        }),
      );
    } catch (err) {
      return { err: KafkaErrorCode.UNKNOWN_ERROR };
    }
  }

  @MessagePattern('user.all')
  async findAllUser() {
    return await this.comamnd.execute(new FindUserCommand());
  }
}
