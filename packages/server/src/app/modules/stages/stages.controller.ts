import { Controller, Get, Query } from '@nestjs/common';
import { StagesService } from './stages.service';
import { Routes } from '../../../core/constants';
import { getPaginationDto } from '@drx-it-contest-6/core';

export class PaginationDto extends getPaginationDto() {}

@Controller(Routes.Stages.Base)
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get(Routes.Stages.GET)
  getStages(@Query() paginationDto: PaginationDto) {
    return this.stagesService.getStages(paginationDto);
  }
}
