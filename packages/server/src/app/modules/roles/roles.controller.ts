import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Routes } from '../../../core/constants';

@Controller(Routes.Roles.Base)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(Routes.Roles.GET)
  getRoles() {
    return this.rolesService.getRoles();
  }
}
