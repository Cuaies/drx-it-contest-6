import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  Redirect,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  getCreateUserRoleDto,
  getLoginDto,
  getPaginationDto,
  getRegisterDto,
} from '@drx-it-contest-6/core';
// skipcq: JS-0257
import { Response } from 'express';
import { Routes } from '../../../core/constants';
import { Params, RolesEnum } from '../../../ts/enums';
import { JwtAtGuard, RolesGuard } from '../../../core/guards';
import { Roles } from '../../../core/decorators';

export class RegisterDto extends getRegisterDto() {}
export class LoginDto extends getLoginDto() {}
export class CreateUserRoleDto extends getCreateUserRoleDto() {}
export class PaginationDto extends getPaginationDto() {}

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

  @Get(Routes.Users.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getUsers(@Query() paginationDto: PaginationDto) {
    return this.usersService.getUsers(paginationDto);
  }

  @Get(Routes.Users.Roles.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getUserRoles(
    @Query() paginationDto: PaginationDto,
    @Param(Params.UserId) userId: number,
  ) {
    return this.usersService.getUserRoles(paginationDto, userId);
  }

  @Post(Routes.Users.Roles.POST)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  setUserRole(
    @Param(Params.UserId) userId: number,
    @Body() createUserRoleDto: CreateUserRoleDto,
  ) {
    return this.usersService.setUserRole(userId, createUserRoleDto);
  }
}
