import { StandardFonts } from 'pdf-lib';
import { DrawTableOptions } from 'pdf-lib-draw-table-beta';
import { TableOptionsDeepPartial } from 'pdf-lib-draw-table-beta/build/types';

export interface BaseDocumentConfigSpecification {
  config: BaseDocumentConfigOptionsSpecification;

  yOffset: number;
  getYOffset(offsetAmount: number): number;
}

export interface BaseDocumentConfigOptionsSpecification {
  pageSize: [number, number];
  xMargin: number;
  primaryFont: StandardFonts;
  secondaryFont: StandardFonts;
  titleSize: number;
  headerSize: number;
  subHeaderSize: number;
  paragraphSize: number;
  smallParagraphSize: number;
  spanSize: number;
  tableConfig: TableOptionsDeepPartial<DrawTableOptions> | undefined;
}
