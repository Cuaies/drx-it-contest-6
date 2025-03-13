import {
  getProductCreateDto,
  getProductUpdateDto,
} from '@drx-it-contest-6/core';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Response } from 'express';

export class ProductCreateDto extends getProductCreateDto() {}
export class ProductUpdateDto extends getProductUpdateDto() {}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  getProducts() {
    return this.productModel.findAll();
  }

  async createProduct(createProductDto: ProductCreateDto) {
    const product = (await this.productModel.create({ ...createProductDto }))
      ?.dataValues;

    return product;
  }

  async getProduct(productId: number) {
    const product = (await this.productModel.findByPk(productId))?.dataValues;

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async updateProduct(
    res: Response,
    productId: number,
    productUpdateDto: ProductUpdateDto,
  ) {
    if (Object.keys(productUpdateDto).length === 0) {
      res.status(HttpStatus.ACCEPTED);
      return;
    }

    const product = await this.productModel.findByPk(productId);

    if (!product) {
      throw new NotFoundException();
    }

    return product.update({ ...productUpdateDto });
  }

  async deleteProduct(productId: number) {
    await this.productModel.destroy({ where: { id: productId } });
  }
}
