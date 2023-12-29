import { Injectable } from '@nestjs/common';
import { CarDto } from '../../dto/car.dto';
import { CarEntity } from '../entites/car.entity';
import { Car } from '../model/car.model';

@Injectable()
export class ModelMapperServiceCar {
  toCar(entity: CarEntity): Car {
    return new Car({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,

      transmission: entity.transmission,
      carColor: entity.carColor,
      name: entity.name,
      userId: entity.userId,
      type: entity.type,
      make: entity.make,
      category: entity.category,
      cylinders: entity.cylinders,
      year: entity.year,
      img: entity.img,
      sell: entity.sell,
      price: entity.price,
    });
  }

  modelCarToDto(model: Car): CarDto {
    return new CarDto({
      id: model.id,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,

      transmission: model.transmission,
      carColor: model.carColor,
      name: model.name,
      category: model.category,
      type: model.type,
      make: model.make,
      userId: model.userId,
      cylinders: model.cylinders,
      year: model.year,
      price: model.price,
      img: model.img,
      sell: model.sell,
    });
  }
}
