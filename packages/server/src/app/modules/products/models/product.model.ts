import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProductStage } from '../../../../core/relationships';
import { Stage } from '../../stages/models/stage.model';
import { Bom } from '../../boms/models/bom.model';

@Table({ paranoid: true, timestamps: true })
export class Product extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  estimatedHeight: number;

  @Column
  estimatedWeight: number;

  @Column
  estimatedWidth: number;

  @ForeignKey(() => Bom)
  @Column
  bomId: number;

  @BelongsTo(() => Bom)
  bom: Bom;

  @BelongsToMany(() => Stage, () => ProductStage)
  stages: Stage[];
}
