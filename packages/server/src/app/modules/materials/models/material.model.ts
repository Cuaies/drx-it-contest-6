import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

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
}
