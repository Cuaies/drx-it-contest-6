import { Injectable } from '@nestjs/common';
import { Stage } from './models/stage.model';
import { InjectModel } from '@nestjs/sequelize';
import { getPaginationDto } from '@drx-it-contest-6/core';
import { PaginationService } from '../pagination/pagination.service';

export class PaginationDto extends getPaginationDto() {}

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stage)
    private stageModel: typeof Stage,
    private paginationService: PaginationService,
  ) {}

  getStages(paginationDto: PaginationDto) {
    return this.paginationService.paginate(paginationDto, this.stageModel, {});
  }
}
