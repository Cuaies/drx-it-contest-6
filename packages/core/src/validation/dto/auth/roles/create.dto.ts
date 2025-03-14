import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

class CreateUserRoleDto {
  @Transform(({ value }) => Math.round(Number(value)))
  @IsNumber()
  roleId!: number;
}

export const getCreateUserRoleDto = () => CreateUserRoleDto;
