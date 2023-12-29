import { HttpService } from '@nestjs/axios';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AxiosError } from 'axios';
import { lastValueFrom } from 'rxjs';
import { CarDoa } from '../../../db/doa/car.doa';
import { CreateCarEntityDto } from '../../../db/dto/createCarEntity.dto';
import { ModelMapperServiceCar } from '../../../db/services/modelMapper.service';
import { CarDto } from '../../../dto/car.dto';
import { UnknownApplicationException } from '../../../error/unknow-application-exception';
import { CreateCarCommand } from './createCar.command';

@CommandHandler(CreateCarCommand)
export class CreateCarCommandHandler
  implements ICommandHandler<CreateCarCommand>
{
  constructor(
    private readonly doa: CarDoa,
    private readonly http: HttpService,
    private readonly modelMapper: ModelMapperServiceCar,
  ) {}

  async execute(command: CreateCarCommand): Promise<CarDto> {
    try {
      const userId = command.userId;
      const price = command.price;
      const make = command.make;
      const transmission = command.transmission;
      const carColor = command.carColor;
      const fullType = command.type;
      const year = command.year;
      const category = command.category;
      const sell = command.sell;
      const cylinders = command.cylinders;
      const img = command.img;
      const name = command.name;

      const formData = new URLSearchParams();

      formData.append('year', year as any);

      formData.append('category', category);
      formData.append('make', make);
      formData.append('transmission', transmission);
      formData.append('carColor', carColor);
      formData.append('sell', sell);
      formData.append('name', name);
      formData.append('type', fullType);
      formData.append('userId', userId as any);
      formData.append('price', price as any);
      formData.append('cylinders', cylinders as any);
      formData.append('image', img);

      const { data } = await lastValueFrom(
        this.http.post(
          `https://api.imgbb.com/1/upload?key=898ab0c193c3ec2c099ca0cf8d071ee8`,
          formData,
        ),
      );

      Logger.log('dtddkdkdka', { data });
      const displayUrl = data?.data?.display_url;
      Logger.log('display', { displayUrl });

      Logger.log('data', data);

      const dataModel: CreateCarEntityDto = {
        year: Number(command.year),

        category: command.category,
        cylinders: Number(command.cylinders),
        transmission: command.transmission,
        carColor: command.carColor,
        make: command.make,
        type: command.type,
        userId: Number(command.userId),
        sell: command.sell,
        name: command.name,
        price: Number(command.price),
        img: data.data?.display_url,
      };
      const result = await this.doa.save(dataModel);
      Logger.log('res', result);
      return this.modelMapper.modelCarToDto(result);
    } catch (err) {
      if (err instanceof AxiosError) {
        Logger.error('error in axios', { err: err.response.data }, 'fllfkfkfk');
      }

      Logger.error('error not in axios', { err: err }, 'fllfkfkfk');

      //     throw new UnknownApplicationException(err);
    }
  }
}
