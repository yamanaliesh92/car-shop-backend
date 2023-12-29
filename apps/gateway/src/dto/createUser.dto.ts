import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface CreateUserDtoData {
  email: string;
  password: string;
  number: number;
  username: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  constructor(dto: CreateUserDtoData) {
    if (dto) {
      this.email = dto.email;
      this.number = dto.number;
      this.password = dto.password;
      this.username = dto.username;
    }
  }
}
