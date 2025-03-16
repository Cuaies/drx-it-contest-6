import {
  BeforeCreate,
  BeforeDestroy,
  BeforeUpdate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { StagesEnum } from '../../../../ts/enums';
import { DBOpsErrorMessages } from '../../../../core/messages';
import { SequelizeScopeError } from 'sequelize';
import { StageDescriptions } from '../../../../core/constants/stageDescription.constants';
import { StageDescription } from '../../../../ts/types';
import { Product } from '../../products/models/product.model';
import { ProductStage } from '../../../../core/relationships';
import { Role } from '../../roles/models';

@Table({ paranoid: true, timestamps: false })
export class Stage extends Model {
  @Unique
  @Column({
    type: DataType.ENUM(...Object.values(StagesEnum)),
    unique: true,
    allowNull: false,
  })
  name: StagesEnum;

  @Column
  description: StageDescription;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  permittedRole: Role;

  @BeforeCreate
  static setDescription(instance: Stage) {
    instance.description = StageDescriptions[instance.name];
  }

  @BeforeUpdate
  static preventUpdate() {
    throw new SequelizeScopeError(DBOpsErrorMessages.ImmutableTable);
  }

  @BeforeDestroy
  static preventDelete() {
    throw new SequelizeScopeError(DBOpsErrorMessages.ImmutableTable);
  }

  @BelongsToMany(() => Product, () => ProductStage)
  products: Product[];
}
