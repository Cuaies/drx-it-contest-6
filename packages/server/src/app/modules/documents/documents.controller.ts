import { Controller, Get, Param } from '@nestjs/common';
import { Routes } from '../../../core/constants';
import { Params } from '../../../ts/enums';
import { DocumentsService } from './documents.service';

@Controller(Routes.Documents.Base)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get(Routes.Documents.Products.ProductReport)
  getProductReport(@Param(Params.ProductId) productId: number) {
    return this.documentsService.getProductReport(productId);
  }

  @Get(Routes.Documents.BOMs.BOM)
  getBOM(@Param(Params.BomId) bomId: number) {
    return this.documentsService.getBOM(bomId);
  }
}
