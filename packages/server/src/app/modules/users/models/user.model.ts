import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { ProductStage, UserRole } from '../../../../core/relationships';
import { Role } from '../../roles/models';

@Table({ paranoid: true, timestamps: true })
export class User extends Model {
  @Unique
  @Column
  email: string;

  @Column
  name: string;

  @Unique
  @Column
  phoneNumber: string;

  @Column
  passwordHash: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @HasMany(() => ProductStage)
  productStages: ProductStage[];
}
