import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { Car } from 'apps/category/src/db/model/car.model';
import { CarDoa } from '../../../db/doa/car.doa';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import {
  mockCarDto,
  mockCars,
  mockFindCarByCategoryCommand,
} from '../../../mock/index';
import { FindCarByCategoryCommandHandler } from './findCarByCategory.command.handler';
describe('find one car by id', () => {
  let findByCate: FindCarByCategoryCommandHandler;
  let doa: CarDoa;
  let modelMapper: ModelMapperServiceCar;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: CarDoa, useFactory: createMock },
        { provide: ModelMapperServiceCar, useFactory: createMock },

        FindCarByCategoryCommandHandler,
      ],
    }).compile();

    doa = await app.resolve<CarDoa>(CarDoa);
    modelMapper = await app.resolve<ModelMapperServiceCar>(
      ModelMapperServiceCar,
    );
    findByCate = await app.resolve<FindCarByCategoryCommandHandler>(
      FindCarByCategoryCommandHandler,
    );
  });

  describe('getById', () => {
    it('find by category car is done successfully', async () => {
      const dateCar = mockCars();
      const dataCarDto = mockCarDto();
      const category = mockFindCarByCategoryCommand();
      jest.spyOn(doa, 'find').mockResolvedValue(dateCar as Car[]);
      jest.spyOn(modelMapper, 'modelCarToDto').mockReturnValue(dataCarDto);
      const result = await findByCate.execute(category);

      expect(result).toBeDefined();
      expect(result[0].name).toEqual('bmw');
      expect(result[1].make).toEqual('USA');
    });
  });
});
