import { BaseDocumentConfig } from '../configs';
import {
  DocumentTemplateGeneratorStrategy,
  DocumentTemplatesEnum,
  DocumentTemplateSpecificData,
} from '../types';

export class ProductReportTemplateGenerator
  extends BaseDocumentConfig
  implements
    DocumentTemplateGeneratorStrategy<
      DocumentTemplateSpecificData[DocumentTemplatesEnum.ProductReport]
    >
{
  async generate(
    data: DocumentTemplateSpecificData[DocumentTemplatesEnum.ProductReport],
  ) {
    // TODO: create
    await data;
    return new Uint8Array();
  }
}
