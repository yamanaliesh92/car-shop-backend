// import {
//   ExecutionContext,
//   Injectable,
//   Logger,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Jwt } from './jwt.service';

// const HEDER_TOKEN = 'auth';

export interface IRequest {
  user: {
    id: number;
  };
}

// @Injectable()
// export class authGuard {
//   constructor(private readonly jwt: Jwt) {}

//   async canActivate(context: ExecutionContext) {
//     try {
//       const request = context.switchToHttp().getRequest();

//       const token = request.headers[HEDER_TOKEN];

//       if (!token) {
//         throw new UnauthorizedException();
//       }

//       const decode = await this.jwt.decode(token);

//       if (!decode) {
//         throw new UnauthorizedException();
//       }
//       request.user = decode;
//       return true;
//     } catch (err) {
//       Logger.error('Unknown error in auth guard', { err });
//       throw new UnauthorizedException();
//     }
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.auth;

    Logger.log('token', token);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: `${process.env.SECRET_ACCESS_TOKEN}`,
      });

      Logger.log({ payload });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  // private extractTokenFromHeader(request: Request): string | undefined {
  //   const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //   return type === 'Bearer' ? token : undefined;
  // }
}
