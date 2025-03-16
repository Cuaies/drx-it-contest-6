import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Routes } from '../../../core/constants';
import { Params, RolesEnum } from '../../../ts/enums';
import { JwtAtGuard, RolesGuard } from '../../../core/guards';
import { Roles } from '../../../core/decorators';
import { getPaginationDto } from '@drx-it-contest-6/core';

export class PaginationDto extends getPaginationDto() {}

@Controller(Routes.Roles.Base)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(Routes.Roles.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getRoles(@Query() paginationDto: PaginationDto) {
    return this.rolesService.getRoles(paginationDto);
  }

  @Get(Routes.Roles.Users.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getRoleUsers(
    @Query() paginationDto: PaginationDto,
    @Param(Params.RoleId) roleId: number,
  ) {
    return this.rolesService.getRoleUsers(paginationDto, roleId);
  }
}
