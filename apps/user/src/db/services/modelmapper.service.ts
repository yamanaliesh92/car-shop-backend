import { Injectable, Logger } from '@nestjs/common';
import { UserDto } from '../../dto/userDto';
import { UserEntity } from '../entity/user.entity';
import { User } from '../model/user.model';

@Injectable()
export class ModelMapperService {
  toUser(entity: UserEntity): User {
    Logger.log('entity', { entity });
    return new User({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      email: entity.email,
      username: entity.username,
      password: entity.password,
      number: entity.number,
    });
  }

  modelToDto(data: User): UserDto {
    return new UserDto({
      id: data.id,
      email: data.email,
      username: data.username,
      number: data.number,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
