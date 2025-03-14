import {
  getProductCreateDto,
  getProductStageCreateDto,
  getProductUpdateDto,
} from '@drx-it-contest-6/core';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Response } from 'express';
import { Stage } from '../stages/models/stage.model';
import { ProductStage } from '../../../core/relationships';
import { User } from '../users/models';
import { ErrorNamesEnums } from '../../../ts/enums';

export class ProductCreateDto extends getProductCreateDto() {}
export class ProductUpdateDto extends getProductUpdateDto() {}
export class ProductStageCreateDto extends getProductStageCreateDto() {}

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(ProductStage)
    private productStageModel: typeof ProductStage,
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

  async deleteProduct(res: Response, productId: number) {
    const deleted = await this.productModel.destroy({
      where: { [Product.primaryKeyAttribute]: productId },
    });

    if (deleted) {
      res.status(HttpStatus.OK);
    } else {
      res.status(HttpStatus.NOT_FOUND);
    }
  }

  async getProductStages(productId: number) {
    const product = await this.productStageModel.findAndCountAll({
      where: {
        productId,
      },
      include: [Stage, User],
      attributes: [],
    });

    return product;
  }

  async createProductStage(
    productId: number,
    productStageCreateDto: ProductStageCreateDto,
  ) {
    let stage = await this.productStageModel
      .create({
        [Product.primaryKeyAttribute]: productId,
        ...productStageCreateDto,
      })
      .catch((e) => {
        if (e instanceof Error) {
          if (e.name === ErrorNamesEnums.SequelizeUniqueConstraintError) {
            throw new ConflictException();
          } else if (
            e.name === ErrorNamesEnums.SequelizeForeignKeyConstraintError
          ) {
            throw new BadRequestException();
          }
        }

        throw e;
      });

    if (stage) {
      stage = stage.dataValues;
    }

    return stage;
  }
}
