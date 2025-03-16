import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  getPaginationDto,
  getProductCreateDto,
  getProductStageCreateDto,
  getProductUpdateDto,
} from '@drx-it-contest-6/core';
import { Routes } from '../../../core/constants';
import { Params, RolesEnum } from '../../../ts/enums';
import { Response } from 'express';
import { AuthUser, Roles } from '../../../core/decorators';
import { User } from '../users/models';
import { JwtAtGuard, RolesGuard } from '../../../core/guards';

export class ProductCreateDto extends getProductCreateDto() {}
export class ProductUpdateDto extends getProductUpdateDto() {}
export class ProductStageCreateDto extends getProductStageCreateDto() {}
export class PaginationDto extends getPaginationDto() {}

@Controller(Routes.Products.Base)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(Routes.Products.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getProducts(@Query() paginationDto: PaginationDto) {
    return this.productsService.getProducts(paginationDto);
  }

  @Post(Routes.Products.POST)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  createProduct(@Body() createProductDto: ProductCreateDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(Routes.Products.Product.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getProduct(@Param(Params.ProductId) id: string) {
    return this.productsService.getProduct(+id);
  }

  @Patch(Routes.Products.Product.PATCH)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  updateProduct(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.ProductId) id: string,
    @Body() productUpdateDto: ProductUpdateDto,
  ) {
    return this.productsService.updateProduct(res, +id, productUpdateDto);
  }

  @Delete(Routes.Products.Product.DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  deleteProduct(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.ProductId) id: string,
  ) {
    return this.productsService.deleteProduct(res, +id);
  }

  @Get(Routes.Products.Product.Stages.GET)
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAtGuard, RolesGuard)
  getProductStages(@Param(Params.ProductId) id: string) {
    return this.productsService.getProductStages(+id);
  }

  @Post(Routes.Products.Product.Stages.POST)
  @UseGuards(JwtAtGuard)
  createProductStage(
    @AuthUser() user: User,
    @Param(Params.ProductId) id: string,
    @Body() productStageCreateDto: ProductStageCreateDto,
  ) {
    return this.productsService.createProductStage(
      user,
      +id,
      productStageCreateDto,
    );
  }
}
