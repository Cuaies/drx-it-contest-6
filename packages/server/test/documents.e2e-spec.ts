import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { spec } from 'pactum';
import { AppModule } from '../src/app/app.module';
import { Routes } from '../src/core/constants';
import { Product } from '../src/app/modules/products/models/product.model';
import { Bom } from '../src/app/modules/boms/models/bom.model';
import { faker } from '@faker-js/faker';
import { setBaseUrl } from 'pactum/src/exports/request';
import { Params } from '../src/ts/enums';

const createTestData = async () => {
  const product = await Product.create({
    name: faker.word.noun(),
    description: faker.lorem.lines(2),
  });

  const bom = await Bom.create({
    name: 'Test BOM',
    productId: product.id,
  });

  await product.save();
  await bom.save();

  return { productId: product.id, bomId: bom.id };
};

describe(Routes.Documents.Base, () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await app.listen(3000);

    await createTestData();

    setBaseUrl('http://localhost:3000');
  });

  describe(Routes.Documents.Products.ProductReport, () => {
    it('should return product report pdf', async () => {
      const productId = 1;

      const res = await spec()
        .get(
          `${Routes.Documents.Base}${Routes.Documents.Products.ProductReport.replace(`:${Params.ProductId}`, String(productId))}`,
        )
        .expectStatus(200)
        .expectHeader('content-type', 'application/pdf');

      const body = res.body;
      expect(body.toString('utf8').startsWith('%PDF-')).toBe(true);
      expect(body.toString('utf8').endsWith('%%EOF')).toBe(true);
    });

    it("should return `NotFoundException` if resource doesn't exist", async () => {
      await spec()
        .get(
          `${Routes.Documents.Base}${Routes.Documents.Products.ProductReport.replace(`:${Params.ProductId}`, String(faker.number.int({ min: 9999, max: 99999 })))}`,
        )
        .expectStatus(404);
    });

    it.todo('should throw if user not admin');
    it.todo('should throw if user not authenticated');
  });

  describe(Routes.Documents.BOMs.BOM, () => {
    it('should return bom pdf', async () => {
      const bomId = 1;

      const res = await spec()
        .get(
          `${Routes.Documents.Base}${Routes.Documents.BOMs.BOM.replace(`:${Params.BomId}`, String(bomId))}`,
        )
        .expectStatus(200)
        .expectHeader('content-type', 'application/pdf');

      const body = res.body;
      expect(body.toString('utf8').startsWith('%PDF-')).toBe(true);
      expect(body.toString('utf8').endsWith('%%EOF')).toBe(true);
    });

    it("should return `NotFoundException` if resource doesn't exist", async () => {
      await spec()
        .get(
          `${Routes.Documents.Base}${Routes.Documents.BOMs.BOM.replace(`:${Params.BomId}`, String(faker.number.int({ min: 9999, max: 99999 })))}`,
        )
        .expectStatus(404);
    });

    it.todo('should throw if user not admin');
    it.todo('should throw if user not authenticated');
  });

  afterAll(async () => {
    await app.close();
  });
});
