import { Column, Model, Table, Unique } from 'sequelize-typescript';

// TODO: move model to user's domain

@Table
export class User extends Model {
  @Unique
  @Column
  email: string;

  @Column
  name: string;

  @Unique
  @Column
  phoneNumber: string;

  @Column
  passwordHash: string;
}
