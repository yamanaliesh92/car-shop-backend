import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { RefreshTokenISValidApplicationException } from '../error/refeshTokenIsVaild.appliactionException';
import { TokenISValidApplicationException } from '../error/token.appliactionException';

export interface PayloadTokenData {
  id: number;
}
@Injectable()
export class Jwt {
  constructor(private jwtService: JwtService) {}
  async decode(token: string) {
    try {
      return await jwt.decode(token);
    } catch (err) {
      Logger.log('error in decode', { err });
      throw new InternalServerErrorException('some thing went wrong');
    }
  }

  async verifyRefreshTone(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: `${process.env.SECRET_REFRESH_TOKEN}`,
      });
    } catch (err) {
      Logger.log('error in decode', { err });
      throw new RefreshTokenISValidApplicationException();
    }
  }

  async verify(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: `${process.env.SECRET_ACCESS_TOKEN}`,
      });
    } catch (err) {
      Logger.log('error in decode', { err });
      throw new TokenISValidApplicationException();
    }
  }

  async sign(payload: PayloadTokenData) {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: `${process.env.SECRET_ACCESS_TOKEN}`,

        expiresIn: '2m',
      });
    } catch (err) {
      throw new TokenISValidApplicationException();
    }
  }

  async refresh(payload: PayloadTokenData) {
    try {
      return await this.jwtService.signAsync(payload, {
        secret: `${process.env.SECRET_REFRESH_TOKEN}`,
        expiresIn: '7d',
      });
    } catch (err) {
      throw new TokenISValidApplicationException();
    }
  }
}
