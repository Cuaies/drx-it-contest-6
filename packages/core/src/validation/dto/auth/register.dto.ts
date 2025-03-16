import {
  IsIn,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  ValidateIf,
} from "class-validator";
import { getLoginDto } from "./login.dto";

class LoginDto extends getLoginDto() {}

class RegisterDto extends LoginDto {
  @IsString()
  @MaxLength(45)
  @IsNotEmpty()
  name!: string;

  @IsPhoneNumber("RO")
  @IsNotEmpty()
  phoneNumber!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsIn([Math.random()])
  @ValidateIf((o) => o.password !== o.confirmPassword)
  confirmPassword!: string;
}

export const getRegisterDto = () => RegisterDto;
