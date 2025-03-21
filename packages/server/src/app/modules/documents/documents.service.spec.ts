import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from './documents.service';
import { getModelToken } from '@nestjs/sequelize';
import { Product } from '../products/models/product.model';
import { Bom } from '../boms/models/bom.model';
import { NotFoundException, StreamableFile } from '@nestjs/common';
import { Routes } from '../../../core/constants';
import { faker } from '@faker-js/faker';

jest.mock('./templates', () => ({
  BillOfMaterialsTemplateGenerator: jest.fn().mockImplementation(() => ({
    generate: jest.fn().mockResolvedValue(Buffer.from('pdf-content')),
  })),
  ProductReportTemplateGenerator: jest.fn().mockImplementation(() => ({
    generate: jest.fn().mockResolvedValue(Buffer.from('pdf-content')),
  })),
}));

describe(Routes.Documents.Base, () => {
  let service: DocumentsService;
  let productModel: typeof Product;
  let bomModel: typeof Bom;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getModelToken(Product),
          useValue: {
            findByPk: jest.fn(),
          },
        },
        {
          provide: getModelToken(Bom),
          useValue: {
            findByPk: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    productModel = module.get(getModelToken(Product));
    bomModel = module.get(getModelToken(Bom));
  });

  describe(Routes.Documents.Products.ProductReport, () => {
    it('should return a `StreamableFile`', async () => {
      const mockProduct = { id: 1 } as Product;
      jest.spyOn(productModel, 'findByPk').mockResolvedValue(mockProduct);

      const result = await service.getProductReport(1);

      expect(result).toBeInstanceOf(StreamableFile);
    });

    it('should throw `NotFoundException` if product is not found', async () => {
      jest.spyOn(productModel, 'findByPk').mockResolvedValue(null);

      await expect(
        service.getProductReport(faker.number.int(100)),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe(Routes.Documents.BOMs.BOM, () => {
    it('should return a `StreamableFile`', async () => {
      const mockBOM = { id: faker.number.int(100) } as Bom;
      jest.spyOn(bomModel, 'findByPk').mockResolvedValue(mockBOM);

      const result = await service.getBOM(mockBOM.id);

      expect(result).toBeInstanceOf(StreamableFile);
    });

    it('should throw `NotFoundException` if BOM is not found', async () => {
      jest.spyOn(bomModel, 'findByPk').mockResolvedValue(null);

      await expect(service.getBOM(faker.number.int(100))).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
