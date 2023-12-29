import { Module } from '@nestjs/common';
import { KafkaErrorMapperService } from './error.service';

@Module({
  imports: [],
  providers: [KafkaErrorMapperService],
  exports: [KafkaErrorMapperService],
})
export class ErrorModule {}
