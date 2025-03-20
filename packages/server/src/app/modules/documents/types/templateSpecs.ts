import { Bom } from '../../boms/models/bom.model';
import { Product } from '../../products/models/product.model';
import { BaseDocumentConfigSpecification } from './documentSpecs';

/**
 * Document generator strategy specification.
 */
export interface DocumentTemplateGeneratorStrategy<TemplateData>
  extends BaseDocumentConfigSpecification {
  generate(data: TemplateData): Promise<Uint8Array>;
}

/**
 * Defines all available document templates.
 */
export enum DocumentTemplatesEnum {
  BillOfMaterials = 'billOfMaterials',
  ProductReport = 'productReport',
}

/**
 * Defines the specific data structure required for each document template.
 */
export type DocumentTemplateSpecificData = {
  [DocumentTemplatesEnum.BillOfMaterials]: BillOfMaterialsDocumentTemplateData;
  [DocumentTemplatesEnum.ProductReport]: ProductReportDocumentTemplateData;
};

export type BillOfMaterialsDocumentTemplateData = {
  bom: Bom;
};

export type ProductReportDocumentTemplateData = {
  product: Product;
};
