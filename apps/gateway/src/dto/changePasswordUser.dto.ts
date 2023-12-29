import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

interface ForgetPasswordUserDtoData {
  password: string;
  email: string;
}

export class ForgetPasswordUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  constructor(dto: ForgetPasswordUserDtoData) {
    if (dto) {
      this.email = dto.email;
      this.password = dto.password;
    }
  }
}
