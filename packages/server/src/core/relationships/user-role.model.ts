import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from '../../app/modules/auth/models';
import { Role } from '../../app/modules/roles/models';

@Table
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;
}
