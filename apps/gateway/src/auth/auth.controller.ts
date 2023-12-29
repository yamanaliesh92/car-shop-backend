import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ForgetPasswordUserDto } from '../dto/changePasswordUser.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { LoginDto } from '../dto/login.dto';
import { UpdateUserDto } from '../dto/update.user.dto';
import { AuthGuard, IRequest } from '../shared/auth.guard';
import { RefreshAuthGuard } from '../shared/refsht.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authser: AuthService) {}

  @Post()
  login(@Body() body: LoginDto) {
    return this.authser.Login(body);
  }

  @Patch()
  forget(@Body() body: ForgetPasswordUserDto) {
    return this.authser.forgetPassword(body);
  }

  @Patch('update/me')
  async updateUser(@Body() body: UpdateUserDto) {
    try {
      return await this.authser.update(body);
    } catch (Err) {
      throw new BadRequestException(' some thing went wrong try again');
    }
  }

  @Get('all')
  get() {
    Logger.log('hello');
    return this.authser.getUser();
  }

  @Post('create')
  create(@Body() body: CreateUserDto) {
    return this.authser.createUser(body);
  }

  @UseGuards(AuthGuard)
  @Get()
  getOne(@Req() req: IRequest) {
    return this.authser.getOneUser(req.user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('re/ref')
  Ref(@Req() req: IRequest) {
    Logger.log('done', req);
    return this.authser.Refresh(req.user.id);
  }
}
