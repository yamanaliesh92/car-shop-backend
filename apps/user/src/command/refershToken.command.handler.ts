import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Jwt, PayloadTokenData } from '../shared/jwt.service';
import { RefreshTokenCommand } from './refershToken.command';

const EXPIRE_TIME = 20 * 1000;

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenCommandHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(private readonly jwt: Jwt) {}
  async execute(command: RefreshTokenCommand) {
    try {
      const payload: PayloadTokenData = {
        id: command.id,
      };

      const token = await this.jwt.sign(payload);
      const refreshToken = await this.jwt.refresh(payload);
      return Object.assign(
        {},
        { accessToken: token, refreshToken: refreshToken },
      );
    } catch (err) {}
  }
}
