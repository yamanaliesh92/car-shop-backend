import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GatewayController } from './gateway.controller';
import { ProductGetWayModule } from './carGetway/carGetWay.module';
import { Jwt } from './shared/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, ProductGetWayModule],
  controllers: [],
  providers: [Jwt, JwtService],
})
export class GetWayModule {}
