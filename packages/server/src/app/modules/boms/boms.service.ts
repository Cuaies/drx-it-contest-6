import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bom } from './models/bom.model';
import {
  getBomCreateDto,
  getBomMaterialCreateDto,
} from '@drx-it-contest-6/core';
import { Response } from 'express';
import { BomMaterial } from '../../../core/relationships';
import { Material } from '../materials/models/material.model';

export class BomCreateDto extends getBomCreateDto() {}
export class BomMaterialCreateDto extends getBomMaterialCreateDto() {}

@Injectable()
export class BomsService {
  constructor(
    @InjectModel(Bom)
    private BomModel: typeof Bom,
    @InjectModel(BomMaterial)
    private BomMaterialModel: typeof BomMaterial,
  ) {}

  getBoms() {
    return this.BomModel.findAll();
  }

  async createBom(BomCreateDto: BomCreateDto) {
    const bom = (await this.BomModel.create({ ...BomCreateDto }))?.dataValues;

    return bom;
  }

  async getBom(bomId: number) {
    const bom = (await this.BomModel.findByPk(bomId))?.dataValues;

    if (!bom) {
      throw new NotFoundException();
    }

    return bom;
  }

  async deleteBom(res: Response, bomId: number) {
    const deleted = await this.BomModel.destroy({
      where: {
        [Bom.primaryKeyAttribute]: bomId,
      },
    });

    if (deleted) {
      res.status(HttpStatus.OK);
    } else {
      res.status(HttpStatus.NOT_FOUND);
    }
  }

  async getBomMaterials(bomId: number) {
    const materials = await this.BomMaterialModel.findAll({
      where: { [Bom.primaryKeyAttribute]: bomId },
    });

    return materials;
  }

  async createBomMaterial(
    res: Response,
    bomId: number,
    BomMaterialCreateDto: BomMaterialCreateDto,
  ) {
    const [bomExists, materialExists] = await Promise.all([
      Bom.findByPk(bomId),
      Material.findByPk(BomMaterialCreateDto.materialNumber),
    ]);

    if (!bomExists || !materialExists) {
      throw new NotFoundException();
    }

    let bomMaterial;

    try {
      bomMaterial = await this.BomMaterialModel.create({
        bomId,
        ...BomMaterialCreateDto,
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
