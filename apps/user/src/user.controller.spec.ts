import { createMock } from '@golevelup/ts-jest';
import { CommandBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockCreateUserCommand,
  mockLoginCommand,
  mockUserDto,
  ResponseLogin,
} from './mock/data';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('controller', () => {
  let userCont: UserController;
  let command: CommandBus;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CommandBus,
          useFactory: createMock,
        },
        {
          provide: JwtService,
          useFactory: createMock,
        },
        {
          provide: UserService,
          useFactory: createMock,
        },
      ],
      controllers: [UserController],
    }).compile();

    command = await app.resolve<CommandBus>(CommandBus);
    userCont = await app.resolve<UserController>(UserController);
  });

  describe('UserController', () => {
    it('create User is done successfully', async () => {
      const body = mockCreateUserCommand();
      const response = mockUserDto();
      jest.spyOn(command, 'execute').mockResolvedValue(response);
      const result = await userCont.sign(body);
      expect(result).toBeDefined();
    });

    it('get one user is done  successfully', async () => {
      const id = 12;
      const response = mockUserDto();
      jest.spyOn(command, 'execute').mockResolvedValue(response);
      const result = await userCont.getMe(id);
      expect(result.email).toEqual(response.email);
      expect(result.updatedAt).toEqual(response.updatedAt);
      expect(result).toBeDefined();
    });

    it('login user is done  successfully', async () => {
      const body = mockLoginCommand();
      const response = ResponseLogin();
      jest.spyOn(command, 'execute').mockResolvedValue(response);
      const result = await userCont.login(body);
      expect(result.token).toEqual(response.token);
      expect(result).toBeDefined();
    });
  });
});
