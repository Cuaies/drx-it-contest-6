import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Bom } from '../../app/modules/boms/models/bom.model';
import { Material } from '../../app/modules/materials/models/material.model';

@Table
export class BomMaterial extends Model {
  @ForeignKey(() => Bom)
  @Column
  bomId: number;

  @ForeignKey(() => Material)
  @Column
  materialNumber: string;

  @Column
  qty: number;

  @Column
  unitMeasureCode: string;
}
