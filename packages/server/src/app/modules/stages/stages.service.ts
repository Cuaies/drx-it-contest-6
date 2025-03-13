import { Injectable } from '@nestjs/common';
import { Stage } from './models/stage.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StagesService {
  constructor(
    @InjectModel(Stage)
    private stageModel: typeof Stage,
  ) {}

  async getStages() {
    return this.stageModel.findAll();
  }
}
