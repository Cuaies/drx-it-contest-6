import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ProductsModule } from '../src/app/modules';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfiguration } from '../src/app/config';

describe('Products', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ProductsModule,
        ConfigModule.forRoot({
          load: [dbConfiguration],
        }),
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            ...configService.get('db'),
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/ GET', () => {
    it.todo('should return products');
    it.todo('should throw if user in not authenticated');
    it.todo('should throw if token invalid or expired');
  });

  describe('/ POST', () => {
    it.todo('should create product');
    it.todo('should throw on invalid payload');
    it.todo('should throw if user in not authenticated');
    it.todo('should throw if token invalid or expired');
  });

  describe('/products', () => {
    describe('/ GET', () => {
      it.todo('should return product');
      it.todo('should throw if not found');
      it.todo('should throw if resource inexistent');
      it.todo('should throw if user in not authenticated');
      it.todo('should throw if token invalid or expired');
    });

    describe('/ PATCH', () => {
      it.todo('should update product');
      it.todo('should return 202 if request body is empty');
      it.todo('should throw if resource inexistent');
      it.todo('should throw if payload is invalid');
      it.todo('should throw if user in not authenticated');
      it.todo('should throw if token invalid or expired');
    });

    describe('/ DELETE', () => {
      it.todo('should delete product');
      it.todo('should throw if resource inexistent');
      it.todo('should throw if user in not authenticated');
      it.todo('should throw if token invalid or expired');
    });
  });
});
