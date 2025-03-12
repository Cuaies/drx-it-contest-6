import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';

@Controller(Routes.Roles.Base)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(Routes.Roles.GET)
  getRoles() {
    return this.rolesService.getRoles();
  }

  @Get(Routes.Roles.Users.GET)
  getRoleUsers(@Param(Params.RoleId) roleId: number) {
    return this.rolesService.getRoleUsers(roleId);
  }
}
