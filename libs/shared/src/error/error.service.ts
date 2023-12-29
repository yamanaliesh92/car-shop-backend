import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { KafkaErrorCode } from './error.code';

@Injectable()
export class KafkaErrorMapperService {
  map(err: KafkaErrorCode) {
    switch (err) {
      case KafkaErrorCode.UNKNOWN_ERROR:
        throw new InternalServerErrorException();

      case KafkaErrorCode.CAR_NOT_FOUND:
        throw new BadRequestException('car is not found');
      case KafkaErrorCode.USER_ALREADY_EXIST:
        throw new BadRequestException('is exist');

      case KafkaErrorCode.USER_NOT_FOUND:
        throw new BadRequestException('not found');

      case KafkaErrorCode.USER_NOT_FOUND:
        throw new BadRequestException('email or password is not correct');

      default:
        Logger.error(
          'Critical: unknown error code',
          err,
          this.constructor.name,
        );
        throw new InternalServerErrorException();
    }
  }
}
