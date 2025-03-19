import { PDFDocument } from 'pdf-lib';
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
  async generate({
    product,
  }: DocumentTemplateSpecificData[DocumentTemplatesEnum.ProductReport]) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(this.config.pageSize);
    const { width } = page.getSize();
    const primaryFont = await pdfDoc.embedFont(this.config.primaryFont);
    const secondaryFont = await pdfDoc.embedFont(this.config.secondaryFont);
    const x = this.config.xMargin;

    /**
     * Title
     */
    const TITLE = 'Product Report';
    const titleTextWidth = primaryFont.widthOfTextAtSize(
      TITLE,
      this.config.titleSize,
    );
    page.drawText(TITLE, {
      x: (width - titleTextWidth) / 2,
      y: this.getYOffset(),
      size: this.config.titleSize,
      font: secondaryFont,
    });

    /**
     * Product details block
     */

    page.drawText(`Identifier: ${product.id}`, {
      x,
      y: this.getYOffset(40),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Related BOM: ${product.bomId}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Name: ${product.name}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Created: ${product.createdAt.toLocaleDateString()}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Updated: ${product.updatedAt.toLocaleDateString()}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    const RIGHT_BLOCK_LINE1 = `Estimated height: ${product.estimatedHeight}`;
    const rightBlockLine1Width = primaryFont.widthOfTextAtSize(
      RIGHT_BLOCK_LINE1,
      this.config.paragraphSize,
    );
    page.drawText(RIGHT_BLOCK_LINE1, {
      x: width - 50 - rightBlockLine1Width,
      y: this.getYOffset(-60),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    const RIGHT_BLOCK_LINE2 = `Estimated weight: ${product.estimatedWeight}`;
    const rightBlockLine2Width = primaryFont.widthOfTextAtSize(
      RIGHT_BLOCK_LINE2,
      this.config.paragraphSize,
    );
    page.drawText(RIGHT_BLOCK_LINE2, {
      x: width - 50 - rightBlockLine2Width,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    const RIGHT_BLOCK_LINE3 = `Estimated width: ${product.estimatedWidth}`;
    const rightBlockLine3Width = primaryFont.widthOfTextAtSize(
      RIGHT_BLOCK_LINE3,
      this.config.paragraphSize,
    );
    page.drawText(RIGHT_BLOCK_LINE3, {
      x: width - 50 - rightBlockLine3Width,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    this.getYOffset(15);
    this.getYOffset(15);

    /**
     * Product(s) details block
     */
    const SPECIFICATIONS_HEADER = 'Specifications';
    page.drawText(SPECIFICATIONS_HEADER, {
      x,
      y: this.getYOffset(35),
      size: this.config.headerSize,
      font: secondaryFont,
    });

    page.drawText(`${product.description}`, {
      x,
      y: this.getYOffset(17.5),
      size: this.config.paragraphSize,
      maxWidth: width - 100,
      lineHeight: 15,
      font: primaryFont,
    });

    const STAGES_HEADER = 'Stages History';
    page.drawText(STAGES_HEADER, {
      x,
      y: this.getYOffset(150),
      size: this.config.headerSize,
      font: secondaryFont,
    });

    // TODO: generate stage history chart
    // const labels: string[] = [];
    // const datasets: { data: any[]; backgroundColor: string[] } = {
    //   data: [],
    //   backgroundColor: [],
    // };

    // product.stages.forEach((stage, i) => {
    //   let startDate, endDate;

    //   labels.push(transformModelAttribute(stage.name));
    //   datasets.data.push([startDate.getTime(), endDate.getTime()]);
    //   datasets.backgroundColor.push('rgba(0, 150, 170, 0.3)');
    // });

    // const imageBytes = await fetchQuickChart({
    //   labels,
    //   datasets: [datasets],
    // });
    // const stagesHistoryChart = await pdfDoc.embedPng(imageBytes);
    // const stagesHistoryChartDimensions = stagesHistoryChart.scale(0.4);
    // page.drawImage(stagesHistoryChart, {
    //   x,
    //   y: this.getYOffset(30) - stagesHistoryChartDimensions.height,
    //   width: stagesHistoryChartDimensions.width,
    //   height: stagesHistoryChartDimensions.height,
    // });

    return await pdfDoc.save();
  }
}
