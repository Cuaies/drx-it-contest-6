import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class ProductCreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description!: string;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  estimatedHeight!: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  estimatedWeight!: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  estimatedWidth!: number;
}

export const getProductCreateDto = () => ProductCreateDto;
