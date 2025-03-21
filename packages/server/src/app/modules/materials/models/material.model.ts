import {
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Bom } from '../../boms/models/bom.model';
import { BomMaterial } from '../../../../core/relationships';

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

  @BelongsToMany(() => Bom, () => BomMaterial)
  boms: Bom[];
}
