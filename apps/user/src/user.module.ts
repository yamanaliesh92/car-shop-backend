import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { CreateUserCommandHandler } from './command/create-user-command.handler';
import { GetOneUserCommandHandler } from './command/get-one-user.command.handler';
import { LoginCommandHandler } from './command/login.command.handler';
import { RefreshTokenCommandHandler } from './command/refershToken.command.handler';
import { DbModule } from './db/db.module';
import { Bcrypt } from './shared/bc.service';
import { Jwt } from './shared/jwt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FindUserCommandHandler } from './command/find-user.command.handler';
import { ChangePasswordCommandHandler } from './command/chnage-password.command.handler';
import { UpdateUserCommandHandler } from './command/update.command.handler';

@Module({
  imports: [
    DbModule,
    CqrsModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'USER_SERVICE',
            brokers: ['kafka:9092'],
          },
          consumer: {
            allowAutoTopicCreation: true,
            groupId: 'nest-group',
          },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserCommandHandler,
    LoginCommandHandler,
    UpdateUserCommandHandler,

    RefreshTokenCommandHandler,
    Jwt,
    ChangePasswordCommandHandler,
    UserService,
    GetOneUserCommandHandler,
    FindUserCommandHandler,
    Bcrypt,
    JwtService,
  ],
})
export class UserModule {}
