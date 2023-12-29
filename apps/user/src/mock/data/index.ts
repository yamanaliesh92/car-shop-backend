import { faker } from '@faker-js/faker';
import { ChangePasswordCommand } from '../../command/change-password.command';
import { CreateUserCommand } from '../../command/create-user.command';
import { GetOneUserCommand } from '../../command/get-one-user.command';
import { LoginCommand } from '../../command/login.command';
import { User } from '../../db/model/user.model';
import { UserDto } from '../../dto/userDto';

export function mockCreateUserCommand() {
  return new CreateUserCommand({
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    number: faker.number.int(),
  });
}

export function mockChangePasswordCommand() {
  return new ChangePasswordCommand({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
}

export function mockLoginCommand() {
  return new LoginCommand({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
}

export function ResponseLogin() {
  return {
    token: faker.internet.userName(),
  };
}

export function mockGetOneUserCommand() {
  return new GetOneUserCommand({
    id: 14,
  });
}

export function mockUserDto() {
  return new UserDto({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    number: faker.number.int(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}

export function mockUser() {
  return new User({
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    number: faker.number.int(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    id: 12,
  });
}
