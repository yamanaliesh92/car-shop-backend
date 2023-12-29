import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDoa } from './doa/user.doa';
import { UserEntity } from './entity/user.entity';
import { ModelMapperService } from './services/modelmapper.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'userdb',
      port: 5432,
      username: 'yaman',
      password: 'password_yaman',
      database: 'database_yaman',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [UserDoa, ModelMapperService],
  controllers: [],
  exports: [UserDoa, ModelMapperService],
})
export class DbModule {}
