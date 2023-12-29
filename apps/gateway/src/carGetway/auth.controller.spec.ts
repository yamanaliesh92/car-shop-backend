import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateCarDto, mockGetAllCar, mockGetOneCar } from '../mock/mock';
import { Jwt } from '../shared/jwt.service';
import { CarGetWayController } from './carGetWay.controller';
import { CarGetWayService } from './carGetWay.service';

describe('controller', () => {
  let carCont: CarGetWayController;
  let carSer: CarGetWayService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CarGetWayService,
          useFactory: createMock,
        },
        {
          provide: Jwt,
          useFactory: createMock,
        },
      ],
      controllers: [CarGetWayController],
    }).compile();

    carSer = await app.resolve<CarGetWayService>(CarGetWayService);
    carCont = await app.resolve<CarGetWayController>(CarGetWayController);
  });

  describe('CatController', () => {
    it('test createCar is done', async () => {
      const body = mockCreateCarDto();
      const img = 'img';
      const userId = 12;
      const responded = mockGetOneCar();
      jest.spyOn(carSer, 'createCar').mockResolvedValue(responded);
      const result = await carCont.create(body, userId as any, img as any);
      expect(result.carColor).toEqual(responded.carColor);
    });

    it('delete one car', async () => {
      const id = 1;
      const responded = 'delete car is done';
      jest.spyOn(carSer, 'delete').mockResolvedValue(responded);
      const result = await carCont.delete(id);
      expect(result).toBeTruthy();
    });

    it('get one Car', async () => {
      const responded = mockGetAllCar();
      const userId = 1;

      jest.spyOn(carSer, 'getAllCar').mockResolvedValue(responded as []);

      const result = await carCont.getAllCarsByUserId(userId as any);
      expect(result[1].make).toEqual(responded[1].make);
    });
  });
});
