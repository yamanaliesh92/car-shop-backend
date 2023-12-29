import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityNotFoundError,
  FindOptionsWhere,
  QueryFailedError,
  Repository,
} from 'typeorm';
import { CreateUserEntityDto } from '../dto/createUserEntity.dto';
import { UpdateUserEntityDto } from '../dto/updateUserEntity.dto';
import { UserEntity } from '../entity/user.entity';
import { TypeORMErrorCodes } from '../error/typeorem.error';
import { UnexpectedDataAccessException } from '../error/unexpeceted-data-access-exception';
import { UniqueConstraintViolationDataAccessException } from '../error/unique-constraint-violation.data.access.exception';
import { UserNotFoundDataAccessException } from '../error/user-not-found-data-access-exception';
import { ModelMapperService } from '../services/modelmapper.service';

interface IFind {
  where?: FindOptionsWhere<UserEntity>;
  page?: number;
}

@Injectable()
export class UserDoa {
  private logger = new Logger(this.constructor.name, { timestamp: true });
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private readonly modelMapper: ModelMapperService,
  ) {}

  async save(data: CreateUserEntityDto) {
    try {
      const model = new UserEntity({
        email: data.email,
        password: data.password,
        username: data.username,
        number: data.number,
      });
      const result = await this.repo.save(model);
      return this.modelMapper.toUser(result);
    } catch (err) {
      if (
        err instanceof QueryFailedError &&
        err.driverError?.code === TypeORMErrorCodes.UNIQUE_CONSTRAINT_VIOLATION
      ) {
        throw new UniqueConstraintViolationDataAccessException(err);
      }
      throw new UnexpectedDataAccessException(err);
    }
  }

  async findOne(where: FindOptionsWhere<UserEntity>) {
    try {
      const result = await this.repo.findOneOrFail({ where: where });
      return this.modelMapper.toUser(result);
    } catch (err) {
      Logger.log('error ', { err });
      if (err instanceof EntityNotFoundError) {
        throw new UserNotFoundDataAccessException(err);
      }
      throw new UnexpectedDataAccessException(err);
    }
  }

  async update(where: FindOptionsWhere<UserEntity>, args: UpdateUserEntityDto) {
    try {
      const result = await this.repo.update(where, {
        ...(args.number ? { number: args.number } : {}),
        ...(args.username ? { username: args.username } : {}),
        ...(args.password ? { password: args.password } : {}),
      });
      return result.affected > 0;
    } catch (err) {
      Logger.log('error ', { err });

      throw new UnexpectedDataAccessException(err);
    }
  }

  async find(where?: FindOptionsWhere<UserEntity>) {
    try {
      return await this.repo.find({
        where: where,
      });
    } catch (err) {
      Logger.log('error ', { err });
      if (err instanceof EntityNotFoundError) {
        throw new UserNotFoundDataAccessException(err);
      }
      throw new UnexpectedDataAccessException(err);
    }
  }
}
