import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, FindOptionsWhere, Repository } from 'typeorm';
import { CreateCarEntityDto } from '../dto/createCarEntity.dto';
import { UpdateCarEntityDto } from '../dto/updateCarEntity.doa';
import { CarEntity } from '../entites/car.entity';
import { RecodedNotFoundExceptionError } from '../error/record-not-found.access.exception';
import { UnknownDataAccessException } from '../error/unexcepted-access-exception';
import { Car } from '../model/car.model';
import { ModelMapperServiceCar } from '../services/modelMapper.service';

interface IFind {
  page?: number;
  where?: FindOptionsWhere<CarEntity>;
}

@Injectable()
export class CarDoa {
  constructor(
    @InjectRepository(CarEntity)
    private readonly carRepo: Repository<CarEntity>,
    private readonly mapperservice: ModelMapperServiceCar,
  ) {}

  async save(data: CreateCarEntityDto) {
    try {
      const make = new CarEntity({
        category: data.category,
        type: data.type,
        cylinders: data.cylinders,

        make: data.make,
        carColor: data.carColor,
        transmission: data.transmission,

        year: data.year,
        name: data.name,
        userId: data.userId,
        price: data.price,
        img: data.img,
        sell: data.sell,
      });
      const result = await this.carRepo.save(make);
      return this.mapperservice.toCar(result);
    } catch (err) {
      Logger.log('errrrrrrrrrrrrr', err);
      throw new UnknownDataAccessException(err);
    }
  }

  async delete(where: FindOptionsWhere<CarEntity>): Promise<boolean> {
    try {
      const result = await this.carRepo.delete(where);
      return result.affected > 0;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        Logger.log('Error here dont exist', err);
        throw new RecodedNotFoundExceptionError(err);
      }
      throw new UnknownDataAccessException(err);
    }
  }

  async update(id: number, dto: UpdateCarEntityDto): Promise<boolean> {
    try {
      Logger.log('id and res', { id, dto });
      const result = await this.carRepo.update(id, {
        ...(dto.cylinders ? { cylinders: dto.cylinders } : {}),
        ...(dto.type ? { type: dto.type } : {}),
        ...(dto.make ? { make: dto.make } : {}),
        ...(dto.year ? { year: dto.year } : {}),
        ...(dto.name ? { name: dto.name } : {}),
        ...(dto.img ? { img: dto.img } : {}),
        ...(dto.price ? { price: dto.price } : {}),
        ...(dto.sell ? { sell: dto.sell } : {}),
        ...(dto.transmission ? { transmission: dto.transmission } : {}),
        ...(dto.carColor ? { carColor: dto.carColor } : {}),
        ...(dto.category ? { category: dto.category } : {}),
      });
      Logger.log('Result', result.affected);
      return result.affected > 0;
    } catch (err) {}
  }

  async find(where?: FindOptionsWhere<CarEntity>): Promise<Car[]> {
    // try {
    // const { skip, take } = this.getPaginationOption(dto.pagantion);
    // args.page = Number(args.page);

    // Logger.log('page', { page, lslsl: 5 * (page ? page - 1 : 1) });
    Logger.log('where', where);
    const records = await this.carRepo.find({
      where: where,
      // skip: 5 * (page ? page - 1 : 1),
      // take: 5,
    });

    Logger.log('redocerdd', records);

    return records.map(this.mapperservice.toCar);
    // } catch (err) {
    //   if (err instanceof EntityNotFoundError) {
    //     Logger.log('Error here dont exist', err);
    //     throw new RecodedNotFoundExceptionError(err);
    //   }
    //   throw new UnknownDataAccessException(err);
    // }
  }

  async findOne(where: FindOptionsWhere<CarEntity>): Promise<Car> {
    try {
      const data = await this.carRepo.findOneOrFail({ where: where });

      return this.mapperservice.toCar(data);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        Logger.log('Error here dont exist', err);
        throw new RecodedNotFoundExceptionError(err);
      }
      Logger.log('error in jpg', err);
    }
  }

  async count(where: FindOptionsWhere<CarEntity>): Promise<number> {
    try {
      return await this.carRepo.count({ where: where });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        Logger.log('Error here dont exist', err);
        throw new RecodedNotFoundExceptionError(err);
      }
      Logger.log('error in jpg', err);
    }
  }
}
