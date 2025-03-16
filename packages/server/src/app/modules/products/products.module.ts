import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { ProductStage } from '../../../core/relationships';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductStage])],
  controllers: [ProductsController],
  providers: [ProductsService, PaginationService],
})
export class ProductsModule {}
