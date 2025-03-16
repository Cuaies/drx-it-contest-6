import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../app/modules/products/models/product.model';
import { Stage } from '../../app/modules/stages/models/stage.model';
import { User } from '../../app/modules/users/models';

@Table({ timestamps: false })
export class ProductStage extends Model {
  @PrimaryKey
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product)
  product: Product;

  @PrimaryKey
  @ForeignKey(() => Stage)
  @Column
  stageId: string;

  @BelongsTo(() => Stage)
  stage: Stage;

  @PrimaryKey
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  startOfStage: Date;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
