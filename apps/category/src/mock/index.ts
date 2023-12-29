import { faker } from '@faker-js/faker';
import { CreateCarCommand } from '../command/car/createCar/createCar.command';
import { DeleteCarCommand } from '../command/car/deleteCar/deleteCar.command';
import { FindCarByCategoryCommand } from '../command/car/findCarByCategory/findCarByCategory.command';
import { FindOneCarCommand } from '../command/car/findCarById/find-one-car.command';
import { Car } from '../db/model/car.model';
import { CarDto } from '../dto/car.dto';

export function mockFindOneCarCommand() {
  return new FindOneCarCommand({
    id: 12,
  });
}

export function mockFindCarByCategoryCommand() {
  return new FindCarByCategoryCommand({
    category: 'bmw',
  });
}

export function mockCreateCatCommand() {
  return new CreateCarCommand({
    category: 'bmw',
    carColor: 'blue',
    cylinders: 12,
    price: 312,
    year: 2011,
    name: 'name',
    img: 'img',
    userId: 1,
    type: 'type',
    sell: 'rent',
    transmission: 'tr',
    make: 'make',
  });
}

export function mockDeleteCarCommand() {
  return new DeleteCarCommand({
    id: 12,
  });
}

export function mockCarModel() {
  return new Car({
    id: 1,
    name: 'bmw',
    carColor: 'blue',
    category: 'bmw',
    year: 2016,
    cylinders: 1234,
    img: 'img',
    userId: 12,
    updatedAt: faker.date.past(),
    createdAt: faker.date.recent(),
    make: 'USA',
    price: 14423,
    sell: 'rent',
    transmission: 'menial',
    type: 'gas',
  });
}

export function mockCarDto() {
  return new CarDto({
    id: 1,
    name: 'bmw',
    carColor: 'blue',
    category: 'bmw',
    year: 2016,
    cylinders: 1234,
    img: 'img',
    userId: 12,
    updatedAt: faker.date.past(),
    createdAt: faker.date.recent(),
    make: 'USA',
    price: 14423,
    sell: 'rent',
    transmission: 'menial',
    type: 'gas',
  });
}

export function mockCars() {
  return [
    {
      id: 1,
      name: 'bmw',
      carColor: 'blue',
      category: 'bmw',
      year: 2016,
      cylinders: 1234,
      img: 'img',
      userId: 12,
      updatedAt: faker.date.past(),
      createdAt: faker.date.recent(),
      make: 'USA',
      price: 14423,
      sell: 'rent',
      transmission: 'menial',
      type: 'gas',
    },
    {
      id: 2,
      name: 'gClass',
      carColor: 'red',
      category: 'roz',
      year: 2019,
      cylinders: 131,
      img: 'img2',
      userId: 22,
      updatedAt: faker.date.past(),
      createdAt: faker.date.recent(),
      make: 'Germany',
      price: 993,
      sell: 'rent',
      transmission: 'auto',
      type: 'foul',
    },
  ];
}

export function mockCarsDto() {
  return [
    {
      id: 1,
      name: 'bmw',
      carColor: 'blue',
      category: 'bmw',
      year: 2016,
      cylinders: 1234,
      img: 'img',
      userId: 12,
      updatedAt: faker.date.past(),
      createdAt: faker.date.recent(),
      make: 'USA',
      price: 14423,
      sell: 'rent',
      transmission: 'menial',
      type: 'gas',
    },
    {
      id: 2,
      name: 'gClass',
      carColor: 'red',
      category: 'roz',
      year: 2019,
      cylinders: 131,
      img: 'img2',
      userId: 22,
      updatedAt: faker.date.past(),
      createdAt: faker.date.recent(),
      make: 'Germany',
      price: 993,
      sell: 'rent',
      transmission: 'auto',
      type: 'foul',
    },
  ];
}
