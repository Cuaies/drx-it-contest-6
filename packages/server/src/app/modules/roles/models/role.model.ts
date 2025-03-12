import {
  Column,
  Model,
  Table,
  Unique,
  DataType,
  BelongsToMany,
  BeforeUpdate,
  BeforeDestroy,
} from 'sequelize-typescript';
import { RolesEnum } from '../../../../ts/enums';
import { User } from '../../auth/models';
import { UserRole } from '../../../../core/relationships';
import { SequelizeScopeError } from 'sequelize';
import { DBOpsErrorMessages } from '../../../../core/messages';

@Table
export class Role extends Model {
  @Unique
  @Column({
    type: DataType.ENUM(...Object.values(RolesEnum)),
    unique: true,
    allowNull: false,
  })
  roleName: RolesEnum;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];

  @BeforeUpdate
  static preventUpdate() {
    throw new SequelizeScopeError(DBOpsErrorMessages.ImmutableTable);
  }

  @BeforeDestroy
  static preventDelete() {
    throw new SequelizeScopeError(DBOpsErrorMessages.ImmutableTable);
  }
}
