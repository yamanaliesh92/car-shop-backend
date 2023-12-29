import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { UnknownDataAccessException } from 'apps/category/src/db/error/unexcepted-access-exception';
import { UnknownApplicationException } from 'apps/category/src/error/unknow-application-exception';
import { QueryFailedError } from 'typeorm';
import { CarDoa } from '../../../db/doa/car.doa';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import {
  mockCarDto,
  mockCarModel,
  mockCreateCatCommand,
  mockFindOneCarCommand,
} from '../../../mock/index';

import { CreateCarCommandHandler } from './createCar.coomand.handler';

describe('createCat', () => {
  let createCar: CreateCarCommandHandler;
  let doa: CarDoa;
  let modelMapper: ModelMapperServiceCar;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: CarDoa, useFactory: createMock },
        { provide: ModelMapperServiceCar, useFactory: createMock },

        CreateCarCommandHandler,
      ],
    }).compile();

    doa = await app.resolve<CarDoa>(CarDoa);
    modelMapper = await app.resolve<ModelMapperServiceCar>(
      ModelMapperServiceCar,
    );
    createCar = await app.resolve<CreateCarCommandHandler>(
      CreateCarCommandHandler,
    );
  });

  describe('createCar', () => {
    it('create car is done successfully', async () => {
      const dateCar = mockCarModel();
      const dataCarDto = mockCarDto();
      const body = mockCreateCatCommand();
      jest.spyOn(doa, 'save').mockResolvedValue(dateCar);
      jest.spyOn(modelMapper, 'modelCarToDto').mockReturnValue(dataCarDto);
      const result = await createCar.execute(body);

      expect(result.make).toEqual(dataCarDto.make);
      expect(result.name).toEqual(dataCarDto.name);
    });

    it('create car with UnKnown Error ', async () => {
      const err0r = new UnknownDataAccessException(
        new QueryFailedError('', [], {}),
      );

      const dataCarDto = mockCarDto();
      const body = mockCreateCatCommand();
      jest.spyOn(doa, 'save').mockRejectedValue(err0r);
      jest.spyOn(modelMapper, 'modelCarToDto').mockReturnValue(dataCarDto);

      try {
        await createCar.execute(body);
      } catch (err) {
        console.log(err);
        expect(err).toBeInstanceOf(UnknownApplicationException);
        expect((err as UnknownApplicationException).message).toEqual(
          'unKnown error occurred',
        );
      }
    });
  });
});
