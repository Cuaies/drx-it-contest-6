import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class BOMMaterialCreateDto {
  @IsString()
  @IsNotEmpty()
  materialNumber!: string;

  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  qty!: number;

  @IsString()
  @IsNotEmpty()
  unitMeasureCode!: string;
}

export const getBOMMaterialCreateDto = () => BOMMaterialCreateDto;
