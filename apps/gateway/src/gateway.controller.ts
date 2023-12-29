import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('test')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getHello() {
    return 'djdjd';
  }
}
