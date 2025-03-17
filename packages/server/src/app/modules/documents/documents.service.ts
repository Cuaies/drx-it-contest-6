import { Injectable } from '@nestjs/common';
import { PageSizes, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Bom } from '../boms/models/bom.model';
import { writeFileSync } from 'fs';
import { drawTable, DrawTableOptions } from 'pdf-lib-draw-table-beta';
import { TableOptionsDeepPartial } from 'pdf-lib-draw-table-beta/build/types';
import { Material } from '../materials/models/material.model';

// TODO: decouple

enum Data {
  materialNumber = 'Number',
  materialDescription = 'Description',
  height = 'Height',
  weight = 'Weight',
  width = 'Width',
}

@Injectable()
export class DocumentsService {
  async generatePdf(bom: Bom) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();

    const primaryFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const HEADING_SIZE = 18;
    const PARAGRAPH_SIZE = 10;

    const x = 25;

    let yOffset = height - 50;

    const TITLE = 'Bill Of Materials';
    const textWidth = primaryFont.widthOfTextAtSize(TITLE, HEADING_SIZE);
    page.drawText(TITLE, {
      x: (width - textWidth) / 2,
      y: yOffset,
      size: HEADING_SIZE,
      font: primaryFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 40;

    page.drawText(`Identifier: ${bom.id}`, {
      x,
      y: yOffset,
      size: PARAGRAPH_SIZE,
      font: primaryFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 15;

    page.drawText(`Name: ${bom.name}`, {
      x,
      y: yOffset,
      size: PARAGRAPH_SIZE,
      font: primaryFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 15;

    page.drawText(`Created: ${bom.createdAt.toLocaleDateString()}`, {
      x,
      y: yOffset,
      size: PARAGRAPH_SIZE,
      font: primaryFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 15;

    page.drawText(`Updated: ${bom.updatedAt.toLocaleDateString()}`, {
      x,
      y: yOffset,
      size: PARAGRAPH_SIZE,
      font: primaryFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 15;

    const textWidth2 = primaryFont.widthOfTextAtSize('Products', 12);
    page.drawText('Products', {
      x: (width - textWidth2) / 2,
      y: yOffset,
      size: 12,
      font: primaryFont,
      color: rgb(0, 0, 0),
    });

    yOffset -= 25;

    const tableData = [[]];

    for (const key in Material.getAttributes()) {
      if (Object.prototype.hasOwnProperty.call(Material.getAttributes(), key)) {
        if (Data[key]) {
          tableData[0].push(Data[key]);
        }
      }
    }

    tableData[0] = tableData[0].filter((str) => !str.includes('At'));

    bom.materials.map((val) => {
      tableData.push([
        val.materialNumber,
        val.materialDescription || '',
        val.height.toString(),
        val.weight.toString(),
        val.width.toString(),
      ]);
    });

    console.log(bom.products[0].dataValues);

    const options: TableOptionsDeepPartial<DrawTableOptions> = {
      header: {
        contentAlignment: 'center',
        hasHeaderRow: true,
        textSize: 12,
        backgroundColor: rgb(0.99, 0.99, 0.99),
      },
      title: {
        text: 'Materials',
      },
      textSize: 6,
      border: {
        width: 0.5,
        color: rgb(1, 1, 1),
      },
      contentAlignment: 'center',
      fillUndefCells: true,
      column: {
        widthMode: 'equal',
      },
    };

    await drawTable(pdfDoc, page, tableData, x, yOffset, options);

    const pdfBytes = await pdfDoc.save();
    writeFileSync('output.pdf', pdfBytes);
  }
}
