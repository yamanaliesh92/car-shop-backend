import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bycrpt from 'bcryptjs';

@Injectable()
export class Bcrypt {
  async hashPassword(str: string) {
    try {
      const a = await bycrpt.hash(str, 14);
      Logger.log('hash', a);
      return a;
    } catch (err) {
      Logger.log('worng in hash password', { err });
      throw new UnauthorizedException('error in hashing');
    }
  }
  async comparePassword(str: string, hash: string) {
    try {
      return await bycrpt.compare(str, hash);
    } catch (err) {
      Logger.log('worng in compare password', { err });
      throw new UnauthorizedException('error in compare');
    }
  }
}
