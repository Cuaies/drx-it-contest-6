import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import {
  DocumentTemplateGeneratorStrategy,
  DocumentTemplatesEnum,
  DocumentTemplateSpecificData,
} from './types';
import {
  BillOfMaterialsTemplateGenerator,
  ProductReportTemplateGenerator,
} from './templates';
import { Product } from '../products/models/product.model';
import { InjectModel } from '@nestjs/sequelize';
import { Bom } from '../boms/models/bom.model';
import { Stage } from '../stages/models/stage.model';
import { createStreamableFileOptions } from '../../../core/utils';
import { Material } from '../materials/models/material.model';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(Bom)
    private bomModel: typeof Bom,
  ) {}

  /**
   * Available document templates.
   */
  private strategies: Record<
    DocumentTemplatesEnum,
    DocumentTemplateGeneratorStrategy<unknown>
  > = {
    [DocumentTemplatesEnum.BillOfMaterials]:
      new BillOfMaterialsTemplateGenerator(),
    [DocumentTemplatesEnum.ProductReport]: new ProductReportTemplateGenerator(),
  };

  /**
   * Generates PDF documents based on chosen template.
   */
  public generateDocumentPdf<Template extends DocumentTemplatesEnum>(
    template: Template,
    data: DocumentTemplateSpecificData[Template],
  ) {
    return this.strategies[template].generate(data);
  }

  public async getProductReport(productId: number) {
    const product = await this.productModel.findByPk(productId, {
      include: [Bom, Stage],
    });

    if (!product) {
      throw new NotFoundException();
    }

    return new StreamableFile(
      await this.generateDocumentPdf(DocumentTemplatesEnum.ProductReport, {
        product,
      }),
      createStreamableFileOptions('pdf', `product-report-${product.id}`),
    );
  }

  public async getBOM(bomId: number) {
    const bom = await this.bomModel.findByPk(bomId, {
      include: [Product, Material],
    });

    if (!bom) {
      throw new NotFoundException();
    }

    return new StreamableFile(
      await this.generateDocumentPdf(DocumentTemplatesEnum.BillOfMaterials, {
        bom,
      }),
      createStreamableFileOptions('pdf', `bom-${bom.id}`),
    );
  }
}
