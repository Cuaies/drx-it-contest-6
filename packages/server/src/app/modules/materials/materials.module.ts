import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Material } from './models/material.model';
import { BomMaterial } from '../../../core/relationships';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [SequelizeModule.forFeature([Material, BomMaterial])],
  controllers: [MaterialsController],
  providers: [MaterialsService, PaginationService],
})
export class MaterialsModule {}
