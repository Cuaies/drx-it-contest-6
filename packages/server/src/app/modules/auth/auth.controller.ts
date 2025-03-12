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
// skipcq: JS-0257
import { Response } from 'express';
import { Routes } from '../../../core/constants';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

@Controller(Routes.Users.Base)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(Routes.Users.Register)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post(Routes.Users.Login)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.authService.login(response, loginDto);
  }

  @Post(Routes.Users.Logout)
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
