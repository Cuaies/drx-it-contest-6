import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BOM } from './models/bom.model';
import { getBOMCreateDto } from '@drx-it-contest-6/core';
import { Response } from 'express';

export class BOMCreateDto extends getBOMCreateDto() {}

@Injectable()
export class BOMsService {
  constructor(
    @InjectModel(BOM)
    private BOMModel: typeof BOM,
  ) {}

  getBOMs() {
    return this.BOMModel.findAll();
  }

  async createBOM(BOMCreateDto: BOMCreateDto) {
    const bom = (await this.BOMModel.create({ ...BOMCreateDto }))?.dataValues;

    return bom;
  }

  async getBOM(BOMId: number) {
    const bom = (await this.BOMModel.findByPk(BOMId))?.dataValues;

    if (!bom) {
      throw new NotFoundException();
    }

    return bom;
  }

  async deleteBOM(res: Response, BOMId: number) {
    const deleted = await this.BOMModel.destroy({
      where: {
        [BOM.primaryKeyAttribute]: BOMId,
      },
    });

    if (deleted) {
      res.status(HttpStatus.OK);
    } else {
      res.status(HttpStatus.NOT_FOUND);
    }
  }
}
