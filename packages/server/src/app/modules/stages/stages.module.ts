import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stage } from './models/stage.model';
import { ProductStage } from '../../../core/relationships';

@Module({
  imports: [SequelizeModule.forFeature([Stage, ProductStage])],
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
