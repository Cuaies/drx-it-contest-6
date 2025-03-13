import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { BOM } from '../../boms/models/bom.model';
import { BOMMaterial } from '../../../../core/relationships';

@Table({ paranoid: true, timestamps: true })
export class Material extends Model {
  @PrimaryKey
  @Column
  materialNumber: string;

  @Column
  materialDescription: string;

  @Column
  height: number;

  @Column
  weight: number;

  @Column
  width: number;

  @BelongsToMany(() => BOM, () => BOMMaterial)
  boms: BOM[];
}
