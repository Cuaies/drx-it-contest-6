import { Transform } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsPositive } from "class-validator";

class ProductStageCreateDto {
  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  @IsPositive()
  productId!: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  @IsPositive()
  stageId!: number;

  @IsDate()
  @IsOptional()
  startOfStage!: Date;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  userId!: number;
}

export const getProductStageCreateDto = () => ProductStageCreateDto;
