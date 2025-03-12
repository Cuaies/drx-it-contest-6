import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from "class-validator";

class LoginDto {
  @IsEmail()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty()
  email!: string;

  @IsStrongPassword()
  @MaxLength(20)
  @IsNotEmpty()
  password!: string;
}

export const getLoginDto = () => LoginDto;
