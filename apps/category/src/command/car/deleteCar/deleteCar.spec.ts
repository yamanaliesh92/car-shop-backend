import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { UnknownDataAccessException } from 'apps/category/src/db/error/unexcepted-access-exception';
import { UnknownApplicationException } from 'apps/category/src/error/unknow-application-exception';
import { QueryFailedError } from 'typeorm';
import { CarDoa } from '../../../db/doa/car.doa';

import { mockDeleteCarCommand } from '../../../mock/index';
import { DeleteCarCommandHandler } from './deleteCar.command.handler';

describe('Delete Car Command', () => {
  let deleComHan: DeleteCarCommandHandler;
  let doa: CarDoa;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        { provide: CarDoa, useFactory: createMock },

        DeleteCarCommandHandler,
      ],
    }).compile();

    doa = await app.resolve<CarDoa>(CarDoa);

    deleComHan = await app.resolve<DeleteCarCommandHandler>(
      DeleteCarCommandHandler,
    );
  });

  describe('Delete', () => {
    it('delete car is done successfully', async () => {
      const id = mockDeleteCarCommand();
      jest.spyOn(doa, 'delete').mockResolvedValue(true);

      const result = await deleComHan.execute(id);
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
    });

    it('delete car with unknownError', async () => {
      const id = mockDeleteCarCommand();
      const err0r = new UnknownDataAccessException(
        new QueryFailedError('', [], {}),
      );

      jest.spyOn(doa, 'save').mockRejectedValue(err0r);

      try {
        await deleComHan.execute(id);
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
