import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { StagesModule } from '../src/app/modules';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfiguration } from '../src/app/config';

describe('Stages', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        StagesModule,
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
    it.todo('should return stages');
    it.todo('should throw if user in not authenticated');
  });
});
