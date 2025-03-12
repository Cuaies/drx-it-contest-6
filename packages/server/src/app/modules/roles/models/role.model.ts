import { Column, Model, Table, Unique, DataType } from 'sequelize-typescript';
import { RolesEnum } from '../../../../ts/enums';

@Table
export class Role extends Model {
  @Unique
  @Column({
    type: DataType.ENUM(...Object.values(RolesEnum)),
    allowNull: false,
  })
  roleName: RolesEnum;
}
