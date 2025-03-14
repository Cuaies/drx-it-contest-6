import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Material } from '../../materials/models/material.model';
import { BomMaterial } from '../../../../core/relationships';

@Table({ paranoid: true, timestamps: true })
export class Bom extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Material, () => BomMaterial)
  materials: Material[];
}
