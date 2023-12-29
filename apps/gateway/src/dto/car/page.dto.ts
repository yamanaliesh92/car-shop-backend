import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PageCarDto {
  @IsOptional()
  @Type(() => Number)
  page: number;
}
