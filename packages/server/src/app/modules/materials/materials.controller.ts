import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { getMaterialCreateDto, getPaginationDto } from '@drx-it-contest-6/core';
import { Response } from 'express';

export class MaterialCreateDto extends getMaterialCreateDto() {}
export class PaginationDto extends getPaginationDto() {}

@Controller(Routes.Materials.Base)
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get(Routes.Materials.GET)
  getMaterials(@Query() paginationDto: PaginationDto) {
    return this.materialsService.getMaterials(paginationDto);
  }

  @Post(Routes.Materials.POST)
  createMaterial(@Body() materialCreateDto: MaterialCreateDto) {
    return this.materialsService.createMaterial(materialCreateDto);
  }

  @Get(Routes.Materials.Material.GET)
  getMaterial(@Param(Params.MaterialId) id: string) {
    return this.materialsService.getMaterial(id);
  }

  @Delete(Routes.Materials.Material.DELETE)
  deleteMaterial(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.MaterialId) id: string,
  ) {
    return this.materialsService.deleteMaterial(res, id);
  }
}
