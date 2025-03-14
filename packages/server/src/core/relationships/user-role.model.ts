import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import { User } from '../../app/modules/users/models';
import { Role } from '../../app/modules/roles/models';

@Table({ paranoid: true, updatedAt: false })
export class UserRole extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  product: User;

  @PrimaryKey
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;
}
