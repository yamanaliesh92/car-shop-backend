import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { UserDoa } from '../db/doa/user.doa';
import { UnexpectedDataAccessException } from '../db/error/unexpeceted-data-access-exception';
import { UniqueConstraintViolationDataAccessException } from '../db/error/unique-constraint-violation.data.access.exception';
import { UserNotFoundDataAccessException } from '../db/error/user-not-found-data-access-exception';
import { ModelMapperService } from '../db/services/modelmapper.service';
import { UnknownApplicationException } from '../error/unknown.application';
import { UserAlreadyExistApplicationException } from '../error/user-already-exist.application';
import { UserNotFoundApplicationException } from '../error/user-not-found.application.exception';
import {
  mockCreateUserCommand,
  mockLoginCommand,
  mockUser,
  mockUserDto,
} from '../mock/data';

import { CreateUserCommandHandler } from './create-user-command.handler';
import { LoginCommandHandler } from './login.command.handler';

describe('createCommandHandler', () => {
  let userDoa: UserDoa;

  let commandHandler: LoginCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },

        CreateUserCommandHandler,
      ],
    }).compile();

    userDoa = await app.get(UserDoa);

    commandHandler = await app.get(CreateUserCommandHandler);
  });

  it('loginUser', async () => {
    const mockCommand = mockLoginCommand();

    const mock = mockUser();
    jest.spyOn(userDoa, 'findOne').mockResolvedValue(mock);
    const accessToken = 'dd';

    const result = await commandHandler.execute(mockCommand);

    expect(result).toBeDefined();
    expect(result.accessToken).toEqual(accessToken);
  });

  it('create user with UserNotFoundAccessException', async () => {
    const err0r = new UserNotFoundDataAccessException(
      new EntityNotFoundError('', []),
    );
    const mockCommand = mockCreateUserCommand();

    jest.spyOn(userDoa, 'findOne').mockRejectedValue(err0r);

    try {
      await commandHandler.execute(mockCommand);
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(UserNotFoundApplicationException);
      expect((err as UserNotFoundApplicationException).message).toEqual(
        'user not found',
      );
    }
  });

  it('create user with UnexpectedDataAccessException', async () => {
    const error = new UnexpectedDataAccessException(new Error('error unknown'));
    const mockCommand = mockCreateUserCommand();
    jest.spyOn(userDoa, 'findOne').mockRejectedValue(error);

    try {
      await commandHandler.execute(mockCommand);
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(UnknownApplicationException);
      expect((err as UnknownApplicationException).message).toEqual(
        'unknownError',
      );
    }
  });
});
