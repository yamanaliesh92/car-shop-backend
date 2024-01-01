import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCarDto } from '../dto/car/createCar.dto';
import { UpdateCarDto } from '../dto/car/updateProduct.dto';

import { IRequest } from '../shared/auth.guard';
import { CarGuard } from '../shared/car.guard';
import { CarGetWayService } from './carGetWay.service';

@Controller('category')
export class CategoryGetWayController {
  constructor(private readonly carService: CarGetWayService) {}

  // @Get(':id')
  // test(@Param('id') id: number) {
  //   return this.carService.getOneCar(id);
  // }

  // @UseGuards(authGuard)

  @Get('')
  getAllByCategory(@Query('category') category: string) {
    Logger.log('heyddddddddddddddddddddddddddddddy', { category });
    return this.carService.getCarByCategory(category);
  }
}
