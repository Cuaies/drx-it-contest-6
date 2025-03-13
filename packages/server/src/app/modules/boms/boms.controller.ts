import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { BOMsService } from './boms.service';
import {
  getBOMCreateDto,
  getBOMMaterialCreateDto,
} from '@drx-it-contest-6/core';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { Response } from 'express';

export class BOMCreateDto extends getBOMCreateDto() {}
export class BOMMaterialCreateDto extends getBOMMaterialCreateDto() {}

@Controller(Routes.BOMs.Base)
export class BOMsController {
  constructor(private readonly bomsService: BOMsService) {}

  @Get(Routes.BOMs.GET)
  getBOMs() {
    return this.bomsService.getBOMs();
  }

  @Post(Routes.BOMs.POST)
  createBOM(@Body() BOMCreateDto: BOMCreateDto) {
    return this.bomsService.createBOM(BOMCreateDto);
  }

  @Get(Routes.BOMs.BOM.GET)
  getBOM(@Param(Params.BOMId) id: string) {
    return this.bomsService.getBOM(+id);
  }

  @Delete(Routes.BOMs.BOM.DELETE)
  deleteBOM(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.BOMId) id: string,
  ) {
    return this.bomsService.deleteBOM(res, +id);
  }

  @Get(Routes.BOMs.BOM.MATERIALS.GET)
  getBOMMaterials(@Param(Params.BOMId) id: string) {
    return this.bomsService.getBOMMaterials(+id);
  }

  @Post(Routes.BOMs.BOM.MATERIALS.POST)
  createBOMMaterial(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.BOMId) id: string,
    @Body() BOMMaterialCreateDto: BOMMaterialCreateDto,
  ) {
    return this.bomsService.createBOMMaterial(res, +id, BOMMaterialCreateDto);
  }
}
