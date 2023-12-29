import { IsNumber, IsOptional, IsString } from 'class-validator';

interface UpdateCarDtoData {
  name?: string;
  sell?: string;
  price?: number;
  year?: number;
  carColor?: string;
  category?: string;
  make?: string;
  cylinders?: number;
  transmission?: string;
  type?: string;
}

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  sell: string;

  @IsString()
  @IsOptional()
  carColor: string;

  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  transmission: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  cylinders: number;

  @IsNumber()
  @IsOptional()
  year: number;

  constructor(dto: UpdateCarDtoData) {
    if (dto) {
      this.carColor = dto.carColor;
      this.price = dto.price;
      this.sell = dto.sell;
      this.category = dto.category;
      this.cylinders = dto.cylinders;
      this.year = dto.year;
      this.type = dto.type;
      this.transmission = dto.transmission;
      this.make = dto.make;
      this.name = dto.name;
    }
  }
}
