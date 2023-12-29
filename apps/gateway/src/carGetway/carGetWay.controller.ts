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

import { AuthGuard, IRequest } from '../shared/auth.guard';
import { CarGuard } from '../shared/car.guard';
import { CarGetWayService } from './carGetWay.service';

@Controller('car')
export class CarGetWayController {
  constructor(private readonly carService: CarGetWayService) {}

  // @Get(':id')
  // test(@Param('id') id: number) {
  //   return this.carService.getOneCar(id);
  // }

  // @Get()
  // getAll() {
  //   Logger.log('ddddddddddd');
  //   return this.carService.getAllCar();
  // }

  // @UseGuards(AuthGuard)
  @Get('all/allCars')
  getAllProducts() {
    // @Query() { page }: PageCarDto
    // Logger.log('000000000000', { ssksks: typeof page });

    return this.carService.getAllCar();
  }

  @Get('byCategory')
  getAllByCategory(@Query('category') category: string) {
    Logger.log('heyddddddddddddddddddddddddddddddy', { category });
    return this.carService.getCarByCategory(category);
  }

  @UseGuards(AuthGuard)
  @Get('allCarByUserId')
  getAllCarsByUserId(@Req() req: IRequest) {
    Logger.debug('userId in getByUserId', { rr: req.user.id });
    return this.carService.getAllCarByUserID(req.user.id);
  }

  // @UseGuards(AuthGuard, ProductGuard)
  // @Patch('upload/:id')
  // @UseInterceptors(FileInterceptor('img'))
  // async upload(@Param('id') id: number, @Req() req: IRequest) {
  //   Logger.log('id', { id });

  //   return this.carService.UpdateImgProduct(
  //     id,
  //     req.user.id,
  //     img.buffer.toString('base64'),
  //   );
  // }

  @UseGuards(AuthGuard, CarGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    Logger.log('userID', { id });
    return this.carService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  create(
    @Body() body: CreateCarDto,
    @Req() req: IRequest,
    @UploadedFile() img: Express.Multer.File,
  ) {
    Logger.debug(
      'Incoming request for creating car',
      {
        body,
        imgBuffer: img.buffer.toString('base64'),
      },
      this.constructor.name,
    );
    return this.carService.createCar(
      body,
      req.user.id,
      img.buffer.toString('base64'),
    );
  }

  @UseGuards(AuthGuard, CarGuard)
  @Patch(':id')
  updateCar(
    @Param('id') id: number,

    @Body() body: UpdateCarDto,
  ) {
    Logger.log('DDDDDDDDDDDDDDDDDD');

    return this.carService.updateCar(id, body);
  }

  @UseGuards(AuthGuard, CarGuard)
  @Patch('updateImg/:id')
  @UseInterceptors(FileInterceptor('img'))
  updateImg(@Param('id') id: number, @UploadedFile() img: Express.Multer.File) {
    Logger.log('DDDDDDDDDDDDDDDDDD');

    return this.carService.updateImgCar(id, img.buffer.toString('base64'));
  }
}
