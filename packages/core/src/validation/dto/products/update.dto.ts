import { IsNumber, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

class ProductUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  @IsOptional()
  estimatedHeight?: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  @IsOptional()
  estimatedWeight?: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  @IsOptional()
  estimatedWidth?: number;
}
export const getProductUpdateDto = () => ProductUpdateDto;
