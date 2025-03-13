import { Module } from '@nestjs/common';
import { BOMsService } from './boms.service';
import { BOMsController } from './boms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BOM } from './models/bom.model';

@Module({
  imports: [SequelizeModule.forFeature([BOM])],
  controllers: [BOMsController],
  providers: [BOMsService],
})
export class BOMsModule {}
