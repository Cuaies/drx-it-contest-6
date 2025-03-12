import { Injectable } from '@nestjs/common';
import { Role } from './models/role.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private roleModel: typeof Role,
  ) {}

  async getRoles() {
    return this.roleModel.findAll();
  }
}
