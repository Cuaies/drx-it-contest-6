import { IsNotEmpty, IsString } from "class-validator";

class BomCreateDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

export const getBomCreateDto = () => BomCreateDto;
