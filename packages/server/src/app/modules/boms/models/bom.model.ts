import { Column, Model, Table } from 'sequelize-typescript';

@Table({ paranoid: true, timestamps: true })
export class BOM extends Model {
  @Column
  name: string;
}
