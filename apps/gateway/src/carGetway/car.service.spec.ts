import { ClientKafka } from '@nestjs/microservices';
import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockCreateCarDto,
  mockCreateUserDto,
  mockCreateUserRespond,
  mockForegutPasswordDto,
  mockGetAllCar,
  mockGetOneCar,
  mockIReposeLogin,
  mockLoginDto,
  mockRespondAllUser,
  mockUpdateCarDto,
  mockUpdateUserDto,
} from '../mock/mock';
import { of } from 'rxjs';
import { CarGetWayService } from './carGetWay.service';

describe('test', () => {
  let clientKaka: ClientKafka;
  let carSer: CarGetWayService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'AUTH_MICROSERVICE',
          useFactory: createMock,
        },
        CarGetWayService,
      ],
    }).compile();

    clientKaka = await app.resolve<ClientKafka>('AUTH_MICROSERVICE');
    carSer = await app.resolve<CarGetWayService>(CarGetWayService);
  });

  describe('carGetService Service', () => {
    it('createCarSerine', async () => {
      const body = mockCreateCarDto();
      const img = 'img';
      const userId = 12;
      const response = mockGetOneCar();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await carSer.createCar(body, userId, img);
      expect(result).toBeDefined();
      expect(result.carColor).toEqual(response.carColor);
    });

    it('delete one car ', async () => {
      const id = 1;
      const response = true;
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await carSer.delete(id);
      expect(result).toBeTruthy();
    });

    it('get one car', async () => {
      const id = 12;
      const response = mockGetOneCar();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await carSer.getOneCar(id);
      expect(result.make).toEqual(response.make);
    });

    it('get all car', async () => {
      const response = mockGetAllCar();
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await carSer.getAllCar();
      expect(result[0].make).toEqual(response[0].make);
    });

    it('updateCar', async () => {
      const dto = mockUpdateCarDto();
      const id = 1;
      const resultOfUpdateUser = true;
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(resultOfUpdateUser));
      const result = await carSer.updateCar(id, dto);
      expect(result).toBeTruthy();
    });

    it('get all car by category', async () => {
      const response = mockGetAllCar();
      const category = 'bmw';
      jest.spyOn(clientKaka, 'send').mockReturnValue(of(response));
      const result = await carSer.getCarByCategory(category);
      expect(result).toBeTruthy();
    });
  });
});
