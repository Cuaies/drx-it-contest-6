import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models';
import { UserRole } from '../../../core/relationships';
import { User } from '../users/models';
import { PaginationService } from '../pagination/pagination.service';
import { getPaginationDto } from '@drx-it-contest-6/core';

export class PaginationDto extends getPaginationDto() {}

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
    private paginationService: PaginationService,
  ) {}

  getRoles(paginationDto: PaginationDto) {
    return this.paginationService.paginate(paginationDto, this.roleModel);
  }

  getRoleUsers(paginationDto: PaginationDto, roleId: number) {
    return this.paginationService.paginate(
      paginationDto,
      this.userRoleModel,
      { roleId },
      { include: [User] },
    );
  }
}
