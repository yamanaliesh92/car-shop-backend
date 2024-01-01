import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { lastValueFrom } from 'rxjs';
import { KafkaErrorMapperService } from 'y/shared/error/error.service';
import { ForgetPasswordUserDto } from '../dto/changePasswordUser.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { IResponseCreateUser } from '../types';

@Injectable()
export class AuthService {
  changePassword(body: ForgetPasswordUserDto, id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @Inject('AUTH_MICROSERVICE')
    private readonly authClient: ClientKafka,
    private readonly mapperError: KafkaErrorMapperService,
  ) {}

  async onModuleInit() {
    this.authClient.subscribeToResponseOf('user.get.one');
    this.authClient.subscribeToResponseOf('user.create');
    this.authClient.subscribeToResponseOf('user.forgot.password');
    this.authClient.subscribeToResponseOf('user.login');
    this.authClient.subscribeToResponseOf('user.all');
    this.authClient.subscribeToResponseOf('refresh');

    await this.authClient.connect();
  }

  async getOneUser(id: number): Promise<IResponseCreateUser | null> {
    try {
      const result = await lastValueFrom(
        this.authClient.send('user.get.one', id),
      );
      if (result.err) {
        this.mapperError.map(result.err);
      }
      return result;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async Refresh(id: number) {
    try {
      const result = await lastValueFrom(this.authClient.send('refresh', id));
      if (result.err) {
        this.mapperError.map(result.err);
      }
      return result;
    } catch (err) {
      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async getUser(): Promise<IResponseCreateUser[] | null> {
    try {
      const result = await lastValueFrom(this.authClient.send('user.all', {}));
      if (result.err) {
        this.mapperError.map(result.err);
      }
      return result;
    } catch (err) {
      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async createUser(body: CreateUserDto): Promise<IResponseCreateUser> {
    try {
      const result = await lastValueFrom(
        this.authClient.send('user.create', JSON.stringify(body)),
      );
      if (result.err) {
        this.mapperError.map(result.err);
      }

      return result;
    } catch (err) {
      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException('some thing went wromg');
    }
  }

  async forgetPassword(body: ForgetPasswordUserDto) {
    try {
      const result = await lastValueFrom(
        this.authClient.send('user.forgot.password', body),
      );
      if (result.err) {
        this.mapperError.map(result.err);
      }
      return 'update password is done';
    } catch (err) {
      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException('some thing went wromg');
    }
  }

  async update(body: UpdateUserDto) {
    try {
      const result = await lastValueFrom(
        this.authClient.send('user.update', body),
      );
      if (result.err) {
        this.mapperError.map(result.err);
      }
      return result;
    } catch (err) {
      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException('some thing went wromg');
    }
  }

  async Login(body: LoginDto) {
    try {
      const result = await lastValueFrom(
        this.authClient.send('user.login', JSON.stringify(body)),
      );
      if (result.err) {
        Logger.log('error', { ee: result.error });
        this.mapperError.map(result.err);
      }
      return result;
    } catch (err) {
      Logger.log('error during auth service', { err });
      throw new InternalServerErrorException(
        'some thing went wrong in auth service',
      );
    }
  }
}
