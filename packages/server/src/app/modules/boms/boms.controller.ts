import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BomsService } from './boms.service';
import {
  getBomCreateDto,
  getBomMaterialCreateDto,
  getPaginationDto,
} from '@drx-it-contest-6/core';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { Response } from 'express';
import { JwtAtGuard } from '../../../core/guards';
import { CacheInterceptor } from '@nestjs/cache-manager';

export class BomCreateDto extends getBomCreateDto() {}
export class BomMaterialCreateDto extends getBomMaterialCreateDto() {}
export class PaginationDto extends getPaginationDto() {}

@UseInterceptors(CacheInterceptor)
@Controller(Routes.Boms.Base)
export class BomsController {
  constructor(private readonly bomsService: BomsService) {}

  @Get(Routes.Boms.GET)
  @UseGuards(JwtAtGuard)
  getBoms(@Query() paginationDto: PaginationDto) {
    return this.bomsService.getBoms(paginationDto);
  }

  @Post(Routes.Boms.POST)
  @UseGuards(JwtAtGuard)
  createBom(@Body() bomCreateDto: BomCreateDto) {
    return this.bomsService.createBom(bomCreateDto);
  }

  @Get(Routes.Boms.Bom.GET)
  @UseGuards(JwtAtGuard)
  getBom(@Param(Params.BomId) id: string) {
    return this.bomsService.getBom(+id);
  }

  @Delete(Routes.Boms.Bom.DELETE)
  @UseGuards(JwtAtGuard)
  deleteBom(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.BomId) id: string,
  ) {
    return this.bomsService.deleteBom(res, +id);
  }

  @Get(Routes.Boms.Bom.MATERIALS.GET)
  @UseGuards(JwtAtGuard)
  getBomMaterials(
    @Query() paginationDto: PaginationDto,
    @Param(Params.BomId) id: number,
  ) {
    return this.bomsService.getBomMaterials(paginationDto, id);
  }

  @Post(Routes.Boms.Bom.MATERIALS.POST)
  @UseGuards(JwtAtGuard)
  createBomMaterial(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.BomId) id: string,
    @Body() bomMaterialCreateDto: BomMaterialCreateDto,
  ) {
    return this.bomsService.createBomMaterial(res, +id, bomMaterialCreateDto);
  }
}
