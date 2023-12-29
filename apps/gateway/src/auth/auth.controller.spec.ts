import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockCreateUserDto,
  mockCreateUserRespond,
  mockGetOneUserRespond,
  mockIReposeLogin,
  mockLoginDto,
  mockRespondAllUser,
  mockUpdateUserDto,
} from '../mock/mock';
import { Jwt } from '../shared/jwt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('controller', () => {
  let authCtr: AuthController;
  let auth: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useFactory: createMock,
        },
        {
          provide: Jwt,
          useFactory: createMock,
        },
      ],
      controllers: [AuthController],
    }).compile();

    auth = await app.resolve<AuthService>(AuthService);
    authCtr = await app.resolve<AuthController>(AuthController);
  });

  describe('authController', () => {
    it('test createUser is done', async () => {
      const body = mockCreateUserDto();
      const responded = mockCreateUserRespond();
      jest.spyOn(auth, 'createUser').mockResolvedValue(responded);
      const result = await authCtr.create(body);
      expect(result.email).toEqual(responded.email);
    });

    it('get me', async () => {
      const response = mockGetOneUserRespond();
      const id = 1;

      jest.spyOn(auth, 'getOneUser').mockResolvedValue(response);

      const result = await authCtr.getOne(id as any);
      expect(result.email).toEqual(response.email);
      expect(result.username).toEqual(response.username);
    });

    it('updateUser', async () => {
      const body = mockUpdateUserDto();
      const responded = true;
      jest.spyOn(auth, 'update').mockResolvedValue(responded);
      const result = await authCtr.updateUser(body);
      expect(result).toBeTruthy();
    });

    it('get All user', async () => {
      const response = mockRespondAllUser();
      jest.spyOn(auth, 'getUser').mockResolvedValue(response);
      const result = await authCtr.get();
      expect(result[0].email).toEqual(response[0].email);
      expect(result[1].username).toEqual(response[1].username);
    });

    it('login', async () => {
      const body = mockLoginDto();
      const response = mockIReposeLogin();
      jest.spyOn(auth, 'Login').mockResolvedValue(response);
      const result = await authCtr.login(body);
      expect(result.token).toEqual(response.token);
    });
  });
});
