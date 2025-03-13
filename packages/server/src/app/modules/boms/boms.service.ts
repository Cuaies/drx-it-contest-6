import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BOM } from './models/bom.model';
import {
  getBOMCreateDto,
  getBOMMaterialCreateDto,
} from '@drx-it-contest-6/core';
import { Response } from 'express';
import { BOMMaterial } from '../../../core/relationships';
import { Material } from '../materials/models/material.model';

export class BOMCreateDto extends getBOMCreateDto() {}
export class BOMMaterialCreateDto extends getBOMMaterialCreateDto() {}

@Injectable()
export class BOMsService {
  constructor(
    @InjectModel(BOM)
    private BOMModel: typeof BOM,
    @InjectModel(BOMMaterial)
    private BOMMaterialModel: typeof BOMMaterial,
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

  async getBOMMaterials(BOMId: number) {
    const materials = await this.BOMMaterialModel.findAll({
      where: { BOMId },
    });

    return materials;
  }

  async createBOMMaterial(
    res: Response,
    BOMId: number,
    BOMMaterialCreateDto: BOMMaterialCreateDto,
  ) {
    const [bomExists, materialExists] = await Promise.all([
      BOM.findByPk(BOMId),
      Material.findByPk(BOMMaterialCreateDto.materialNumber),
    ]);

    if (!bomExists || !materialExists) {
      throw new NotFoundException();
    }

    let bomMaterial;

    try {
      bomMaterial = await this.BOMMaterialModel.create({
        BOMId,
        ...BOMMaterialCreateDto,
      });
    } catch (e) {
      if (e instanceof Error && e.name === 'SequelizeUniqueConstraintError') {
        res.status(HttpStatus.CONFLICT);
        return;
      }
    }

    return bomMaterial;
  }
}
