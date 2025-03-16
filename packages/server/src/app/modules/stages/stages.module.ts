import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stage } from './models/stage.model';
import { ProductStage } from '../../../core/relationships';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [SequelizeModule.forFeature([Stage, ProductStage])],
  controllers: [StagesController],
  providers: [StagesService, PaginationService],
})
export class StagesModule {}
