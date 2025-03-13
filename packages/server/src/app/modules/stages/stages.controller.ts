import { Controller, Get } from '@nestjs/common';
import { StagesService } from './stages.service';
import { Routes } from '../../../core/constants';

@Controller(Routes.Stages.Base)
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get(Routes.Stages.GET)
  getStages() {
    return this.stagesService.getStages();
  }
}
