import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../products/models/product.model';
import { Bom } from '../boms/models/bom.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, Bom])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
