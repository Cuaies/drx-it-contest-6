import {
  BeforeCreate,
  BeforeDestroy,
  BeforeUpdate,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { StagesEnum } from '../../../../ts/enums';
import { DBOpsErrorMessages } from '../../../../core/messages';
import { SequelizeScopeError } from 'sequelize';
import { StageDescriptions } from '../../../../core/constants/stageDescription.constants';
import { StageDescription } from '../../../../ts/types';

@Table
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
}
