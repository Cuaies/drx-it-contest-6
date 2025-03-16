import { Module } from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Material } from './models/material.model';
import { BomMaterial } from '../../../core/relationships';

@Module({
  imports: [SequelizeModule.forFeature([Material, BomMaterial])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
