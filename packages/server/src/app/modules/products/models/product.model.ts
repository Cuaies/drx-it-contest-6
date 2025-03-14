import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { ProductStage } from '../../../../core/relationships';
import { Stage } from '../../stages/models/stage.model';

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

  @BelongsToMany(() => Stage, () => ProductStage)
  stages: Stage[];
}
