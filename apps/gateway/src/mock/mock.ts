import { faker } from '@faker-js/faker';
import { CreateCarDto } from '../dto/car/createCar.dto';
import { UpdateCarDto } from '../dto/car/updateProduct.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update.user.dto';

export function mockCreateUserDto() {
  return new CreateUserDto({
    email: 'email@gmail.com',
    password: 'password',
    username: 'username',
    number: 13,
  });
}

export function mockUpdateUserDto() {
  return new UpdateUserDto({
    username: 'yaman',
    number: 1231,
  });
}

export function mockCreateCarDto() {
  return new CreateCarDto({
    carColor: 'blue',
    category: 'bmw',
    cylinders: 13,
    make: 'USA',
    year: 2022,
    type: 'auto',
    transmission: 'menial',
    sell: 'rent',
    price: 123,
  });
}

export function mockUpdateCarDto() {
  return new UpdateCarDto({
    carColor: 'blue',
    category: 'bmw',
    cylinders: 13,
    make: 'USA',
    year: 2022,
    type: 'auto',
    transmission: 'menial',
    sell: 'rent',
    price: 123,
  });
}

export function mockGetOneCar() {
  return {
    id: 1,
    userId: 12,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),

    carColor: 'blue',
    category: 'bmw',
    cylinders: 13,
    make: 'USA',
    year: 2022,
    type: 'auto',
    transmission: 'menial',
    sell: 'rent',
    price: 123,
  };
}

export function mockGetAllCar() {
  return [
    {
      id: 1,
      userId: 12,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      carColor: 'blue',
      category: 'bmw',
      cylinders: 13,
      make: 'USA',
      year: 2022,
      type: 'auto',
      transmission: 'menial',
      sell: 'rent',
      price: 123,
    },

    {
      id: 2,
      userId: 22,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      carColor: 'red',
      category: 'bmw',
      cylinders: 13,
      make: 'USA',
      year: 2022,
      type: 'auto',
      transmission: 'menial',
      sell: 'sell',
      price: 1223,
    },
  ];
}

export function mockLoginDto() {
  return new LoginDto({
    email: 'email@gmail.com',
    password: 'password',
  });
}

export function mockCreateUserRespond() {
  return {
    email: 'email@gmail.com',
    password: 'password',
    username: 'username',
    number: 13,
    id: 123,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export function mockGetOneUserRespond() {
  return {
    email: 'email@gmail.com',
    password: 'password',
    username: 'username',
    number: 13,
    id: 123,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
}

export function mockRespondAllUser() {
  return [
    {
      email: 'email@gmail.com',
      password: 'password',
      username: 'username',
      number: 13,
      id: 123,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      email: 'emaidl@gmail.com',
      password: 'padssword',
      username: 'udsername',
      number: 113,
      id: 1123,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  ];
}

export function mockForegutPasswordDto() {
  return {
    email: 'email@gmail.com',
    password: 'pass',
  };
}

export function mockIReposeLogin() {
  return {
    token: 'skakfkfasjfjfjalffffassfffffffffff',
  };
}
