import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarDoa } from './doa/car.doa';

import { CarEntity } from './entites/car.entity';

import { ModelMapperServiceCar } from './services/modelMapper.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'catDb',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'data_base',
      entities: [CarEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CarEntity]),
  ],
  providers: [CarDoa, ModelMapperServiceCar],
  controllers: [],
  exports: [CarDoa, ModelMapperServiceCar],
})
export class DbCaTegoryModule {}
