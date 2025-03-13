import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Material } from '../../materials/models/material.model';
import { BOMMaterial } from '../../../../core/relationships';

@Table({ paranoid: true, timestamps: true })
export class BOM extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Material, () => BOMMaterial)
  materials: Material[];
}
