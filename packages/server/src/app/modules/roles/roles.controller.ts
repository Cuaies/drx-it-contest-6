import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Routes } from '../../../core/constants';
import { Params, RolesEnum } from '../../../ts/enums';
import { JwtAtGuard, RolesGuard } from '../../../core/guards';
import { Roles } from '../../../core/decorators';

@Controller(Routes.Roles.Base)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(Routes.Roles.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Get(Routes.Roles.Users.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getRoleUsers(@Param(Params.RoleId) roleId: number) {
    return this.rolesService.getRoleUsers(roleId);
  }
}
