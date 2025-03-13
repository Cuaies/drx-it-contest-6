import { Column, Model, Table } from 'sequelize-typescript';

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
}
