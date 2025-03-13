import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Material } from './models/material.model';
import { InjectModel } from '@nestjs/sequelize';
import { getMaterialCreateDto } from '@drx-it-contest-6/core';
import { Response } from 'express';

export class MaterialCreateDto extends getMaterialCreateDto() {}

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material)
    private materialModel: typeof Material,
  ) {}

  getMaterials() {
    return this.materialModel.findAll();
  }

  async createMaterial(materialCreateDto: MaterialCreateDto) {
    const product = (await this.materialModel.create({ ...materialCreateDto }))
      ?.dataValues;

    return product;
  }

  async getMaterial(materialId: string) {
    const material = (await this.materialModel.findByPk(materialId))
      ?.dataValues;

    if (!material) {
      throw new NotFoundException();
    }

    return material;
  }

  async deleteMaterial(res: Response, materialId: string) {
    const deleted = await this.materialModel.destroy({
      where: {
        [Material.primaryKeyAttribute]: materialId,
      },
    });

    if (deleted) {
      res.status(HttpStatus.OK);
    } else {
      res.status(HttpStatus.NOT_FOUND);
    }
  }
}
