import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  sell: string;

  @IsString()
  @IsNotEmpty()
  carColor: string;

  @IsString()
  @IsNotEmpty()
  transmission: string;

  @IsNotEmpty()
  // @IsNumber()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  price: number;

  @IsNotEmpty()
  // @IsNumber()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  year: number;

  @IsNotEmpty()
  // @IsNumber()
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  cylinders: number;

  constructor(dto: Partial<CreateCarDto>) {
    Object.assign(this, dto);
  }
}
