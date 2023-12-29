import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

interface UpdateUserDtoData {
  username: string;
  number: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsNumber()
  number: number;

  @IsString()
  @IsOptional()
  username: string;

  constructor(dto: UpdateUserDtoData) {
    if (dto) {
      this.number = dto.number;
      this.username = dto.username;
    }
  }
}
