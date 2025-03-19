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
import { ServerOpsErrorMessages } from '../../../core/messages';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    @InjectModel(Bom)
    private bomModel: typeof Bom,
  ) {}

  /**
   * Gets a generator's strategy.
   */
  private getStrategy<Template extends DocumentTemplatesEnum>(
    template: Template,
  ): DocumentTemplateGeneratorStrategy<DocumentTemplateSpecificData[Template]> {
    const strategies: Record<
      DocumentTemplatesEnum,
      DocumentTemplateGeneratorStrategy<unknown>
    > = {
      [DocumentTemplatesEnum.BillOfMaterials]:
        new BillOfMaterialsTemplateGenerator(),
      [DocumentTemplatesEnum.ProductReport]:
        new ProductReportTemplateGenerator(),
    };

    const strategy = strategies[template];
    if (!strategy) {
      throw new Error(ServerOpsErrorMessages.InvalidFormatProvided);
    }

    return strategy;
  }

  /**
   * Generates PDF documents based on chosen template.
   */
  public generateDocumentPdf<Template extends DocumentTemplatesEnum>(
    template: Template,
    data: DocumentTemplateSpecificData[Template],
  ) {
    const strategy = this.getStrategy(template);
    return strategy.generate(data);
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
