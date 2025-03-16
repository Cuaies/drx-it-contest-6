import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models';
import { UserRole } from '../../../core/relationships';
import { User } from '../users/models';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
    @InjectModel(UserRole)
    private userRoleModel: typeof UserRole,
  ) {}

  async getRoles() {
    return this.roleModel.findAll();
  }

  async getRoleUsers(roleId: number) {
    const role = await this.roleModel.findByPk(roleId, {
      include: [{ model: User, through: { attributes: [] } }],
    });

    if (!role) {
      throw new NotFoundException();
    }

    return role.users;
  }
}
