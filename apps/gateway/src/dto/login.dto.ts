import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
interface LoginDtoData {
  email: string;
  password: string;
}
export class LoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(dto: LoginDtoData) {
    if (dto) {
      this.email = dto.email;
      this.password = dto.password;
    }
  }
}
