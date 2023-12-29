import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { KafkaErrorMapperService } from 'y/shared/error/error.service';
import { CreateCarDto } from '../dto/car/createCar.dto';
import { UpdateCarDto } from '../dto/car/updateProduct.dto';
import { IResponseCar } from '../types';

@Injectable()
export class CarGetWayService {
  constructor(
    @Inject('PRODUCT_MICROSERVICE') private readonly client: ClientKafka,
    private readonly mapperError: KafkaErrorMapperService,
  ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('car.create');
    this.client.subscribeToResponseOf('car.get.one');
    this.client.subscribeToResponseOf('user.get.cars');
    this.client.subscribeToResponseOf('car.delete');
    this.client.subscribeToResponseOf('car.update');

    this.client.subscribeToResponseOf('car.update.img');

    this.client.subscribeToResponseOf('car.get.all');
    this.client.subscribeToResponseOf('car.get.by.category');

    await this.client.connect();
  }

  async getAllCar(): Promise<IResponseCar[] | null> {
    try {
      Logger.log('id');
      const result = await lastValueFrom(this.client.send('car.get.all', {}));
      if (result.error) {
        this.mapperError.map(result.error);
      }
      return result;
    } catch (err) {
      Logger.log('error ocurred during  carGetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async getAllCarByUserID(userId: number): Promise<IResponseCar[] | null> {
    try {
      const result = await lastValueFrom(
        this.client.send('user.get.cars', userId),
      );

      if (result.error) {
        this.mapperError.map(result.error);
      }
      return result;
    } catch (err) {
      Logger.log('GetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async getOneCar(id: number): Promise<IResponseCar | null> {
    try {
      const result = await lastValueFrom(this.client.send('car.get.one', id));

      if (result.error) {
        this.mapperError.map(result.error);
      }
      return result;
    } catch (err) {
      Logger.log('error ocurred during  carGetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async getCarByCategory(category: string): Promise<IResponseCar | null> {
    try {
      const result = await lastValueFrom(
        this.client.send('car.get.by.category', category),
      );
      if (result.error) {
        this.mapperError.map(result.error);
      }
      return result;
    } catch (err) {
      Logger.log('error ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const result = await lastValueFrom(this.client.send('car.delete', id));
      if (result.error) {
        this.mapperError.map(result.error);
      }
      return `delete product ${id} is done`;
    } catch (err) {
      Logger.log('error ocurred during  ProductGetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async createCar(body: CreateCarDto, userId: number, img: any) {
    try {
      Logger.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDD', {
        ...body,
        img: img,
        userId: userId,
      });
      const result = await lastValueFrom(
        this.client.send('car.create', {
          ...body,
          userId: userId,
          img: img,
        }),
      );
      if (result.error) {
        this.mapperError.map(result.error);
      }
      return result;
    } catch (err) {
      Logger.log('error ocurred during  carGetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async updateImgCar(id: number, img: any) {
    try {
      const result = await lastValueFrom(
        this.client.send('car.update.img', { id: id, img: img }),
      );
      if (result.error) {
        this.mapperError.map(result.error);
      }
      return `update Img  ${id} is done`;
    } catch (err) {
      Logger.log('error ocurded during  carGetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async updateCar(id: number, body: UpdateCarDto) {
    try {
      const result = await lastValueFrom(
        this.client.send('car.update', { ...body, id: id }),
      );
      if (result.error) {
        this.mapperError.map(result.error);
      }
      return `update category ${id} is done`;
    } catch (err) {
      Logger.log('error ocurred during  carGetWayService ', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }
}
