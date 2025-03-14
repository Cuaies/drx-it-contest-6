import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BomsModule } from '../src/app/modules';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfiguration } from '../src/app/config';

describe('Boms', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BomsModule,
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
    // TODO: create host config
    await app.listen(3000);
  });
});
