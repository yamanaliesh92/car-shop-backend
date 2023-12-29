import { AuthService } from './auth.service';
import { ClientKafka } from '@nestjs/microservices';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockCreateUserDto,
  mockCreateUserRespond,
  mockForegutPasswordDto,
  mockIReposeLogin,
  mockLoginDto,
  mockRespondAllUser,
  mockUpdateUserDto,
} from '../mock/mock';
import { of } from 'rxjs';

describe('test', () => {
  let clientKaka: ClientKafka;
  let authSer: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'AUTH_MICROSERVICE',
          useFactory: createMock,
        },
        AuthService,
      ],
    }).compile();

    clientKaka = await app.resolve<ClientKafka>('AUTH_MICROSERVICE');
    authSer = await app.resolve<AuthService>(AuthService);
  });

  describe('auth Service', () => {
    it('createUserSerine', async () => {
      const body = mockCreateUserDto();
      const response = mockCreateUserRespond();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await authSer.createUser(body);
      expect(result).toBeDefined();

      expect(result.email).toEqual(response.email);
      expect(result.username).toEqual(response.username);
    });

    it('login', async () => {
      const body = mockLoginDto();
      const resultLogin = mockIReposeLogin();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(resultLogin));
      const result = await authSer.Login(body);
      expect(result.token).toEqual(resultLogin.token);
    });

    it('get one user', async () => {
      const id = 12;
      const response = mockCreateUserRespond();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await authSer.getOneUser(id);
      expect(result.email).toEqual(response.email);
      expect(result.username).toEqual(response.username);
    });

    it('get all users', async () => {
      const response = mockRespondAllUser();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await authSer.getUser();
      expect(result[0].email).toEqual(response[0].email);
      expect(result[1].username).toEqual(response[1].username);
    });

    it('updateUser', async () => {
      const dto = mockUpdateUserDto();
      const resultOfUpdateUser = true;
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(resultOfUpdateUser));
      const result = await authSer.update(dto);
      expect(result).toBeTruthy();
    });

    it('forgetPassword', async () => {
      const dto = mockForegutPasswordDto();
      const resultOfUpdateUser = true;
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(resultOfUpdateUser));
      const result = await authSer.forgetPassword(dto);
      expect(result).toBeTruthy();
    });
  });
});
