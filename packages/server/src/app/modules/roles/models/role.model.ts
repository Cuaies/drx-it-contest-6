import {
  Column,
  Model,
  Table,
  Unique,
  DataType,
  BelongsToMany,
  BeforeUpdate,
  BeforeDestroy,
  HasMany,
} from 'sequelize-typescript';
import { RolesEnum } from '../../../../ts/enums';
import { User } from '../../users/models';
import { UserRole } from '../../../../core/relationships';
import { SequelizeScopeError } from 'sequelize';
import { DBOpsErrorMessages } from '../../../../core/messages';
import { Stage } from '../../stages/models/stage.model';

@Table({ timestamps: false })
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

  @HasMany(() => Stage)
  permittedStages: Stage[];

  @BeforeUpdate
  static preventUpdate() {
    throw new SequelizeScopeError(DBOpsErrorMessages.ImmutableTable);
  }

  @BeforeDestroy
  static preventDelete() {
    throw new SequelizeScopeError(DBOpsErrorMessages.ImmutableTable);
  }
}
