import { Injectable } from '@nestjs/common';
import {
  DocumentTemplateGeneratorStrategy,
  DocumentTemplatesEnum,
  DocumentTemplateSpecificData,
} from './types';
import {
  BillOfMaterialsTemplateGenerator,
  ProductReportTemplateGenerator,
} from './templates';

@Injectable()
export class DocumentsService {
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
}
