import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { Routes } from '../../../core/constants';
import { NotFoundException, StreamableFile } from '@nestjs/common';
import { jest } from '@jest/globals';
import { faker } from '@faker-js/faker';

describe(Routes.Documents.Base, () => {
  let documentsController: DocumentsController;
  let documentsService: jest.Mocked<DocumentsService>;

  const mockProductReportBuffer = new StreamableFile(new Uint8Array());
  const mockBOMBuffer = new StreamableFile(new Uint8Array());

  beforeEach(async () => {
    const mockDocumentsService: Partial<jest.Mocked<DocumentsService>> = {
      getProductReport: jest
        .fn<() => Promise<StreamableFile>>()
        .mockResolvedValue(mockProductReportBuffer),
      getBOM: jest
        .fn<() => Promise<StreamableFile>>()
        .mockResolvedValue(mockBOMBuffer),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentsService,
          useValue: mockDocumentsService as jest.Mocked<DocumentsService>,
        },
      ],
    }).compile();

    documentsController = module.get<DocumentsController>(DocumentsController);
    documentsService = module.get<DocumentsService>(
      DocumentsService,
    ) as jest.Mocked<DocumentsService>;
  });

  it('should be defined', () => {
    expect(documentsController).toBeDefined();
  });

  describe(Routes.Documents.Products.ProductReport, () => {
    const productId = faker.number.int(100);

    it('should return product data', async () => {
      await expect(
        documentsController.getProductReport(productId),
      ).resolves.toEqual(mockProductReportBuffer);
      expect(documentsService.getProductReport).toHaveBeenCalledWith(productId);
      expect(documentsService.getProductReport).toHaveBeenCalledTimes(1);
    });

    it('should throw `NotFoundException` if product is not found', async () => {
      jest
        .spyOn(documentsService, 'getProductReport')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        documentsController.getProductReport(productId),
      ).rejects.toThrow(NotFoundException);
      expect(documentsService.getProductReport).toHaveBeenCalledTimes(1);
    });
  });

  describe(Routes.Documents.BOMs.BOM, () => {
    const bomId = faker.number.int(100);

    it('should return BOM data', async () => {
      await expect(documentsController.getBOM(bomId)).resolves.toEqual(
        mockBOMBuffer,
      );
      expect(documentsService.getBOM).toHaveBeenCalledWith(bomId);
      expect(documentsService.getBOM).toHaveBeenCalledTimes(1);
    });

    it('should throw `NotFoundException` if BOM is not found', async () => {
      jest
        .spyOn(documentsService, 'getBOM')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(documentsController.getBOM(bomId)).rejects.toThrow(
        NotFoundException,
      );
      expect(documentsService.getBOM).toHaveBeenCalledTimes(1);
    });
  });
});
