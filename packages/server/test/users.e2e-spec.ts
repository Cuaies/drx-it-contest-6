import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../src/app/modules';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfiguration } from '../src/app/config';
import { spec } from 'pactum';

describe('Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
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

  describe('/register POST', () => {
    it.todo('should register user');
    it.todo('should return a sanitized user');
    it.todo('should throw if body is invalid');
  });

  describe('/login POST', () => {
    it.todo('should login user');
    it.todo('should return a jwt at cookie');
    it.todo('should return a sanitized user');
    it.todo('should throw if body is invalid');
  });

  describe('/logout POST', () => {
    it.todo('should logout user');
  });

  describe('/:userId/roles GET', () => {
    it.todo('should get user roles');
    it.todo('should throw if user in not authenticated');
    it.todo('should throw if user is not itself or admin');
  });

  describe('/:userId/roles/:roleId POST', () => {
    it.todo('should assign user the role');
    it.todo('should throw if user in not authenticated');
    it.todo('should throw if user is not admin');
  });
});
