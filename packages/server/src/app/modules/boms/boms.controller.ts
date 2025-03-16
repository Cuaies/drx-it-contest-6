import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BomsService } from './boms.service';
import {
  getBomCreateDto,
  getBomMaterialCreateDto,
} from '@drx-it-contest-6/core';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { Response } from 'express';

export class BomCreateDto extends getBomCreateDto() {}
export class BomMaterialCreateDto extends getBomMaterialCreateDto() {}

@Controller(Routes.Boms.Base)
export class BomsController {
  constructor(private readonly bomsService: BomsService) {}

  @Get(Routes.Boms.GET)
  getBoms() {
    return this.bomsService.getBoms();
  }

  @Post(Routes.Boms.POST)
  createBom(@Body() bomCreateDto: BomCreateDto) {
    return this.bomsService.createBom(bomCreateDto);
  }

  @Get(Routes.Boms.Bom.GET)
  getBom(@Param(Params.BomId) id: string) {
    return this.bomsService.getBom(+id);
  }

  @Delete(Routes.Boms.Bom.DELETE)
  deleteBom(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.BomId) id: string,
  ) {
    return this.bomsService.deleteBom(res, +id);
  }

  @Get(Routes.Boms.Bom.MATERIALS.GET)
  getBomMaterials(@Param(Params.BomId) id: string) {
    return this.bomsService.getBomMaterials(+id);
  }

  @Post(Routes.Boms.Bom.MATERIALS.POST)
  createBomMaterial(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.BomId) id: string,
    @Body() bomMaterialCreateDto: BomMaterialCreateDto,
  ) {
    return this.bomsService.createBomMaterial(res, +id, bomMaterialCreateDto);
  }
}
