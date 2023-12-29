import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
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
  mockGetOneUserCommand,
  mockUser,
  mockUserDto,
} from '../mock/data';
import { JwtService } from '../shared/jwt.service';
import { GetOneUserCommandHandler } from './get-one-user.command.handler';

describe('getdHandler', () => {
  let userDoa: UserDoa;
  let modelMapper: ModelMapperService;
  let commandHandler: GetOneUserCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },
        { provide: ModelMapperService, useFactory: createMock },

        GetOneUserCommandHandler,
      ],
    }).compile();

    userDoa = await app.get(UserDoa);
    modelMapper = await app.get(ModelMapperService);
    commandHandler = await app.get(GetOneUserCommandHandler);
  });

  it('dd', async () => {
    const mock = mockUser();
    const mockCommand = mockGetOneUserCommand();
    const userDto = mockUserDto();

    jest.spyOn(userDoa, 'findOne').mockResolvedValue(mock);

    jest.spyOn(modelMapper, 'modelToDto').mockReturnValue(userDto);

    const result = await commandHandler.execute(mockCommand);
    console.log(result);

    expect(result).toBeDefined();
  });

  it('dd', async () => {
    const err0r = new UserNotFoundDataAccessException(
      new QueryFailedError('', [], {}),
    );
    const userDto = mockUserDto();
    const mockCommand = mockGetOneUserCommand();
    jest.spyOn(userDoa, 'findOne').mockRejectedValue(err0r);
    jest.spyOn(modelMapper, 'modelToDto').mockReturnValue(userDto);

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

  it('ddd', async () => {
    const error = new UnexpectedDataAccessException(new Error('error unknown'));
    const userDto = mockUserDto();
    const mockCommand = mockGetOneUserCommand();
    jest.spyOn(userDoa, 'findOne').mockRejectedValue(error);
    jest.spyOn(modelMapper, 'modelToDto').mockReturnValue(userDto);

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
