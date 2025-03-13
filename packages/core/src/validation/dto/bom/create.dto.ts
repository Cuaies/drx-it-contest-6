import { IsNotEmpty, IsString } from "class-validator";

class BOMCreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export const getBOMCreateDto = () => BOMCreateDto;
