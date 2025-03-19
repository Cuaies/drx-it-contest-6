import { drawTable, TableDimensions } from 'pdf-lib-draw-table-beta';
import {
  BillOfMaterialsDocumentTemplateData,
  DocumentTemplateGeneratorStrategy,
  DocumentTemplatesEnum,
  DocumentTemplateSpecificData,
} from '../types';
import { PDFDocument, rgb } from 'pdf-lib';
import { BaseDocumentConfig } from '../configs';
import { Material } from '../../materials/models/material.model';
import { Product } from '../../products/models/product.model';

export class BillOfMaterialsTemplateGenerator
  extends BaseDocumentConfig
  implements
    DocumentTemplateGeneratorStrategy<
      DocumentTemplateSpecificData[DocumentTemplatesEnum.BillOfMaterials]
    >
{
  async generate({ bom }: BillOfMaterialsDocumentTemplateData) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(this.config.pageSize);
    const { width } = page.getSize();
    const primaryFont = await pdfDoc.embedFont(this.config.primaryFont);
    const secondaryFont = await pdfDoc.embedFont(this.config.secondaryFont);
    const x = this.config.xMargin;

    /**
     * Title
     */

    const TITLE = 'Bill Of Materials';
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
     * BOM details block
     */

    page.drawText(`Identifier: ${bom.id}`, {
      x,
      y: this.getYOffset(40),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Name: ${bom.name}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Created: ${bom.createdAt.toLocaleDateString()}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    page.drawText(`Updated: ${bom.updatedAt.toLocaleDateString()}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    /**
     * Product(s) details block
     */
    const PRODUCTS_HEADER = 'Product(s)';
    page.drawText(PRODUCTS_HEADER, {
      x,
      y: this.getYOffset(50),
      size: this.config.headerSize,
      font: secondaryFont,
    });

    page.drawText(`Product(s) count: ${bom.products.length}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    const productsTableData = [[]];
    for (const key in Product.getAttributes()) {
      if (Object.prototype.hasOwnProperty.call(Product.getAttributes(), key)) {
        if (
          !key.includes('estimated') &&
          !key.includes('bom') &&
          !key.includes('At')
        ) {
          productsTableData[0].push(key);
        }
      }
    }
    productsTableData[0] = productsTableData[0].map((key) => {
      key = key.charAt(0).toUpperCase() + key.slice(1);

      return key;
    });

    productsTableData.push(
      ...bom.products.map((val) => [
        val.id.toString(),
        val.name,
        val.description || '',
      ]),
    );

    const productTableDimension = (await drawTable(
      pdfDoc,
      page,
      productsTableData,
      x,
      this.getYOffset(10),
      {
        ...this.config.tableConfig,
        row: {
          backgroundColors: [
            ...productsTableData.slice(1).map((value, index) => {
              if (index % 2 === 0) {
                return rgb(1, 1, 1);
              } else {
                return rgb(0.95, 0.95, 0.95);
              }
            }),
          ],
        },
      },
    ).catch((e) => {
      if (e.code === 'ERR_TABLE_HEIGHT_OVERFLOW') {
        // TODO: create overflow logic
        throw e;
      }
    })) as TableDimensions;

    /**
     * Materials(s) details block
     */
    const MATERIALS_HEADER = 'Material(s)';
    page.drawText(MATERIALS_HEADER, {
      x,
      y: this.getYOffset((productTableDimension.height || 0) + 30),
      size: this.config.subHeaderSize,
      font: secondaryFont,
    });

    page.drawText(`Material(s) count: ${bom.materials.length}`, {
      x,
      y: this.getYOffset(15),
      size: this.config.paragraphSize,
      font: primaryFont,
    });

    const materialsTableData = [[]];
    for (const key in Material.getAttributes()) {
      if (Object.prototype.hasOwnProperty.call(Material.getAttributes(), key)) {
        materialsTableData[0].push(key);
      }
    }

    materialsTableData[0] = materialsTableData[0]
      .filter((str) => !str.includes('At'))
      .map((key) => {
        key = key.replace('material', '');
        key = key.charAt(0).toUpperCase() + key.slice(1);

        return key;
      });

    materialsTableData.push(
      ...bom.materials.map((val) => [
        val.materialNumber,
        val.materialDescription || '',
        val.height.toString(),
        val.weight.toString(),
        val.width.toString(),
      ]),
    );

    await drawTable(pdfDoc, page, materialsTableData, x, this.getYOffset(10), {
      ...this.config.tableConfig,
      row: {
        backgroundColors: [
          ...materialsTableData.slice(1).map((value, index) => {
            if (index % 2 === 0) {
              return rgb(1, 1, 1);
            } else {
              return rgb(0.95, 0.95, 0.95);
            }
          }),
        ],
      },
    }).catch((e) => {
      if (e.code === 'ERR_TABLE_HEIGHT_OVERFLOW') {
        // TODO: create overflow logic
        throw e;
      }
    });

    return await pdfDoc.save();
  }
}
