import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Redirect,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './auth.service';
import { getLoginDto, getRegisterDto } from '@drx-it-contest-6/core';
// skipcq: JS-0257
import { Response } from 'express';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}

@Controller(Routes.Users.Base)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(Routes.Users.Register)
  register(@Body() registerDto: RegisterDto) {
    return this.usersService.register(registerDto);
  }

  @Post(Routes.Users.Login)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDto: LoginDto,
  ) {
    return this.usersService.login(response, loginDto);
  }

  @Post(Routes.Users.Logout)
  @Redirect('/', HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.usersService.logout(response);
  }

  @Get(Routes.Users.Roles.GET)
  getUserRoles(@Param(Params.UserId) userId: number) {
    return this.usersService.getUserRoles(userId);
  }

  @Post(Routes.Users.Roles.POST)
  assignRoleToUser(
    @Param(Params.UserId) userId: number,
    @Param(Params.RoleId) roleId: number,
  ) {
    return this.usersService.assignRoleToUser(userId, roleId);
  }
}
