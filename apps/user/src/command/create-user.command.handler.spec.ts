import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { QueryFailedError } from 'typeorm';
import { UserDoa } from '../db/doa/user.doa';
import { UnexpectedDataAccessException } from '../db/error/unexpeceted-data-access-exception';
import { UniqueConstraintViolationDataAccessException } from '../db/error/unique-constraint-violation.data.access.exception';
import { ModelMapperService } from '../db/services/modelmapper.service';
import { UnknownApplicationException } from '../error/unknown.application';
import { UserAlreadyExistApplicationException } from '../error/user-already-exist.application';
import { mockCreateUserCommand, mockUser, mockUserDto } from '../mock/data';

import { CreateUserCommandHandler } from './create-user-command.handler';

describe('createCommandHandler', () => {
  let userDoa: UserDoa;

  let modelMapper: ModelMapperService;
  let commandHandler: CreateUserCommandHandler;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: UserDoa, useFactory: createMock },
        { provide: ModelMapperService, useFactory: createMock },

        CreateUserCommandHandler,
      ],
    }).compile();

    userDoa = await app.get(UserDoa);

    modelMapper = app.get(ModelMapperService);
    commandHandler = await app.get(CreateUserCommandHandler);
  });

  it('createUser', async () => {
    const mock = mockUser();
    const mockCommand = mockCreateUserCommand();
    const userDto = mockUserDto();

    jest.spyOn(userDoa, 'save').mockResolvedValue(mock);

    jest.spyOn(modelMapper, 'modelToDto').mockReturnValue(userDto);

    const result = await commandHandler.execute(mockCommand);
    console.log(result);

    expect(result).toBeDefined();
  });

  it('create user with UniqueConstraintViolationDataAccessException', async () => {
    const err0r = new UniqueConstraintViolationDataAccessException(
      new QueryFailedError('', [], {}),
    );
    const userDto = mockUserDto();
    const mockCommand = mockCreateUserCommand();
    jest.spyOn(userDoa, 'save').mockRejectedValue(err0r);
    jest.spyOn(modelMapper, 'modelToDto').mockReturnValue(userDto);

    try {
      await commandHandler.execute(mockCommand);
    } catch (err) {
      console.log(err);
      expect(err).toBeInstanceOf(UserAlreadyExistApplicationException);
      expect((err as UserAlreadyExistApplicationException).message).toEqual(
        'user Already exist',
      );
    }
  });

  it('create user with UnexpectedDataAccessException', async () => {
    const error = new UnexpectedDataAccessException(new Error('error unknown'));
    const userDto = mockUserDto();

    const mockCommand = mockCreateUserCommand();
    jest.spyOn(userDoa, 'save').mockRejectedValue(error);
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
