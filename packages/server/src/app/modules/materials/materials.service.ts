import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Material } from './models/material.model';
import { InjectModel } from '@nestjs/sequelize';
import { getMaterialCreateDto, getPaginationDto } from '@drx-it-contest-6/core';
import { Response } from 'express';
import { PaginationService } from '../pagination/pagination.service';

export class MaterialCreateDto extends getMaterialCreateDto() {}
export class PaginationDto extends getPaginationDto() {}

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(Material)
    private materialModel: typeof Material,
    private paginationService: PaginationService,
  ) {}

  getMaterials(paginationDto: PaginationDto) {
    return this.paginationService.paginate(paginationDto, this.materialModel);
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
