import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StagesService } from './stages.service';
import { Routes } from '../../../core/constants';
import { getPaginationDto } from '@drx-it-contest-6/core';
import { JwtAtGuard, RolesGuard } from '../../../core/guards';
import { Roles } from '../../../core/decorators';
import { RolesEnum } from '../../../ts/enums';

export class PaginationDto extends getPaginationDto() {}

@Controller(Routes.Stages.Base)
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Get(Routes.Stages.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getStages(@Query() paginationDto: PaginationDto) {
    return this.stagesService.getStages(paginationDto);
  }
}
