import { Module } from '@nestjs/common';
import { BomsService } from './boms.service';
import { BomsController } from './boms.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bom } from './models/bom.model';
import { BomMaterial } from '../../../core/relationships';

@Module({
  imports: [SequelizeModule.forFeature([Bom, BomMaterial])],
  controllers: [BomsController],
  providers: [BomsService],
})
export class BomsModule {}
