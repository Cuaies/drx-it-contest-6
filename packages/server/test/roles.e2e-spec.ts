import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RolesModule } from '../src/app/modules';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfiguration } from '../src/app/config';
import { spec } from 'pactum';

describe('Roles', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RolesModule,
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
    it.todo('should return roles');
    it.todo('should throw if user in not authenticated');
    it.todo('should throw if user in not admin');
  });

  describe(':roleId/users (GET)', () => {
    it.todo('should return users');
    it.todo('should throw if user in not authenticated');
    it.todo('should throw if user in not admin');
  });
});
