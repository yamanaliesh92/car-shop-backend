import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UnknownApplicationException } from '../error/unknown.application';

export interface PayloadTokenData {
  id: number;
}

@Injectable()
export class Jwt {
  constructor(private jwtService: JwtService) {}
  async sign(payload: PayloadTokenData) {
    try {
      // Logger.log('id ', { payload });
      return await this.jwtService.signAsync(payload, {
        secret: `${process.env.SECRET_ACCESS_TOKEN}`,
        expiresIn: '5m',
      });
    } catch (err) {
      throw new UnknownApplicationException(err);
    }
  }

  async refresh(payload: PayloadTokenData) {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: `${process.env.SECRET_REFRESH_TOKEN}`,
        expiresIn: '7d',
      });
    } catch (err) {
      throw new UnknownApplicationException(err);
    }
  }
}
