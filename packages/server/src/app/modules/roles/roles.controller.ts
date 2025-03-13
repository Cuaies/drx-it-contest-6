import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { JwtAtGuard } from '../../../core/guards';

@Controller(Routes.Roles.Base)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(Routes.Roles.GET)
  @UseGuards(JwtAtGuard)
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Get(Routes.Roles.Users.GET)
  @UseGuards(JwtAtGuard)
  getRoleUsers(@Param(Params.RoleId) roleId: number) {
    return this.rolesService.getRoleUsers(roleId);
  }
}
