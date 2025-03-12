import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { getLoginDto, getRegisterDto } from '@drx-it-contest-6/core';
import { Response } from 'express';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(response, loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
