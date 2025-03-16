import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Transform } from "class-transformer";

class MaterialCreateDto {
  @IsString()
  @IsNotEmpty()
  materialNumber!: string;

  @IsString()
  @IsNotEmpty()
  materialDescription!: string;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  height!: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  weight!: number;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  width!: number;
}

export const getMaterialCreateDto = () => MaterialCreateDto;
