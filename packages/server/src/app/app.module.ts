import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  authConfiguration,
  dbConfiguration,
  miscConfiguration,
} from './config';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  UsersModule,
  RolesModule,
  StagesModule,
  ProductsModule,
  MaterialsModule,
  BomsModule,
  PaginationModule,
  DocumentsModule,
} from './modules';
import { LoggerMiddleware } from '../core/middlewares';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [miscConfiguration, authConfiguration, dbConfiguration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('db'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 1,
      max: 10000,
    }),
    PaginationModule,
    DocumentsModule,
    UsersModule,
    RolesModule,
    StagesModule,
    ProductsModule,
    MaterialsModule,
    BomsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
