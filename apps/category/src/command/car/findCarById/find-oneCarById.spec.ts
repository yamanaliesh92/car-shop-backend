import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { RecodedNotFoundExceptionError } from 'apps/category/src/db/error/record-not-found.access.exception';
import { UnknownDataAccessException } from 'apps/category/src/db/error/unexcepted-access-exception';
import { NotFoundApplicationException } from 'apps/category/src/error/recoder-not-found.application.exception';
import { UnknownApplicationException } from 'apps/category/src/error/unknow-application-exception';
import { QueryFailedError } from 'typeorm';
import { CarDoa } from '../../../db/doa/car.doa';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import {
  mockCarDto,
  mockCarModel,
  mockFindOneCarCommand,
} from '../../../mock/index';
import { FindOneCarCommandHandler } from './find-one-car.command.handler';

describe('find one car by id', () => {
  let findOne: FindOneCarCommandHandler;
  let doa: CarDoa;
  let modelMapper: ModelMapperServiceCar;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: CarDoa, useFactory: createMock },
        { provide: ModelMapperServiceCar, useFactory: createMock },

        FindOneCarCommandHandler,
      ],
    }).compile();

    doa = await app.resolve<CarDoa>(CarDoa);
    modelMapper = await app.resolve<ModelMapperServiceCar>(
      ModelMapperServiceCar,
    );
    findOne = await app.resolve<FindOneCarCommandHandler>(
      FindOneCarCommandHandler,
    );
  });

  describe('getById', () => {
    it('find one car is done successfully', async () => {
      const dateCar = mockCarModel();
      const dataCarDto = mockCarDto();
      const id = mockFindOneCarCommand();
      jest.spyOn(doa, 'findOne').mockResolvedValue(dateCar);
      jest.spyOn(modelMapper, 'modelCarToDto').mockReturnValue(dataCarDto);
      const result = await findOne.execute(id);
      expect(result).toBeDefined();
      expect(result.make).toEqual(dataCarDto.make);
      expect(result.name).toEqual(dataCarDto.name);
    });

    it('find one car with unknownError', async () => {
      const id = mockFindOneCarCommand();
      const err0r = new UnknownDataAccessException(
        new QueryFailedError('', [], {}),
      );

      jest.spyOn(doa, 'save').mockRejectedValue(err0r);

      try {
        await findOne.execute(id);
      } catch (err) {
        console.log(err);
        expect(err).toBeInstanceOf(UnknownApplicationException);
        expect((err as UnknownApplicationException).message).toEqual(
          'unKnown error occurred',
        );
      }
    });

    it('find one car with not Found', async () => {
      const id = mockFindOneCarCommand();
      const err0r = new RecodedNotFoundExceptionError(
        new QueryFailedError('', [], {}),
      );

      jest.spyOn(doa, 'save').mockRejectedValue(err0r);

      try {
        await findOne.execute(id);
      } catch (err) {
        console.log(err);
        expect(err).toBeInstanceOf(NotFoundApplicationException);
        expect((err as NotFoundApplicationException).message).toEqual(
          'unKnown error occurred',
        );
      }
    });
  });
});
