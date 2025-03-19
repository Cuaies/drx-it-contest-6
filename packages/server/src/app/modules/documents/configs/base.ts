import { PageSizes, rgb, StandardFonts } from 'pdf-lib';
import {
  BaseDocumentConfigOptionsSpecification,
  BaseDocumentConfigSpecification,
} from '../types';

/**
 * Base document configuration, from page size to font options, and so on.
 */
export class BaseDocumentConfig implements BaseDocumentConfigSpecification {
  constructor(
    public config: BaseDocumentConfigOptionsSpecification = {
      pageSize: PageSizes.A4,
      xMargin: 50,
      primaryFont: StandardFonts.Helvetica,
      secondaryFont: StandardFonts.HelveticaBold,
      titleSize: 20,
      headerSize: 16,
      subHeaderSize: 13,
      paragraphSize: 11,
      smallParagraphSize: 9,
      spanSize: 7,
      tableConfig: {
        textSize: 9,
        border: { width: 0 },
        contentAlignment: 'center',
        header: {
          contentAlignment: 'center',
          textSize: 11,
          backgroundColor: rgb(0.9, 0.9, 0.9),
        },
      },
    },
    public yOffset: number = config.pageSize[1] - 50,
  ) {
    this.config = config;
  }

  public getYOffset(offsetAmount?: number) {
    if (offsetAmount) {
      this.yOffset -= offsetAmount;
    }

    return this.yOffset;
  }
}
