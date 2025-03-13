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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  getProductCreateDto,
  getProductUpdateDto,
} from '@drx-it-contest-6/core';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { Response } from 'express';

export class ProductCreateDto extends getProductCreateDto() {}
export class ProductUpdateDto extends getProductUpdateDto() {}

@Controller(Routes.Products.Base)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(Routes.Products.GET)
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post(Routes.Products.POST)
  createProduct(@Body() createProductDto: ProductCreateDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(Routes.Products.Product.GET)
  getProduct(@Param(Params.ProductId) id: string) {
    return this.productsService.getProduct(+id);
  }

  @Patch(Routes.Products.Product.PATCH)
  updateProduct(
    @Res({ passthrough: true }) res: Response,
    @Param(Params.ProductId) id: string,
    @Body() productUpdateDto: ProductUpdateDto,
  ) {
    return this.productsService.updateProduct(res, +id, productUpdateDto);
  }

  @Delete(Routes.Products.Product.DELETE)
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param(Params.ProductId) id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
